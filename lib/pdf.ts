/**
 * Minimal, dependency-free PDF writer used for the resume download.
 *
 * It targets the PDF base-14 fonts (Helvetica / Helvetica-Bold), so the output
 * is a genuine PDF that opens anywhere without embedding megabytes of fonts.
 */

import {
  education,
  experience,
  profile,
  publications,
  resumeSkills,
  socialLinks,
} from "@/data/profile";
import { projects } from "@/data/projects";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN_X = 52;
const MARGIN_BOTTOM = 54;

const NAVY: [number, number, number] = [0.09, 0.14, 0.24];
const ROSE: [number, number, number] = [0.63, 0.44, 0.52];
const GRAY: [number, number, number] = [0.4, 0.39, 0.43];

/** Helvetica advance widths (1/1000 em) for the glyphs the resume uses. */
const HELVETICA: Record<string, number> = {
  " ": 278, "!": 278, '"': 355, "#": 556, $: 556, "%": 889, "&": 667,
  "'": 191, "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333,
  ".": 278, "/": 278, ":": 278, ";": 278, "<": 584, "=": 584, ">": 584,
  "?": 556, "@": 1015, "[": 278, "\\": 278, "]": 278, "^": 469, _: 556,
  "`": 333, "{": 334, "|": 260, "}": 334, "~": 584,
  A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278,
  J: 500, K: 667, L: 556, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722,
  S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222,
  j: 222, k: 500, l: 222, m: 833, n: 556, o: 556, p: 556, q: 556, r: 333,
  s: 500, t: 278, u: 556, v: 500, w: 722, x: 500, y: 500, z: 500,
};

const HELVETICA_BOLD: Record<string, number> = {
  " ": 278, "!": 333, '"': 474, "#": 556, $: 556, "%": 889, "&": 722,
  "'": 238, "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333,
  ".": 278, "/": 278, ":": 333, ";": 333, "<": 584, "=": 584, ">": 584,
  "?": 611, "@": 975, "[": 333, "\\": 278, "]": 333, "^": 584, _: 556,
  "`": 333, "{": 389, "|": 280, "}": 389, "~": 584,
  A: 722, B: 722, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278,
  J: 556, K: 722, L: 611, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722,
  S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  a: 556, b: 611, c: 556, d: 611, e: 556, f: 333, g: 611, h: 611, i: 278,
  j: 278, k: 556, l: 278, m: 889, n: 611, o: 611, p: 611, q: 611, r: 389,
  s: 556, t: 333, u: 611, v: 556, w: 778, x: 556, y: 556, z: 500,
};

function widthOf(text: string, size: number, bold: boolean) {
  const table = bold ? HELVETICA_BOLD : HELVETICA;
  let total = 0;
  for (const char of text) {
    const code = char.charCodeAt(0);
    if (code >= 48 && code <= 57) {
      total += 556;
    } else {
      total += table[char] ?? 556;
    }
  }
  return (total / 1000) * size;
}

/** Approximate printable ASCII; the base-14 fonts only carry WinAnsi glyphs. */
function ascii(text: string) {
  return text
    .replace(/[\u2018\u2019\u2032]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[\u00B7\u2022]/g, "-")
    .replace(/\u00A0/g, " ")
    .replace(/[^\x20-\x7E]/g, "");
}

