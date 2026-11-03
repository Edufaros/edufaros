export default function HomePage() {
  return (
    <main className="workspace">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <nav className="topbar" aria-label="Primary">
        <a className="wordmark" href="/" aria-label="EduFaros home">
          <span className="wordmark-mark">E</span>
          <span>EduFaros</span>
        </a>
        <span className="workspace-label">NEW WEBSITE / WORKSPACE 01</span>
      </nav>

      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow"><span className="eyebrow-dot" /> A NEW DIGITAL EXPERIENCE</p>
        <h1 id="page-title">
          A new chapter
          <span>for EduFaros.</span>
        </h1>
        <p className="intro">
          This is the clean foundation for our next EduFaros website.
          The structure, story, visual identity, and experience will be shaped here.
        </p>
        <div className="status">
          <span className="status-line" />
          <span>PROJECT INITIALIZED</span>
          <span className="status-separator">/</span>
          <span>READY TO BUILD</span>
        </div>
      </section>

      <footer className="footer">
        <span>EDUFAROS</span>
        <span>STRATEGY / TECHNOLOGY / PERFORMANCE</span>
      </footer>
    </main>
  );
}
