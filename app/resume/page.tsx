import type { Metadata } from "next";
import Link from "next/link";
import {
  education,
  experience,
  profile,
  publications,
  resumeSkills,
  socialLinks,
} from "@/data/profile";
import { projects } from "@/data/projects";
import { DownloadIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Melika Bahman-Abadi — AI Engineer working across LLM applications, AI agents, computer vision and speech AI.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main id="main" className="resume-page">
      <div className="resume-page-inner">
        <div className="resume-page-actions no-print">
          <Link className="back-link" href="/">
            <span aria-hidden>&larr;</span>
            Back to portfolio
          </Link>
          <a className="btn btn-primary btn-sm" href="/api/resume" download>
            <DownloadIcon />
            Download PDF
          </a>
        </div>

        <header className="resume-header">
          <h1>{profile.name}</h1>
          <p className="resume-role">
            {profile.role} — {profile.location}
          </p>
          <p className="resume-contact">
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
              github.com/MelikaBahmanabadi
            </a>
            <span aria-hidden>·</span>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/melikabahmanabadi
            </a>
          </p>
        </header>

        <section className="resume-block">
          <h2>Profile</h2>
          <p>
            AI Engineer building production systems across LLM applications, AI
            agents, computer vision and speech analytics. Currently applying AI to
            finance, oil and petrochemicals at the Iran Mercantile Exchange, with a
            research background in NLP and large-scale data systems.
          </p>
        </section>

        <section className="resume-block">
          <h2>Technical skills</h2>
          <dl className="resume-skill-list">
            {resumeSkills.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="resume-block">
          <h2>Experience</h2>
          {experience.map((role) => (
            <article key={`${role.company}-${role.role}`} className="resume-entry">
              <div className="resume-entry-head">
                <h3>{role.role}</h3>
                <span>{role.period}</span>
              </div>
              <p className="resume-entry-meta">
                {role.company}
                {role.location ? ` — ${role.location}` : ""}
              </p>
              <p>{role.summary}</p>
              <ul>
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="resume-block">
          <h2>Selected projects</h2>
          {projects.slice(0, 5).map((project) => (
            <article key={project.slug} className="resume-entry">
              <div className="resume-entry-head">
                <h3>{project.name}</h3>
                <span>{project.year}</span>
              </div>
              <p className="resume-entry-meta">{project.stack.join(", ")}</p>
              <p>{project.summary}</p>
            </article>
          ))}
        </section>

        <section className="resume-block">
          <h2>Education</h2>
          {education.map((entry) => (
            <article key={entry.school} className="resume-entry">
              <div className="resume-entry-head">
                <h3>{entry.school}</h3>
                <span>{entry.location}</span>
              </div>
              <p>{entry.detail}</p>
            </article>
          ))}
        </section>

        <section className="resume-block">
          <h2>Publications</h2>
          {publications.map((paper) => (
            <article key={paper.href} className="resume-entry">
              <div className="resume-entry-head">
                <h3>{paper.title}</h3>
                <span>{paper.year}</span>
              </div>
              <p className="resume-entry-meta">{paper.authors}</p>
              <p>
                <a href={paper.href} target="_blank" rel="noopener noreferrer">
                  {paper.href}
                </a>
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
