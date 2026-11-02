type IconProps = { size?: number; className?: string };

function svgProps(size: number) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
}

export function SparklesIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.7l-1.6-5.5L5 10.6 10.4 9 12 3.5Z" />
      <path d="M18.5 15.5l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" />
    </svg>
  );
}

export function BrainIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M9.5 4.5a2.7 2.7 0 0 0-2.7 2.7 2.9 2.9 0 0 0-1.6 5.2 3 3 0 0 0 1.9 4.9 2.8 2.8 0 0 0 5.1 1.3V5.9a2.7 2.7 0 0 0-2.7-1.4Z" />
      <path d="M14.5 4.5a2.7 2.7 0 0 1 2.7 2.7 2.9 2.9 0 0 1 1.6 5.2 3 3 0 0 1-1.9 4.9 2.8 2.8 0 0 1-5.1 1.3" />
    </svg>
  );
}

export function EyeIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M2.6 12S6 6.4 12 6.4 21.4 12 21.4 12 18 17.6 12 17.6 2.6 12 2.6 12Z" />
      <circle cx="12" cy="12" r="2.9" />
    </svg>
  );
}

export function WaveIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M3 12h1.6M7 8.4v7.2M10.6 5.6v12.8M14.2 8.9v6.2M17.8 6.8v10.4M21.4 10v4" />
    </svg>
  );
}

export function ChartIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M4 19.4h16" />
      <path d="M6.6 15.6V9.4M11 15.6V5.6M15.4 15.6v-4M19.8 15.6V8" />
    </svg>
  );
}

export function LayersIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="m12 3.6 8 4.2-8 4.2-8-4.2 8-4.2Z" />
      <path d="m4 12 8 4.2 8-4.2" />
      <path d="m4 16.2 8 4.2 8-4.2" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRightIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function GithubIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.35 4.68-4.58 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M6.94 8.5H3.6V21h3.34V8.5ZM5.27 3a1.94 1.94 0 1 0 0 3.88 1.94 1.94 0 0 0 0-3.88ZM20.4 13.9c0-3.32-1.77-4.86-4.13-4.86a3.56 3.56 0 0 0-3.23 1.78V8.5H9.7V21h3.34v-6.7c0-1.77.34-3.48 2.53-3.48 2.16 0 2.19 2.02 2.19 3.6V21h3.34l-.7-7.1Z" />
    </svg>
  );
}

export function DownloadIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M12 3.8v11" />
      <path d="m7.6 10.4 4.4 4.4 4.4-4.4" />
      <path d="M4.5 19.6h15" />
    </svg>
  );
}

export function MailIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <rect x="3" y="5.4" width="18" height="13.2" rx="2.4" />
      <path d="m4 7 8 5.6L20 7" />
    </svg>
  );
}

export function MapPinIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M12 21s6.4-5.5 6.4-10.4A6.4 6.4 0 0 0 5.6 10.6C5.6 15.5 12 21 12 21Z" />
      <circle cx="12" cy="10.4" r="2.3" />
    </svg>
  );
}

export function CheckIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="m4.8 12.4 4.4 4.4 10-10" />
    </svg>
  );
}

export function MenuIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M4 7.5h16M4 12h16M4 16.5h16" />
    </svg>
  );
}

export function CloseIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function SendIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="m4.6 11.6 14.8-6.2-4.6 14.8-2.9-5.9-5.9-2.7Z" />
    </svg>
  );
}

export function BookIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M4 5.6A2 2 0 0 1 6 3.6h12.4v14.8H6a2 2 0 0 0-2 2V5.6Z" />
      <path d="M4 20.4a2 2 0 0 1 2-2h12.4" />
    </svg>
  );
}

export function StarIcon({ size = 14, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="m12 3.8 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8L12 3.8Z" />
    </svg>
  );
}

export function GitForkIcon({ size = 14, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <circle cx="7" cy="5.5" r="2.2" />
      <circle cx="17" cy="5.5" r="2.2" />
      <circle cx="12" cy="18.5" r="2.2" />
      <path d="M7 7.7v2.4a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V7.7" />
      <path d="M12 13.1v3.2" />
    </svg>
  );
}

export function FileTextIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M13.6 3.5H7.2a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9.6a2 2 0 0 0 2-2V8.9l-5.2-5.4Z" />
      <path d="M13.4 3.6v5.2h5.2M8.6 13h6.8M8.6 16.4h4.8" />
    </svg>
  );
}

export function PlayIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M8.4 5.8 18 12l-9.6 6.2V5.8Z" />
    </svg>
  );
}

export const expertiseIcons = {
  agents: SparklesIcon,
  brain: BrainIcon,
  vision: EyeIcon,
  speech: WaveIcon,
  data: ChartIcon,
  systems: LayersIcon,
};
