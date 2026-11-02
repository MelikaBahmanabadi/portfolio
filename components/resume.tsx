import Link from "next/link";
import { resumeSkills } from "@/data/profile";
import { asset } from "@/lib/site";
import { DownloadIcon, FileTextIcon } from "./icons";
import { Reveal } from "./reveal";

export function Resume() {
  return (
    <section id="resume" className="section resume-section">
      <div className="container">
        <Reveal>
          <div className="resume-card">
            <div className="resume-copy">
              <p className="eyebrow">
                <span className="eyebrow-rule" aria-hidden />
                Resume
              </p>
              <h2 className="section-title">
                The one-page <em>version</em>
              </h2>
              <p className="section-lede">
                A complete resume built only from verifiable information —
                current role, selected projects, education and published
                research. Download it as a PDF, or read it in the browser.
              </p>

              <div className="resume-actions">
                <a className="btn btn-primary" href={asset("/resume.pdf")} download>
                  <DownloadIcon />
                  Download PDF
                </a>
                <Link className="btn btn-outline" href="/resume">
                  <FileTextIcon />
                  Open resume
                </Link>
              </div>

              <p className="resume-note">
                Requires no account. Generated from the same data that powers
                this page, so it never drifts out of date.
              </p>
            </div>

            <div className="resume-skills">
              {resumeSkills.map((group) => (
                <div key={group.label} className="resume-skill-group">
                  <p className="resume-skill-label">{group.label}</p>
                  <ul className="chip-row">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
