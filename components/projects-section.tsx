"use client";

import { useState } from "react";
import Link from "next/link";
import {
  featuredProject,
  projects,
  type ProjectCategory,
} from "@/data/projects";
import { projectCategoryOrder } from "@/data/profile";
import { ArrowRightIcon, ArrowUpRightIcon, GithubIcon } from "./icons";
import { LivePreview } from "./live-preview";
import { ProjectCard } from "./project-card";

type Filter = "All Projects" | ProjectCategory;

const filters: Filter[] = ["All Projects", ...projectCategoryOrder];

type ProjectsSectionProps = {
  stars: Record<string, number>;
};

export function ProjectsSection({ stars }: ProjectsSectionProps) {
  const [active, setActive] = useState<Filter>("All Projects");

  const matches = (projectCategories: ProjectCategory[]) =>
    active === "All Projects" || projectCategories.includes(active);

  const featuredVisible = matches(featuredProject.categories);
  const grid = projects.filter(
    (project) =>
      matches(project.categories) &&
      !(featuredVisible && project.slug === featuredProject.slug),
  );

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="projects-header">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-rule" aria-hidden />
              Portfolio
            </p>
            <h2 className="section-title">
              Selected <em>projects</em>
            </h2>
            <p className="section-lede">
              Real repositories, real deployments. Each case study covers the
              problem, the architecture and the source.
            </p>
          </div>
          <a
            className="btn btn-outline btn-sm projects-github"
            href="https://github.com/MelikaBahmanabadi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon size={17} />
            All repositories
            <ArrowUpRightIcon size={14} />
          </a>
        </div>

        <div className="project-filters" role="tablist" aria-label="Project categories">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={active === filter}
              className={`filter-chip${active === filter ? " is-active" : ""}`}
              onClick={() => setActive(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {featuredVisible ? (
          <article className="featured-project">
            <div className="featured-media">
              {featuredProject.embedUrl ? (
                <LivePreview
                  url={featuredProject.embedUrl}
                  title={`${featuredProject.name} live site`}
                  name={featuredProject.name}
                  stack={featuredProject.stack}
                />
              ) : null}
            </div>

            <div className="featured-body">
              <span className="featured-flag">
                <span className="featured-flag-dot" aria-hidden />
                {featuredProject.badge ?? "Featured"}
              </span>
              <p className="featured-cats">
                {featuredProject.categories.join(" · ")} · {featuredProject.year}
              </p>
              <h3 className="featured-title">{featuredProject.name}</h3>
              <p className="featured-tagline">{featuredProject.tagline}</p>
              <p className="featured-summary">{featuredProject.summary}</p>

              <ul className="chip-row">
                {featuredProject.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>

              <div className="featured-actions">
                {featuredProject.liveUrl ? (
                  <a
                    className="btn btn-primary btn-sm"
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                    <ArrowUpRightIcon size={15} />
                  </a>
                ) : null}
                <a
                  className="btn btn-outline btn-sm"
                  href={featuredProject.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Source
                </a>
                <Link
                  className="link-arrow"
                  href={`/projects/${featuredProject.slug}`}
                >
                  Read the case study
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </div>
          </article>
        ) : null}

        {grid.length > 0 ? (
          <div className="projects-grid">
            {grid.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                stars={stars[project.slug]}
                index={index}
              />
            ))}
          </div>
        ) : null}

        {!featuredVisible && grid.length === 0 ? (
          <p className="projects-empty">
            No projects in this category yet — explore another one or browse the
            GitHub profile.
          </p>
        ) : null}
      </div>
    </section>
  );
}
