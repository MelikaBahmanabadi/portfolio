import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={`section-heading section-heading--${align} section-heading--${tone}`}
    >
      <div className="section-heading-main">
        <p className="eyebrow">
          <span className="eyebrow-rule" aria-hidden />
          {eyebrow}
        </p>
        <h2 className="section-title">{title}</h2>
        {description ? <p className="section-lede">{description}</p> : null}
      </div>
      {action ? <div className="section-heading-action">{action}</div> : null}
    </div>
  );
}
