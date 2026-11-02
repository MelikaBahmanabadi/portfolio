/**
 * Server-side GitHub integration.
 *
 * Uses the public REST API with optional GITHUB_TOKEN for a higher rate limit,
 * cached by the framework for an hour. Every failure path returns null so the
 * page can fall back to the curated data in data/projects.ts instead of
 * breaking.
 */

export type GithubProfile = {
  login: string;
  name: string | null;
  bio: string | null;
  htmlUrl: string;
  avatarUrl: string;
  followers: number;
  publicRepos: number;
  location: string | null;
};

export type GithubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  htmlUrl: string;
  homepage: string | null;
  updatedAt: string;
  fork: boolean;
  topics: string[];
};

export type GithubData = {
  profile: GithubProfile;
  repos: GithubRepo[];
  recent: GithubRepo[];
  languages: { name: string; count: number }[];
  totalStars: number;
  ownRepoCount: number;
};

const USER = "MelikaBahmanabadi";
const API = "https://api.github.com";

function headers(): HeadersInit {
  const base: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "melika-portfolio",
  };
  if (process.env.GITHUB_TOKEN) {
    return { ...base, Authorization: `Bearer ${process.env.GITHUB_TOKEN}` };
  }
  return base;
}

type RawRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string | null;
  pushed_at: string;
  fork: boolean;
  topics?: string[];
};

export async function getGithubData(): Promise<GithubData | null> {
  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${USER}`, {
        headers: headers(),
        next: { revalidate: 3600, tags: ["github"] },
      }),
      fetch(`${API}/users/${USER}/repos?per_page=100&sort=pushed`, {
        headers: headers(),
        next: { revalidate: 3600, tags: ["github"] },
      }),
    ]);

    if (!profileRes.ok || !reposRes.ok) return null;

    const rawProfile = (await profileRes.json()) as {
      login: string;
      name: string | null;
      bio: string | null;
      html_url: string;
      avatar_url: string;
      followers: number;
      public_repos: number;
      location: string | null;
    };
    const rawRepos = (await reposRes.json()) as RawRepo[];
    if (!Array.isArray(rawRepos)) return null;

    const repos: GithubRepo[] = rawRepos.map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      htmlUrl: repo.html_url,
      homepage: repo.homepage,
      updatedAt: repo.pushed_at,
      fork: repo.fork,
      topics: repo.topics ?? [],
    }));

    const languageCounts = new Map<string, number>();
    repos.forEach((repo) => {
      if (repo.language) {
        languageCounts.set(
          repo.language,
          (languageCounts.get(repo.language) ?? 0) + 1,
        );
      }
    });

    const languages = [...languageCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const recent = [...repos]
      .filter((repo) => !repo.fork && repo.name !== USER)
      .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
      .slice(0, 5);

    return {
      profile: {
        login: rawProfile.login,
        name: rawProfile.name,
        bio: rawProfile.bio,
        htmlUrl: rawProfile.html_url,
        avatarUrl: rawProfile.avatar_url,
        followers: rawProfile.followers,
        publicRepos: rawProfile.public_repos,
        location: rawProfile.location,
      },
      repos,
      recent,
      languages,
      totalStars: repos.reduce((total, repo) => total + repo.stars, 0),
      ownRepoCount: repos.filter((repo) => !repo.fork).length,
    };
  } catch {
    return null;
  }
}
