/**
 * Curated project catalogue.
 *
 * Every entry maps to a real repository under github.com/MelikaBahmanabadi.
 * Copy is derived from the repository README / code — no invented metrics,
 * screenshots or demos. Repositories the site does not surface can still be
 * reached from the GitHub activity section.
 */

export type ProjectCategory =
  | "AI Agents"
  | "LLM Applications"
  | "Machine Learning"
  | "Computer Vision"
  | "Speech AI"
  | "Data & Analytics"
  | "Web Development"
  | "Other Projects";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  categories: ProjectCategory[];
  stack: string[];
  year: string;
  repo: string;
  liveUrl?: string;
  embedUrl?: string;
  featured?: boolean;
  badge?: string;
  overview: string;
  problem: string;
  features: string[];
  architecture: { step: string; detail: string }[];
};

const gh = "https://github.com/MelikaBahmanabadi";

export const projects: Project[] = [
  {
    slug: "horizon-properties",
    name: "Horizon Properties",
    tagline: "A live, editorial real-estate platform",
    summary:
      "A luxury property site with an editorial catalogue, a scroll-scrubbed video hero and a working enquiry API — deployed publicly on GitHub Pages.",
    categories: ["Web Development"],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Express"],
    year: "2026",
    repo: `${gh}/real-estate-website`,
    liveUrl: "https://melikabahmanabadi.github.io/real-estate-website/",
    embedUrl: "https://melikabahmanabadi.github.io/real-estate-website/",
    featured: true,
    badge: "Live deployment",
    overview:
      "Horizon Properties is a complete real-estate product rather than a landing page: a React + Vite frontend, a Tailwind design system, and a small Express API that serves the property register and records enquiries. The same source publishes two ways — a full site with its own API, or a static GitHub Pages build with the catalogue bundled in.",
    problem:
      "Property listings usually look like databases. This project treats the catalogue as editorial content — cinematic presentation, calm typography and a clear path from browsing to enquiry — while keeping a real backend for the leads that come out of it.",
    features: [
      "Scroll-scrubbed video hero driven by the visitor's scroll position.",
      "Editorial property catalogue served from a typed Express API.",
      "Enquiry and newsletter capture appended to server-side JSON stores.",
      "Static GitHub Pages build that falls back to the visitor's mail app.",
      "Containerised, health-checked deployment path for a VPS or PaaS host.",
    ],
    architecture: [
      {
        step: "Frontend",
        detail:
          "React + Vite with a Tailwind design system and typed data contracts.",
      },
      {
        step: "API",
        detail:
          "Express exposes /api/properties, records enquiries and serves the built site.",
      },
      {
        step: "Dual build",
        detail:
          "npm run build ships the full site; npm run build:static bundles the catalogue for GitHub Pages.",
      },
      {
        step: "Hosting",
        detail:
          "Public demo is the static build on GitHub Pages; the API build runs in Docker.",
      },
    ],
  },
  {
    slug: "persian-asr-pipeline",
    name: "Persian ASR Pipeline",
    tagline: "Call-centre speech analytics for IME",
    summary:
      "Turns Persian call recordings into structured evidence: Whisper transcription, LLM correction, and extraction of agent ratings, customer problems and topics.",
    categories: ["Speech AI", "Machine Learning"],
    stack: ["Python", "Whisper", "Ollama", "jiwer", "Parquet"],
    year: "2026",
    repo: `${gh}/asr`,
    badge: "Applied at IME",
    overview:
      "A production-shaped speech pipeline built for the Iran Mercantile Exchange call centre. Raw recordings are normalised, transcribed by Whisper, corrected and interpreted by a local LLM, then emitted as structured rows that analysts can query instead of re-listening to audio.",
    problem:
      "Call centres sit on thousands of hours of audio that cannot be searched. Manual transcription is slow and inconsistent, customer problems stay buried in recordings, and agent performance is judged subjectively. This pipeline converts voice into structured, comparable data.",
    features: [
      "Audio preprocessing: 16 kHz mono conversion, silence detection and chunking.",
      "Multi-model ASR benchmarking across Whisper variants and Gemma multimodal.",
      "LLM post-processing for spelling, grammar and punctuation repair via Ollama.",
      "Structured extraction: call ID, transcript, agent rating, process helpfulness, problems and topics.",
      "Quality evaluation with WER, CER, Levenshtein and semantic similarity.",
      "CSV, Parquet and Excel exports ready for downstream analytics.",
    ],
    architecture: [
      {
        step: "Input",
        detail:
          "WAV recordings, Parquet datasets and raw audio arrive from the call centre.",
      },
      {
        step: "Preprocess",
        detail:
          "Resampling, silence detection, chunking and format normalisation.",
      },
      {
        step: "Transcribe",
        detail:
          "Whisper Small / Large-v3 Turbo and a multimodal model, scored against each other.",
      },
      {
        step: "Interpret",
        detail:
          "A local model through Ollama corrects the transcript and returns structured JSON per call.",
      },
      {
        step: "Evaluate & export",
        detail:
          "WER/CER and similarity scoring, then CSV, Parquet or Excel for analysts.",
      },
    ],
  },
  {
    slug: "instagram-dm-assistant",
    name: "Instagram DM Assistant",
    tagline: "RAG-powered commerce replies",
    summary:
      "A FastAPI service that answers Persian Instagram DMs with retrieval-augmented product answers and a free LLM backend.",
    categories: ["AI Agents", "LLM Applications", "Web Development"],
    stack: ["Python", "FastAPI", "RAG", "LLM API"],
    year: "2025",
    repo: `${gh}/InstagramChatBot`,
    overview:
      "A simulator for a retail Instagram inbox. A FastAPI endpoint accepts a sender, message ID and text, retrieves the relevant products from a local knowledge base, and returns a natural Persian reply generated by a free LLM API.",
    problem:
      "Small shops answer the same product questions hundreds of times a day. A retrieval-grounded assistant can reply in the shop's own voice and price list without inventing stock or prices.",
    features: [
      "POST /simulate_dm endpoint accepting realistic DM payloads.",
      "Retrieval over a product knowledge base before generation.",
      "Persian-language replies grounded in catalogue prices and availability.",
      "Runs against a free LLM API, so it can be tried without billing setup.",
    ],
    architecture: [
      {
        step: "Request",
        detail: "A DM payload arrives at the FastAPI service on port 8000.",
      },
      {
        step: "Retrieve",
        detail: "Relevant catalogue entries are selected for the question.",
      },
      {
        step: "Generate",
        detail: "The LLM composes a Persian reply constrained to retrieved data.",
      },
      {
        step: "Respond",
        detail: "JSON reply returned to the caller, ready to post back to the inbox.",
      },
    ],
  },
  {
    slug: "local-sql-agent",
    name: "Local SQL Agent",
    tagline: "Plain-English queries, fully offline",
    summary:
      "A local Gemma 3 agent that translates plain-English questions into SQL Server queries — no API key and no data leaving the machine.",
    categories: ["AI Agents", "LLM Applications"],
    stack: ["Python", "Gemma 3", "SQL Server", "Local inference"],
    year: "2026",
    repo: `${gh}/local-sql-agent`,
    badge: "Open-source derivative",
    overview:
      "An open-source agent for querying a SQL Server database in plain English using a fully local Gemma 3 model. It is forked and adapted here as a working reference for private, on-premise database agents — the same constraint my production SQL-agent work operates under.",
    problem:
      "Teams need answers from operational databases but not every colleague writes SQL — and regulated data cannot be sent to a hosted model. A local agent keeps both the schema and the question inside the network.",
    features: [
      "Natural-language to SQL over a SQL Server schema.",
      "Fully local inference — no external API key required.",
      "Schema grounding so generated queries reference real tables.",
      "Runs on a workstation, which makes it easy to evaluate before adoption.",
    ],
    architecture: [
      {
        step: "Schema",
        detail: "Table and column metadata is read from SQL Server.",
      },
      {
        step: "Reason",
        detail: "The local Gemma 3 model maps the question onto that schema.",
      },
      {
        step: "Execute",
        detail: "The generated query runs locally and returns rows.",
      },
    ],
  },
  {
    slug: "license-plate-recognition",
    name: "License Plate Recognition",
    tagline: "Camera to structured plate data",
    summary:
      "A CLI camera pipeline that captures frames, detects Persian licence plates and records recognised characters as JSON.",
    categories: ["Computer Vision"],
    stack: ["Python", "OpenCV", "Typer", "Rich"],
    year: "2026",
    repo: `${gh}/real-estate-website/blob/main/camera_plate_detector.py`,
    overview:
      "A computer-vision utility that runs a camera loop, sends each capture to a detection endpoint, and writes confident plate readings to JSON alongside the saved frames. It lives inside the Horizon Properties repository as a standalone tool.",
    problem:
      "Vehicle access and parking workflows still rely on someone reading plates by hand. A detector with confidence thresholds can automate the routine cases and keep the uncertain ones for review.",
    features: [
      "Live camera capture with timestamped frames saved to disk.",
      "Plate detection at 0.75 confidence and per-character recognition at 0.4.",
      "Rich terminal panel showing each reading as it arrives.",
      "JSON result log for downstream access-control or reporting use.",
    ],
    architecture: [
      {
        step: "Capture",
        detail: "OpenCV grabs a frame from the attached camera.",
      },
      {
        step: "Detect",
        detail: "The frame is posted to the /detect endpoint for plate localisation.",
      },
      {
        step: "Recognise",
        detail: "Characters are read above the confidence thresholds.",
      },
      {
        step: "Record",
        detail: "Results are appended to plates_results.json with the saved capture.",
      },
    ],
  },
  {
    slug: "hosdv-video-tensors",
    name: "HOSDV Video Tensor Analysis",
    tagline: "Decomposing a film into structure",
    summary:
      "Builds a tensor from a movie, applies higher-order singular value decomposition, and reconstructs the film from the compressed representation.",
    categories: ["Computer Vision", "Data & Analytics"],
    stack: ["MATLAB", "Tensor decomposition", "HOSVD"],
    year: "2021",
    repo: `${gh}/Matlab`,
    overview:
      "A MATLAB study of higher-order singular value decomposition applied to video. A movie is lifted into a tensor, decomposed, and then rebuilt — a compact way to see how much of a visual signal survives low-rank approximation.",
    problem:
      "Video is a high-dimensional object; treating it frame by frame hides structure that spans time and colour. Tensor decomposition exposes that structure and shows where compression can be applied without losing what a viewer perceives.",
    features: [
      "Frame extraction into a single tensor representation.",
      "HOSVD decomposition across the video's modes.",
      "Reconstruction back into a playable film.",
      "Side-by-side inspection of the original and reconstructed output.",
    ],
    architecture: [
      {
        step: "Ingest",
        detail: "The movie is decoded into frames and stacked into a tensor.",
      },
      {
        step: "Decompose",
        detail: "HOSVD factorises the tensor along its modes.",
      },
      {
        step: "Reconstruct",
        detail: "The approximated tensor is written back out as a video.",
      },
    ],
  },
  {
    slug: "breast-cancer-visualisation",
    name: "Breast Cancer Visualisation",
    tagline: "Parallel coordinates for diagnosis",
    summary:
      "An interactive D3.js parallel-coordinates view that separates malignant and benign cell measurements at a glance.",
    categories: ["Data & Analytics"],
    stack: ["JavaScript", "D3.js", "Data visualisation"],
    year: "2021",
    repo: `${gh}/BreastCancer`,
    overview:
      "A visual analysis of the breast-cancer cell-measurement dataset using parallel coordinates. Each line is a sample; malignant and benign cases are coloured so the separation between classes becomes visible across every feature axis at once.",
    problem:
      "Diagnostic datasets have dozens of correlated measurements. Tables obscure the pattern, and single-feature charts miss the interaction between them — parallel coordinates make the class separation visually obvious.",
    features: [
      "Parallel-coordinates plot over the full feature set.",
      "Malignant and benign samples coloured for direct comparison.",
      "Brushable axes for narrowing to a subpopulation.",
      "Runs entirely in the browser with D3.js.",
    ],
    architecture: [
      {
        step: "Load",
        detail: "The dataset is parsed in the browser.",
      },
      {
        step: "Scale",
        detail: "Each feature gets its own vertical axis and scale.",
      },
      {
        step: "Plot",
        detail: "Samples are drawn as polylines and coloured by diagnosis.",
      },
      {
        step: "Explore",
        detail: "Brushing an axis filters the visible population.",
      },
    ],
  },
  {
    slug: "subtitle-enrichment",
    name: "Subtitle Enrichment",
    tagline: "Turning subtitles into linked knowledge",
    summary:
      "A Django and NLP project that enriches video subtitles with semantic-web entities and visualises the result with D3.js.",
    categories: ["Machine Learning", "Web Development", "Data & Analytics"],
    stack: ["Python", "Django", "NLP", "D3.js"],
    year: "2021",
    repo: `${gh}/SubtitleEnrichment`,
    overview:
      "Subtitles are plain text today and linked data tomorrow: this project extracts entities and concepts from subtitle tracks, attaches semantic-web annotations, and presents the enriched result through an interactive visualisation.",
    problem:
      "Subtitle files are dead text — searchable only by exact wording. Enriching them with entities makes lectures and talks browsable by concept rather than transcript.",
    features: [
      "Subtitle ingestion through a Django application.",
      "NLP entity and concept extraction from dialogue text.",
      "Semantic-web annotations attached to each cue.",
      "D3.js visualisation of the enriched structure.",
    ],
    architecture: [
      {
        step: "Upload",
        detail: "A subtitle track is submitted to the Django app.",
      },
      {
        step: "Extract",
        detail: "NLP identifies entities, topics and relations per cue.",
      },
      {
        step: "Annotate",
        detail: "Semantic-web triples are attached to the timeline.",
      },
      {
        step: "Visualise",
        detail: "D3.js renders the enriched subtitles for exploration.",
      },
    ],
  },
  {
    slug: "text-classification-service",
    name: "Text Classification Service",
    tagline: "From notebook to Streamlit app",
    summary:
      "A deployed text-classification demo: paste a sentence, get a predicted class, served through Streamlit.",
    categories: ["Machine Learning"],
    stack: ["Python", "Streamlit", "scikit-learn"],
    year: "2022",
    repo: `${gh}/Classification-Deploy`,
    overview:
      "A small end-to-end deployment exercise: a trained text classifier packaged behind a Streamlit interface so a non-technical visitor can try it. The emphasis is on the serving path — model loading, input handling and an answer in the browser.",
    problem:
      "A model in a notebook helps nobody. This project closes the loop between a trained classifier and a usable prediction interface that can be hosted in minutes.",
    features: [
      "Text input with an immediate predicted class.",
      "Streamlit interface with no frontend build step.",
      "Self-contained Python environment for local or hosted runs.",
    ],
    architecture: [
      {
        step: "Train",
        detail: "A scikit-learn classifier is fitted on labelled text.",
      },
      {
        step: "Serve",
        detail: "Streamlit loads the model and renders an input form.",
      },
      {
        step: "Predict",
        detail: "Submitted text is vectorised and classified on the spot.",
      },
    ],
  },
  {
    slug: "mlops-house-prices",
    name: "MLOps House Prices",
    tagline: "A reproducible modelling workspace",
    summary:
      "A Python workspace for house-price modelling, structured around repeatable data preparation, training and evaluation.",
    categories: ["Machine Learning", "Data & Analytics"],
    stack: ["Python", "Data preparation", "Model evaluation"],
    year: "2026",
    repo: `${gh}/mlops-house-price`,
    overview:
      "An MLOps-oriented workspace for house-price prediction. The repository is organised around the parts of a model that are easy to lose in a notebook: repeatable data preparation, training runs and evaluation you can compare.",
    problem:
      "House-price models are a standard regression exercise, which makes them a good place to practice the unglamorous parts — consistent datasets, recorded experiments and evaluable outputs.",
    features: [
      "Structured data-preparation step for the price dataset.",
      "Training workflow separated from exploration.",
      "Evaluation focused on comparable regression results.",
    ],
    architecture: [
      {
        step: "Prepare",
        detail: "Raw property data is cleaned into a modelling table.",
      },
      {
        step: "Train",
        detail: "Regression models are fitted in a repeatable script.",
      },
      {
        step: "Evaluate",
        detail: "Results are compared to choose the shipped model.",
      },
    ],
  },
  {
    slug: "lsh-minhashing",
    name: "LSH & MinHashing",
    tagline: "Similarity search at big-data scale",
    summary:
      "An implementation of locality-sensitive hashing and MinHash for finding near-duplicate items in very large collections.",
    categories: ["Data & Analytics", "Other Projects"],
    stack: ["Python", "MinHash", "LSH", "Big data"],
    year: "2021",
    repo: `${gh}/LSH-MinHashing`,
    overview:
      "A from-scratch implementation of MinHash signatures and locality-sensitive hashing bands. Instead of comparing every pair of documents, similar items collide in the same buckets and only those candidates get compared.",
    problem:
      "Exact comparison across millions of documents is quadratic and quickly impossible. LSH turns near-duplicate detection into a hashing problem with tunable precision.",
    features: [
      "MinHash signature generation over shingled documents.",
      "Banded LSH indexing for candidate retrieval.",
      "Similarity estimation from signature agreement.",
      "Tunable bands and rows to trade recall against precision.",
    ],
    architecture: [
      {
        step: "Shingle",
        detail: "Documents are broken into token shingles.",
      },
      {
        step: "Sign",
        detail: "MinHash builds a compact signature per document.",
      },
      {
        step: "Band",
        detail: "Signatures are split into bands and hashed into buckets.",
      },
      {
        step: "Compare",
        detail: "Only bucket collisions are verified as near-duplicates.",
      },
    ],
  },
  {
    slug: "pyqt-widgets",
    name: "PyQt Widgets",
    tagline: "Practical desktop components",
    summary:
      "A collection of reusable PyQt widgets and layouts assembled from real desktop-interface needs.",
    categories: ["Other Projects"],
    stack: ["Python", "PyQt", "Desktop UI"],
    year: "2021",
    repo: `${gh}/PyQt`,
    overview:
      "A reference collection of PyQt widgets — the small, reusable pieces of desktop interface work that are tedious to rebuild each time: layouts, controls and event handling patterns.",
    problem:
      "Desktop tooling is often the fastest way to put an internal model in front of colleagues, but PyQt's primitives take time to assemble. A widget library shortens that loop.",
    features: [
      "Reusable widget definitions with sensible defaults.",
      "Example layouts demonstrating composition.",
      "Signal and slot wiring for interactive controls.",
    ],
    architecture: [
      {
        step: "Widgets",
        detail: "Individual controls are defined as reusable classes.",
      },
      {
        step: "Compose",
        detail: "Layouts show how they combine into a window.",
      },
      {
        step: "Run",
        detail: "Each example launches a standalone PyQt application.",
      },
    ],
  },
];

export const featuredProject =
  projects.find((project) => project.featured) ?? projects[0];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

