import type { GithubData } from "@/lib/github";
import {
  ArrowUpRightIcon,
  GitForkIcon,
  GithubIcon,
  StarIcon,
} from "./icons";

function monthYear(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function GithubActivity({ data }: { data: GithubData | null }) {
  return (
    <section id="github" className="section github-section">
      <div className="container">
        <div className="github-shell">
          <div className="github-head">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-rule" aria-hidden />
                GitHub
              </p>
              <h2 className="section-title">
                Building <em>in the open</em>
              </h2>
              <p className="section-lede">
                Public repositories, languages and what I pushed most recently —
                pulled from the GitHub API.
              </p>
            </div>
            <a
              className="btn btn-outline btn-sm"
              href="https://github.com/MelikaBahmanabadi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={17} />
              @MelikaBahmanabadi
              <ArrowUpRightIcon size={14} />
            </a>
          </div>

          {data ? (
            <>
              <dl className="github-stats">
                <div>
                  <dt>Public repositories</dt>
                  <dd>{data.profile.publicRepos}</dd>
                </div>
                <div>
                  <dt>Original projects</dt>
                  <dd>{data.ownRepoCount}</dd>
                </div>
                <div>
                  <dt>Followers</dt>
                  <dd>{data.profile.followers}</dd>
                </div>
                <div>
                  <dt>Top language</dt>
                  <dd className="github-stat-text">
                    {data.languages[0]?.name ?? "Python"}
                  </dd>
                </div>
              </dl>

              <div className="github-columns">
                <div className="github-langs">
                  <h3>Languages across repositories</h3>
                  <ul>
                    {data.languages.map((language) => (
                      <li key={language.name}>
                        <span className="github-lang-name">{language.name}</span>
                        <span className="github-lang-track" aria-hidden>
                          <span
                            className="github-lang-fill"
                            style={{
                              width: `${Math.round(
                                (language.count /
                                  (data.languages[0]?.count || 1)) *
                                  100,
                              )}%`,
                            }}
                          />
                        </span>
                        <span className="github-lang-count">
                          {language.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="github-recent">
                  <h3>Recently updated</h3>
                  <ul>
                    {data.recent.map((repo) => (
                      <li key={repo.name}>
                        <a
                          href={repo.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="github-repo"
                        >
                          <span className="github-repo-top">
                            <span className="github-repo-name">{repo.name}</span>
                            <span className="github-repo-date">
                              {monthYear(repo.updatedAt)}
                            </span>
                          </span>
                          <span className="github-repo-desc">
                            {repo.description ?? "Public repository"}
                          </span>
                          <span className="github-repo-meta">
                            {repo.language ? <span>{repo.language}</span> : null}
                            {repo.stars > 0 ? (
                              <span>
                                <StarIcon size={12} />
                                {repo.stars}
                              </span>
                            ) : null}
                            {repo.fork ? (
                              <span>
                                <GitForkIcon size={12} />
                                fork
                              </span>
                            ) : null}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="github-fallback">
              <p>
                Live GitHub data is unavailable right now (the public API rate
                limit or the network). The profile is still one click away.
              </p>
              <a
                className="link-arrow"
                href="https://github.com/MelikaBahmanabadi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open github.com/MelikaBahmanabadi
                <ArrowUpRightIcon size={15} />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
