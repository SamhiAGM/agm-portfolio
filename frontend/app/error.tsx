"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="fallback-page">
      <span className="eyebrow">SOMETHING WENT WRONG</span>
      <h1>Let’s try that again.</h1>
      <p>The page couldn’t finish loading.</p>
      <button className="button button-primary" onClick={reset}>
        Retry
      </button>
      <a href="/">Return home</a>
    </main>
  );
}
