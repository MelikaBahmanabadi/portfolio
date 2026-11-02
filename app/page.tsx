import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Expertise } from "@/components/expertise";
import { GithubActivity } from "@/components/github-activity";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { Resume } from "@/components/resume";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/data/projects";
import { getGithubData } from "@/lib/github";

export const revalidate = 3600;

function repoNameFromUrl(url: string) {
  return url.split("/")[4]?.toLowerCase();
}

export default async function HomePage() {
  const github = await getGithubData();

  const stars: Record<string, number> = {};
  if (github) {
    const byRepo = new Map(
      github.repos.map((repo) => [repo.name.toLowerCase(), repo.stars]),
    );
    for (const project of projects) {
      const name = repoNameFromUrl(project.repo);
      const count = name ? byRepo.get(name) : undefined;
      if (typeof count === "number") stars[project.slug] = count;
    }
  }

  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Expertise />
        <ProjectsSection stars={stars} />
        <GithubActivity data={github} />
        <Experience />
        <Resume />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
