import Link from "next/link";
import type { Project } from "@/data/projects";
import { ArrowUpRightIcon, GitForkIcon, StarIcon } from "./icons";
import { ProjectCover } from "./project-cover";

type ProjectCardProps = {
  project: Project;
  stars?: number;
  index?: number;
};

export function ProjectCard({ project, stars, index = 0 }: ProjectCardProps) {
  const external = project.liveUrl ?? project.repo;

  return (
    <article className="project-card">
      <Link
        href={`/projects/${project.slug}`}
        className="project-card-media"
        aria-label={`Open the ${project.name} case study`}
        tabIndex={-1}
      >
        <ProjectCover name={project.name} stack={project.stack} index={index} />
        <span className="project-card-media-veil" aria-hidden />
        {project.badge ? (
          <span className="project-badge">{project.badge}</span>
        ) : null}
        <span className="project-card-open" aria-hidden>
          <ArrowUpRightIcon size={15} />
        </span>
      </Link>

      <div className="project-card-body">
        <p className="project-card-cats">{project.categories.join(" · ")}</p>
        <h3 className="project-card-title">
          <Link href={`/projects/${project.slug}`}>{project.name}</Link>
        </h3>
        <p className="project-card-summary">{project.summary}</p>

        <ul className="chip-row">
          {project.stack.slice(0, 4).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="project-card-foot">
          <Link className="project-card-link" href={`/projects/${project.slug}`}>
            Case study
          </Link>
          <div className="project-card-meta">
            {typeof stars === "number" && stars > 0 ? (
              <span className="project-stat">
                <StarIcon size={13} />
                {stars}
              </span>
            ) : null}
            <a
              className="project-card-icon-link"
              href={external}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on ${project.liveUrl ? "the live site" : "GitHub"}`}
            >
              <GitForkIcon size={13} />
              {project.liveUrl ? "Live site" : "Source"}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
