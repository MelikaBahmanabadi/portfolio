import type { CSSProperties } from "react";

type ProjectCoverProps = {
  name: string;
  stack: string[];
  index?: number;
  style?: CSSProperties;
};

const tones = ["navy", "rose", "cream"] as const;

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /[A-Za-z]/.test(word[0] ?? ""))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * Typographic cover used until a visit to the live demo. It is deliberately a
 * designed plate rather than a simulated screenshot — the real deployment is
 * one click away in the featured card and on each case study.
 */
export function ProjectCover({ name, stack, index = 0, style }: ProjectCoverProps) {
  const tone = tones[index % tones.length];

  return (
    <div className={`project-cover project-cover--${tone}`} style={style} aria-hidden>
      <span className="project-cover-grid" />
      <span className="project-cover-ring project-cover-ring--a" />
      <span className="project-cover-ring project-cover-ring--b" />
      <span className="project-cover-index">{String(index + 1).padStart(2, "0")}</span>
      <span className="project-cover-initials">{initialsOf(name)}</span>
      <span className="project-cover-meta">
        <span className="project-cover-name">{name}</span>
        <span className="project-cover-stack">{stack.slice(0, 3).join(" · ")}</span>
      </span>
    </div>
  );
}
