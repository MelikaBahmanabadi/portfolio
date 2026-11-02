import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>
      <h1>This page doesn&rsquo;t exist.</h1>
      <p>
        The link may be outdated — the projects and the rest of the portfolio are
        one click away.
      </p>
      <Link className="btn btn-primary" href="/">
        Back to the portfolio
      </Link>
    </main>
  );
}
