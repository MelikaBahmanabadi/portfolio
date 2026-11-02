import { profile, socialLinks } from "@/data/profile";
import { ArrowUpRightIcon, GithubIcon, LinkedinIcon } from "./icons";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-monogram" aria-hidden>
              M
            </span>
            <div>
              <p className="footer-name">{profile.name}</p>
              <p className="footer-role">AI Engineer</p>
            </div>
          </div>

          <nav className="footer-links" aria-label="Footer">
            <p className="footer-label">Quick links</p>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-social">
            <p className="footer-label">Elsewhere</p>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={17} />
              GitHub
              <ArrowUpRightIcon size={13} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon size={16} />
              LinkedIn
              <ArrowUpRightIcon size={13} />
            </a>
            <a href="#contact">
              Start a conversation
              <ArrowUpRightIcon size={13} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          <p className="footer-note">
            Designed &amp; built with intent — Tehran, Iran.
          </p>
        </div>
      </div>
    </footer>
  );
}
