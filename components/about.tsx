import Image from "next/image";
import portrait from "@/public/images/melika-portrait.png";
import { profile } from "@/data/profile";
import { Reveal } from "./reveal";
import { ArrowRightIcon, CheckIcon } from "./icons";

export function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-portrait-col">
            <div className="about-portrait">
              <div className="about-portrait-blob" aria-hidden />
              <div className="about-portrait-frame">
                <Image
                  src={portrait}
                  alt="Melika Bahman-Abadi, AI Engineer"
                  width={1254}
                  height={1254}
                  sizes="(max-width: 900px) 60vw, 320px"
                  className="about-portrait-image"
                />
              </div>
              <div className="about-portrait-badge">
                <strong>{profile.about.stat.value}</strong>
                <span>
                  peer-reviewed
                  <br />
                  papers
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="about-copy">
            <p className="eyebrow">
              <span className="eyebrow-rule" aria-hidden />
              {profile.about.eyebrow}
            </p>
            <h2 className="section-title">{profile.about.title}</h2>
            {profile.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="about-paragraph">
                {paragraph}
              </p>
            ))}
            <a className="link-arrow" href="#experience">
              See the experience
              <ArrowRightIcon size={16} />
            </a>
          </Reveal>

          <Reveal delay={160} className="about-traits-col">
            <div className="about-traits">
              <p className="about-traits-title">How I work</p>
              <ul>
                {profile.about.traits.map((trait) => (
                  <li key={trait}>
                    <span className="about-trait-icon" aria-hidden>
                      <CheckIcon size={13} />
                    </span>
                    {trait}
                  </li>
                ))}
              </ul>
              <div className="about-traits-foot">
                <span className="about-traits-label">You&rsquo;ll find me at</span>
                <a
                  href={profile.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.company}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
