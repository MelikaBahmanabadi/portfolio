import { buildResumePdf } from "@/lib/pdf";

export const runtime = "nodejs";

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
