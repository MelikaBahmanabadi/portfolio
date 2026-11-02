import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  message?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const projectType =
    typeof body.projectType === "string" ? body.projectType.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2) {
    return NextResponse.json({ error: "Please include your name." }, { status: 400 });
  }
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Please include a valid email address." },
      { status: 400 },
    );
  }
  if (message.length < 12) {
    return NextResponse.json(
      { error: "Please write a slightly longer message." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "That message is too long." }, { status: 400 });
  }

  const entry = {
    name,
    email,
    projectType: projectType || "Not specified",
    message,
    receivedAt: new Date().toISOString(),
  };

  let stored = false;
  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "messages.jsonl"),
      `${JSON.stringify(entry)}\n`,
      "utf8",
    );
    stored = true;
  } catch (error) {
    console.error("Could not persist contact message", error);
  }

  // Optional delivery: set RESEND_API_KEY and CONTACT_TO_EMAIL to email the message.
  let delivered = false;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (apiKey && to) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject: `Portfolio enquiry — ${name}`,
          text: `From: ${name} <${email}>\nProject type: ${entry.projectType}\n\n${message}`,
        }),
      });
      delivered = response.ok;
      if (!response.ok) {
        console.error("Resend delivery failed", response.status);
      }
    } catch (error) {
      console.error("Resend delivery error", error);
    }
  }

  if (!stored && !delivered) {
    return NextResponse.json(
      { error: "The message could not be delivered. Please try again shortly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, delivered });
}
