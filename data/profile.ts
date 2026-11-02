/**
 * Single source of truth for every piece of profile content on the site.
 *
 * VERIFIED SOURCES
 * - GitHub profile  https://github.com/MelikaBahmanabadi
 * - Repository READMEs (asr, InstagramChatBot, real-estate-website, ...)
 * - Peer-reviewed papers (arXiv 2203.11157, arXiv 2309.08924)
 *
 * LinkedIn blocks automated access, so employment dates, degree details and
 * any extra roles are intentionally left out instead of being invented.
 * Add them below — every section of the site renders from this file.
 */

import type { ProjectCategory } from "./projects";

export const socialLinks = {
  github: "https://github.com/MelikaBahmanabadi",
  linkedin: "https://www.linkedin.com/in/melikabahmanabadi/",
} as const;

export const profile = {
  name: "Melika Bahman-Abadi",
  shortName: "Melika",
  role: "AI Engineer",
  /** Public email is not listed on GitHub — set one here to show it site-wide. */
  email: null as string | null,
  location: "Tehran, Iran",
  company: "Iran Mercantile Exchange (IME)",
  companyUrl: "https://www.ime.co.ir/",
  badge: "AI Engineer | Building Intelligent Systems",
  headline: "Building AI that solves real problems.",
  intro:
    "I'm an AI Engineer passionate about building intelligent systems that transform complex challenges into practical solutions — from AI agents and conversational intelligence to computer vision and speech AI.",
  heroNote: {
    label: "Currently",
    value: "AI Engineer at Iran Mercantile Exchange",
    href: "https://www.ime.co.ir/",
  },
  about: {
    eyebrow: "About me",
    title: "Turning ideas into intelligent solutions.",
    paragraphs: [
      "I'm an AI Engineer at the Iran Mercantile Exchange, where I build AI systems for finance, oil and petrochemicals — LLM applications, SQL agents, speech analytics and computer vision.",
      "My work sits where research meets operations: turning Persian call-centre recordings into structured evidence, making operational databases answerable in plain language, and designing pipelines that a team can actually trust in production.",
      "Before that, my research explored AI-assisted learning and large-scale data archival, which still shapes how I think about retrieval, evaluation and the human on the other side of a model.",
    ],
    traits: [
      "Systems thinker",
      "Research-grounded",
      "Outcome focused",
      "Clear communicator",
    ],
    stat: { value: "2", label: "Peer-reviewed papers" },
  },
} as const;

export type Expertise = {
  title: string;
  description: string;
  stack: string[];
  icon: "agents" | "brain" | "vision" | "speech" | "data" | "systems";
};

export const expertise: Expertise[] = [
  {
    title: "AI Agents & LLM Applications",
    description:
      "Retrieval-augmented assistants and tool-using agents that answer in plain language over real business data.",
    stack: ["RAG", "LLM APIs", "FastAPI", "Prompt design"],
    icon: "agents",
  },
  {
    title: "Machine Learning & Deep Learning",
    description:
      "Classification, forecasting and evaluation pipelines — from feature work to a deployed, testable service.",
    stack: ["scikit-learn", "Streamlit", "Pandas", "Model evaluation"],
    icon: "brain",
  },
  {
    title: "Computer Vision",
    description:
      "Detection and recognition pipelines for real camera input, including Persian licence-plate reading.",
    stack: ["OpenCV", "Detection", "Recognition", "Python"],
    icon: "vision",
  },
  {
    title: "Speech AI & Audio Processing",
    description:
      "Persian speech-to-text with LLM correction, quality benchmarking and structured call analytics.",
    stack: ["Whisper", "Ollama", "jiwer", "SentenceTransformers"],
    icon: "speech",
  },
  {
    title: "Data Science & Analytics",
    description:
      "Making dense datasets legible — from parallel-coordinates visualisations to big-data hashing techniques.",
    stack: ["Pandas", "NumPy", "D3.js", "Parquet"],
    icon: "data",
  },
  {
    title: "AI Systems & Backend Engineering",
    description:
      "APIs, services and pipelines that hold up outside a notebook: typed interfaces, containers and clear data contracts.",
    stack: ["Python", "Django", "TypeScript", "Docker"],
    icon: "systems",
  },
];

