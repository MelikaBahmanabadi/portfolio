import { buildResumePdf } from "@/lib/pdf";

export const runtime = "nodejs";

/**
 * Static by default so the GitHub Pages export (`next build` with
 * GITHUB_PAGES=1) writes `resume.pdf` as a plain file. A dotted route segment
 * keeps the `.pdf` filename in the exported site.
 */
export const dynamic = "force-static";

export async function GET() {
  const pdf = buildResumePdf();

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Melika-Bahman-Abadi-Resume.pdf"',
      "Content-Length": String(pdf.byteLength),
      "Cache-Control": "public, max-age=3600",
    },
  });
}
