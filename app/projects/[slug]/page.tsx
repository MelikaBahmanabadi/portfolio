import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LivePreview } from "@/components/live-preview";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ArrowRightIcon, ArrowUpRightIcon, GithubIcon } from "@/components/icons";
import { getProject, projects } from "@/data/projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — Melika Bahman-Abadi`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main id="main" className="project-page">
        <div className="container">
          <Link className="back-link" href="/#projects">
            <span aria-hidden>&larr;</span>
            All projects
          </Link>

          <header className="project-hero">
            <div className="project-hero-main">
              <p className="eyebrow">
                <span className="eyebrow-rule" aria-hidden />
                {project.categories.join(" · ")} · {project.year}
              </p>
              <h1 className="project-title">{project.name}</h1>
              <p className="project-tagline">{project.tagline}</p>
              <p className="project-summary">{project.summary}</p>

              <ul className="chip-row">
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>

              <div className="project-actions">
                {project.liveUrl ? (
                  <a
                    className="btn btn-primary btn-sm"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                    <ArrowUpRightIcon size={15} />
                  </a>
                ) : null}
                <a
                  className="btn btn-outline btn-sm"
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon size={16} />
                  View Source Code
                </a>
                {project.badge ? (
                  <span className="project-hero-badge">{project.badge}</span>
                ) : null}
              </div>
            </div>
          </header>

          {project.embedUrl ? (
            <div className="project-embed">
              <LivePreview
                url={project.embedUrl}
                title={`${project.name} live site`}
                name={project.name}
                stack={project.stack}
              />
              <p className="project-embed-note">
                This is the deployed application, embedded live. Prefer a full
                window?{" "}
                <a
                  href={project.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open it in a new tab
                  <ArrowUpRightIcon size={12} />
                </a>
              </p>
            </div>
          ) : null}

          <div className="project-layout">
            <div className="project-body">
              <section>
                <h2>Overview</h2>
                <p>{project.overview}</p>
              </section>

              <section>
                <h2>The problem</h2>
                <p>{project.problem}</p>
              </section>

              <section>
                <h2>Key features</h2>
                <ul className="feature-list">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2>How it works</h2>
                <ol className="architecture-list">
                  {project.architecture.map((step, index) => (
                    <li key={step.step}>
                      <span className="architecture-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3>{step.step}</h3>
                        <p>{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <aside className="project-aside">
              <div className="aside-card">
                <p className="aside-label">Technologies</p>
                <ul className="chip-row">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>

              <div className="aside-card">
                <p className="aside-label">Links</p>
                <ul className="aside-links">
                  <li>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source code
                      <ArrowUpRightIcon size={13} />
                    </a>
                  </li>
                  {project.liveUrl ? (
                    <li>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live deployment
                        <ArrowUpRightIcon size={13} />
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>

              <div className="aside-card aside-card--note">
                <p className="aside-label">Note</p>
                <p>
                  {project.liveUrl
                    ? "The demo above is the real deployed application — not a mock-up."
                    : "No public deployment exists for this project. The source and workflow are shown as they are."}
                </p>
              </div>
            </aside>
          </div>

          <div className="project-more">
            <p className="eyebrow">
              <span className="eyebrow-rule" aria-hidden />
              Keep exploring
            </p>
            <ul>
              {others.map((item) => (
                <li key={item.slug}>
                  <Link href={`/projects/${item.slug}`}>
                    <span>{item.name}</span>
                    <span className="project-more-cat">
                      {item.categories.join(" · ")}
                    </span>
                    <ArrowRightIcon size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