function escapePdf(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(text: string, size: number, bold: boolean, maxWidth: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (widthOf(candidate, size, bold) <= maxWidth || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

type Page = string[];

class ResumeBuilder {
  pages: Page[] = [[]];
  y = PAGE_HEIGHT - 64;

  private get current() {
    return this.pages[this.pages.length - 1];
  }

  private ensure(space: number) {
    if (this.y - space < MARGIN_BOTTOM) {
      this.pages.push([]);
      this.y = PAGE_HEIGHT - 64;
    }
  }

  text(
    value: string,
    {
      size = 10.5,
      bold = false,
      color = NAVY,
      x = MARGIN_X,
      gap = 15,
      leading = 1.4,
    }: {
      size?: number;
      bold?: boolean;
      color?: [number, number, number];
      x?: number;
      gap?: number;
      leading?: number;
    } = {},
  ) {
    const lineHeight = size * leading;
    for (const line of wrap(ascii(value), size, bold, PAGE_WIDTH - MARGIN_X * 2 - (x - MARGIN_X))) {
      this.ensure(lineHeight);
      this.y -= lineHeight;
      this.current.push(
        `BT /${bold ? "F2" : "F1"} ${size} Tf ${color[0]} ${color[1]} ${color[2]} rg 1 0 0 1 ${x} ${this.y} Tm (${escapePdf(line)}) Tj ET`,
      );
    }
    this.y -= gap - lineHeight > 0 ? gap - lineHeight : 0;
  }

  rule(color: [number, number, number] = [0.86, 0.83, 0.81], gap = 10) {
    this.ensure(gap + 2);
    this.y -= gap;
    this.current.push(
      `${color[0]} ${color[1]} ${color[2]} RG 0.7 w ${MARGIN_X} ${this.y} m ${PAGE_WIDTH - MARGIN_X} ${this.y} l S`,
    );
    this.y -= 8;
  }

  section(title: string) {
    this.ensure(60);
    this.y -= 14;
    this.text(title.toUpperCase(), {
      size: 9,
      bold: true,
      color: ROSE,
      gap: 2,
      leading: 1.2,
    });
    this.rule([0.78, 0.62, 0.68], 4);
  }

  bullet(value: string) {
    const bulletX = MARGIN_X + 2;
    const bodyX = MARGIN_X + 12;
    const lines = wrap(ascii(value), 10, false, PAGE_WIDTH - bodyX - MARGIN_X);
    lines.forEach((line, index) => {
      this.ensure(14);
      this.y -= 14;
      if (index === 0) {
        this.current.push(
          `BT /F1 10 Tf ${ROSE[0]} ${ROSE[1]} ${ROSE[2]} rg 1 0 0 1 ${bulletX} ${this.y} Tm (-) Tj ET`,
        );
      }
      this.current.push(
        `BT /F1 10 Tf ${GRAY[0]} ${GRAY[1]} ${GRAY[2]} rg 1 0 0 1 ${bodyX} ${this.y} Tm (${escapePdf(line)}) Tj ET`,
      );
    });
    this.y -= 3;
  }

  gap(amount: number) {
    this.y -= amount;
  }
}

export function buildResumePdf(): Buffer {
  const doc = new ResumeBuilder();

  // Header
  doc.text(profile.name, { size: 25, bold: true, gap: 4, leading: 1.15 });
  doc.text(`${profile.role} — ${profile.location}`, {
    size: 11,
    color: ROSE,
    gap: 8,
  });
  doc.text(
    [
      socialLinks.github.replace("https://", ""),
      socialLinks.linkedin.replace("https://www.", "").replace(/\/$/, ""),
      profile.company,
    ].join("  |  "),
    { size: 9, color: GRAY, gap: 0 },
  );
  doc.rule([0.78, 0.62, 0.68], 14);

  // Profile
  doc.section("Profile");
  doc.text(
    "AI Engineer building production systems across LLM applications, AI agents, computer vision and speech analytics. Currently applying AI to finance, oil and petrochemicals at the Iran Mercantile Exchange, with a research background in NLP and large-scale data systems.",
    { size: 10.5, color: GRAY, gap: 4 },
  );

  // Skills
  doc.section("Technical Skills");
  resumeSkills.forEach((group) => {
    doc.text(`${group.label}: ${group.items.join(", ")}`, {
      size: 10,
      color: GRAY,
      gap: 3,
      leading: 1.45,
    });
  });

  // Experience
  doc.section("Experience");
  experience.forEach((role) => {
    doc.text(role.role, { size: 12, bold: true, gap: 1 });
    doc.text(
      [role.company, role.location, role.period].filter(Boolean).join("  |  "),
      { size: 9.5, color: ROSE, gap: 4 },
    );
    doc.text(role.summary, { size: 10, color: GRAY, gap: 3 });
    role.highlights.forEach((highlight) => doc.bullet(highlight));
    doc.gap(6);
  });

  // Selected projects
  doc.section("Selected Projects");
  projects.slice(0, 5).forEach((project) => {
    doc.text(`${project.name} — ${project.stack.slice(0, 4).join(", ")}`, {
      size: 10.5,
      bold: true,
      gap: 1,
    });
    doc.text(project.summary, { size: 10, color: GRAY, gap: 4 });
  });

  // Education
  doc.section("Education");
  education.forEach((entry) => {
    doc.text(entry.school, { size: 11, bold: true, gap: 1 });
    doc.text(`${entry.location} — ${entry.detail}`, {
      size: 10,
      color: GRAY,
      gap: 4,
    });
  });

  // Publications
  doc.section("Publications");
  publications.forEach((paper) => {
    doc.text(`${paper.title} (${paper.year})`, {
      size: 10,
      bold: true,
      gap: 1,
    });
    doc.text(`${paper.authors}. ${paper.venue}. ${paper.href}`, {
      size: 9,
      color: GRAY,
      gap: 5,
    });
  });

  return assemble(doc.pages);
}

function assemble(pages: Page[]): Buffer {
  const objects: string[] = [];
  const pageObjectIds = pages.map((_, index) => 4 + index * 2);

  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push(
    `<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`,
  );
  objects.push(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  );

  pages.forEach((commands, index) => {
    const contentId = pageObjectIds[index] + 1;
    const stream = commands.join("\n");
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH.toFixed(2)} ${PAGE_HEIGHT.toFixed(2)}] /Resources << /Font << /F1 3 0 R /F2 ${3 + pages.length * 2 + 1} 0 R >> >> /Contents ${contentId} 0 R >>`,
    );
    objects.push(
      `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`,
    );
  });

  const boldFontId = 3 + pages.length * 2 + 1;
  objects.push(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  );

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((body, index) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefStart = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((offset) => {
    pdf += `${offset.toString().padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info << /Title (${escapePdf(profile.name)} - Resume) /Author (${escapePdf(profile.name)}) >> >>\nstartxref\n${xrefStart}\n%%EOF\n`;

  // boldFontId is referenced by pages above; keep the variable meaningful.
  void boldFontId;

  return Buffer.from(pdf, "latin1");
}
