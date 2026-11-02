import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import "./sections.css";
import { profile, socialLinks } from "@/data/profile";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Melika Bahman-Abadi — AI Engineer",
    template: "%s — Melika Bahman-Abadi",
  },
  description:
    "AI Engineer building intelligent systems: LLM applications, AI agents, computer vision and speech AI. Currently at the Iran Mercantile Exchange.",
  keywords: [
    "Melika Bahman-Abadi",
    "AI Engineer",
    "Machine Learning Engineer",
    "LLM applications",
    "AI agents",
    "computer vision",
    "speech AI",
    "Tehran",
  ],
  authors: [{ name: profile.name, url: socialLinks.github }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Melika Bahman-Abadi — AI Engineer",
    description:
      "Building AI that solves real problems — LLM applications, AI agents, computer vision and speech AI.",
    siteName: profile.name,
    images: [
      {
        url: "/images/melika-portrait.png",
        width: 1254,
        height: 1254,
        alt: "Melika Bahman-Abadi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melika Bahman-Abadi — AI Engineer",
    description:
      "Building AI that solves real problems — LLM applications, AI agents, computer vision and speech AI.",
    images: ["/images/melika-portrait.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAF5F1",
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description:
    "AI Engineer working across LLM applications, AI agents, computer vision and speech AI.",
  url: siteUrl,
  image: `${siteUrl}/images/melika-portrait.png`,
  address: { "@type": "PostalAddress", addressLocality: "Tehran", addressCountry: "IR" },
  worksFor: { "@type": "Organization", name: profile.company, url: profile.companyUrl },
  sameAs: [socialLinks.github, socialLinks.linkedin],
  knowsAbout: [
    "Artificial Intelligence",
    "Large Language Models",
    "AI Agents",
    "Computer Vision",
    "Speech Recognition",
    "Machine Learning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
