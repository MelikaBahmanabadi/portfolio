import Image from "next/image";
import { profile } from "@/data/profile";
import { Reveal } from "./reveal";
import { ArrowRightIcon, DownloadIcon, MapPinIcon, SparklesIcon } from "./icons";

export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-orb hero-orb--rose" aria-hidden />
      <div className="hero-orb hero-orb--cream" aria-hidden />
      <div className="hero-orb hero-orb--warm" aria-hidden />

      <div className="container hero-grid">
        <div className="hero-copy">
          <Reveal>
            <span className="hero-badge">
              <span className="hero-badge-dot" aria-hidden />
              {profile.badge}
            </span>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="hero-title">
              Building AI that <em>solves</em> real problems.
            </h1>
          </Reveal>

          <Reveal delay={130}>
            <p className="hero-intro">{profile.intro}</p>
          </Reveal>

          <Reveal delay={190}>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">
                Explore My Projects
                <ArrowRightIcon />
              </a>
              <a className="btn btn-outline" href="/api/resume" download>
                <DownloadIcon />
                Download Resume
              </a>
              <a className="btn btn-ghost" href="#contact">
                Contact Me
              </a>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <dl className="hero-facts">
              <div>
                <dt>Based in</dt>
                <dd>
                  <MapPinIcon size={15} />
                  {profile.location}
                </dd>
              </div>
              <div>
                <dt>Currently</dt>
                <dd>
                  <SparklesIcon size={15} />
                  AI Engineer at IME
                </dd>
              </div>
              <div>
                <dt>Research</dt>
                <dd>2 peer-reviewed papers</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120} className="hero-portrait-wrap">
          <div className="hero-portrait">
            <div className="hero-blob hero-blob--back" aria-hidden />
            <div className="hero-blob hero-blob--front" aria-hidden />
            <div className="hero-portrait-frame">
              <Image
                src="/images/melika-portrait.png"
                alt="Portrait of Melika Bahman-Abadi"
                width={1254}
                height={1254}
                priority
                sizes="(max-width: 900px) 78vw, 460px"
                className="hero-portrait-image"
              />
            </div>

            <div className="hero-card">
              <span className="hero-card-dot" aria-hidden />
              <span className="hero-card-text">
                <span className="hero-card-label">AI Engineer</span>
                <span className="hero-card-value">Iran Mercantile Exchange</span>
              </span>
            </div>

            <span className="hero-ring hero-ring--one" aria-hidden />
            <span className="hero-ring hero-ring--two" aria-hidden />
          </div>
        </Reveal>
      </div>

      <div className="container hero-foot">
        <a className="hero-scroll" href="#about">
          <span className="hero-scroll-line" aria-hidden />
          Scroll to explore
        </a>
        <span className="hero-foot-note">
          LLMs &middot; AI Agents &middot; Computer Vision &middot; Speech AI
        </span>
      </div>
    </section>
  );
}
