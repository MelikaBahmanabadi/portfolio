"use client";

import { useState } from "react";
import { ArrowUpRightIcon, PlayIcon } from "./icons";
import { ProjectCover } from "./project-cover";

type LivePreviewProps = {
  url: string;
  title: string;
  name: string;
  stack: string[];
};

/**
 * Live site embed. Nothing loads until the visitor asks for it, so the page
 * stays light; the iframe is then shown in place with an external-link escape
 * hatch. GitHub Pages sends no frame-blocking headers, so this embeds cleanly.
 */
export function LivePreview({ url, title, name, stack }: LivePreviewProps) {
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`live-preview${active ? " is-active" : ""}`}>
      <div className="live-preview-bar">
        <span className="live-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="live-url">
          {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </span>
        <a
          className="live-open"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open
          <ArrowUpRightIcon size={13} />
        </a>
      </div>

      <div className="live-preview-stage">
        {active ? (
          <>
            {!loaded ? (
              <div className="live-loading">Loading the live site…</div>
            ) : null}
            <iframe
              src={url}
              title={title}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </>
        ) : (
          <div className="live-poster">
            <ProjectCover name={name} stack={stack} index={0} />
            <div className="live-poster-veil" aria-hidden />
            <button
              type="button"
              className="live-launch"
              onClick={() => setActive(true)}
            >
              <span className="live-launch-icon" aria-hidden>
                <PlayIcon size={14} />
              </span>
              Launch live preview
            </button>
            <p className="live-poster-note">
              The deployed site, embedded right here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
