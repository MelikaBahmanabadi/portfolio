"use client";

import { useState, type FormEvent } from "react";
import { profile, socialLinks } from "@/data/profile";
import { staticExport } from "@/lib/site";
import {
  ArrowUpRightIcon,
  GithubIcon,
  LinkedinIcon,
  MapPinIcon,
  SendIcon,
} from "./icons";

const projectTypes = [
  "AI agents & LLM applications",
  "Computer vision",
  "Speech AI & audio",
  "Data & analytics",
  "Web development",
  "Something else",
];

type Status = "idle" | "sending" | "success" | "error";

type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      projectType: String(data.get("projectType") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const nextErrors: FormErrors = {};
    if (payload.name.length < 2) nextErrors.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      nextErrors.email = "Please add a valid email address.";
    if (payload.message.length < 12)
      nextErrors.message = "A sentence or two helps me reply properly.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage("Please fix the highlighted fields.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setMessage(
        "Thank you — your message is in. I'll get back to you as soon as I can.",
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="contact-glow" aria-hidden />
      <div className="container">
        <div className="contact-shell">
          <div className="contact-panel">
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow-rule" aria-hidden />
              Contact
            </p>
            <h2 className="contact-title">
              Have an AI project
              <br />
              <em>in mind?</em>
            </h2>
            <p className="contact-lede">
              Let&rsquo;s build something intelligent, meaningful, and impactful
              together. Tell me a little about the problem you&rsquo;re solving.
            </p>

            <ul className="contact-details">
              <li>
                <MapPinIcon size={17} />
                {profile.location}
              </li>
              <li>
                <LinkedinIcon size={16} />
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                  <ArrowUpRightIcon size={13} />
                </a>
              </li>
              <li>
                <GithubIcon size={16} />
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                  <ArrowUpRightIcon size={13} />
                </a>
              </li>
            </ul>

            <p className="contact-foot">
              Messages are reviewed personally — the quickest reply comes through
              LinkedIn.
            </p>
          </div>

          {staticExport ? (
            <div className="contact-form">
              <div className="field">
                <strong>The form isn&rsquo;t connected on this copy</strong>
                <span>
                  This site is published on GitHub Pages, which serves static
                  files only, so messages can&rsquo;t be delivered here.
                  LinkedIn is the quickest way to reach me.
                </span>
              </div>
              <div className="contact-actions">
                <a
                  className="btn btn-primary"
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message me on LinkedIn
                  <ArrowUpRightIcon size={16} />
                </a>
              </div>
            </div>
          ) : (
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  aria-invalid={Boolean(errors.name)}
                  required
                />
                {errors.name ? (
                  <span className="field-error">{errors.name}</span>
                ) : null}
              </div>

              <div className="field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={Boolean(errors.email)}
                  required
                />
                {errors.email ? (
                  <span className="field-error">{errors.email}</span>
                ) : null}
              </div>
            </div>

            <div className="field">
              <label htmlFor="projectType">Project type</label>
              <select id="projectType" name="projectType" defaultValue="">
                <option value="">Select a focus area</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="message">Your message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="What are you building, and where would AI help?"
                aria-invalid={Boolean(errors.message)}
                required
              />
              {errors.message ? (
                <span className="field-error">{errors.message}</span>
              ) : null}
            </div>

            <div className="contact-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send Message"}
                <SendIcon size={16} />
              </button>
              <p
                className={`form-status form-status--${status}`}
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            </div>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}
