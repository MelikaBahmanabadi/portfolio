import { education, experience, publications } from "@/data/profile";
import { ArrowUpRightIcon, BookIcon, CheckIcon } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              The path <em>so far</em>
            </>
          }
          description="Applied AI in a live financial institution, preceded by research on learning systems and large-scale data."
        />

        <div className="experience-grid">
          <div className="timeline">
            {experience.map((role, index) => (
              <Reveal key={`${role.company}-${role.role}`} delay={index * 90}>
                <article className="timeline-item">
                  <span className="timeline-marker" aria-hidden />
                  <div className="timeline-head">
                    <span className="timeline-period">{role.period}</span>
                    {role.location ? (
                      <span className="timeline-location">{role.location}</span>
                    ) : null}
                  </div>
                  <h3 className="timeline-role">{role.role}</h3>
                  {role.companyUrl ? (
                    <a
                      className="timeline-company"
                      href={role.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {role.company}
                      <ArrowUpRightIcon size={13} />
                    </a>
                  ) : (
                    <p className="timeline-company">{role.company}</p>
                  )}
                  <p className="timeline-summary">{role.summary}</p>
                  <ul className="timeline-highlights">
                    {role.highlights.map((highlight) => (
                      <li key={highlight}>
                        <CheckIcon size={13} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="experience-side">
            <Reveal delay={80}>
              <div className="side-card">
                <p className="side-card-label">Education</p>
                {education.map((entry) => (
                  <div key={entry.school} className="education-item">
                    <h3>{entry.school}</h3>
                    <p className="education-location">{entry.location}</p>
                    <p className="education-detail">{entry.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="side-card">
                <p className="side-card-label">
                  <BookIcon size={14} />
                  Publications
                </p>
                <ul className="publication-list">
                  {publications.map((paper) => (
                    <li key={paper.href}>
                      <a
                        href={paper.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="publication-year">{paper.year}</span>
                        <span className="publication-title">{paper.title}</span>
                        <span className="publication-authors">
                          {paper.authors}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