export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
};

/**
 * Only verifiable information is listed. Add earlier roles (with real dates)
 * to this array and the timeline updates automatically.
 */
export const experience: Experience[] = [
  {
    role: "AI Engineer",
    company: "Iran Mercantile Exchange (IME)",
    companyUrl: "https://www.ime.co.ir/",
    period: "Present",
    location: "Tehran, Iran",
    summary:
      "Building applied AI for a commodity exchange — language models, SQL agents, speech analytics and computer vision.",
    highlights: [
      "Designed a Persian ASR pipeline that transcribes call-centre recordings, corrects transcripts with local LLMs and extracts agent ratings, customer problems and topics as structured data.",
      "Work on local LLM/SQL agents that let teams query operational databases in plain English without sending data to an external provider.",
      "Apply computer vision and data intelligence to finance, oil and petrochemical use cases.",
    ],
  },
  {
    role: "Researcher — AI & Large-Scale Data Systems",
    company: "Shahed University",
    companyUrl: "https://www.arxiv.org/abs/2309.08924",
    period: "2022 — 2023",
    location: "Tehran, Iran",
    summary:
      "Co-authored two peer-reviewed papers on AI-assisted learning and tempo-spatial data archival.",
    highlights: [
      "AI-EVL: an AI-annotated recommendation layer for visual learning environments, evaluated on Google 2020 trend data.",
      "TS-CDN: a hash-based tempo-spatial content delivery network for archiving and exploring large-scale social data.",
    ],
  },
];

export const education = [
  {
    school: "Shahed University",
    location: "Tehran, Iran",
    detail: "Research in AI, NLP and large-scale data systems",
    note:
      "Degree title and dates are not published publicly — add them in data/profile.ts.",
  },
];

export type Publication = {
  title: string;
  venue: string;
  year: string;
  authors: string;
  href: string;
  summary: string;
};

export const publications: Publication[] = [
  {
    title:
      "AI Annotated Recommendations in an Efficient Visual Learning Environment with Emphasis on YouTube (AI-EVL)",
    venue: "arXiv preprint",
    year: "2022",
    authors: "F. Gholamrezaie, M. Bahman-Abadi, M. B. Ghaznavi-Ghoushchi",
    href: "https://arxiv.org/abs/2203.11157",
    summary:
      "An annotated learning system that recommends relevant video material, cutting bandwidth while enriching online curricula.",
  },
  {
    title:
      "Analysis and Extraction of Tempo-Spatial Events in an Efficient Archival CDN with Emphasis on Telegram",
    venue: "arXiv preprint",
    year: "2023",
    authors: "M. Bahman-Abadi, M. B. Ghaznavi-Ghoushchi",
    href: "https://arxiv.org/abs/2309.08924",
    summary:
      "TS-CDN: a hash-based archival framework for tracking and exploring large-scale tempo-spatial social data.",
  },
];

export const resumeSkills: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Python", "TypeScript", "SQL", "MATLAB"] },
  {
    label: "AI & ML",
    items: [
      "LLM applications",
      "RAG",
      "AI agents",
      "Whisper ASR",
      "scikit-learn",
      "OpenCV",
    ],
  },
  {
    label: "Data",
    items: ["Pandas", "NumPy", "Parquet", "D3.js", "Neo4j", "MinHash / LSH"],
  },
  {
    label: "Engineering",
    items: ["FastAPI", "Django", "React", "Docker", "Git"],
  },
];

export const projectCategoryOrder: ProjectCategory[] = [
  "AI Agents",
  "LLM Applications",
  "Machine Learning",
  "Computer Vision",
  "Speech AI",
  "Data & Analytics",
  "Web Development",
  "Other Projects",
];
