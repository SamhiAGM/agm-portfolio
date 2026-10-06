export default function NotFound() {
  return (
    <main className="fallback-page">
      <span className="eyebrow">404 / UNKNOWN COORDINATES</span>
      <h1>This path leads nowhere.</h1>
      <p>Let’s get you back to the work.</p>
      <a href="/" className="button button-primary">
        Return home
      </a>
    </main>
  );
}
