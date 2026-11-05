import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section section-ivory not-found-page">
      <div className="container narrow-container">
        <p className="eyebrow"><span className="eyebrow-rule" /> 404 / Page not found</p>
        <h1 className="display-heading">This page is not here.</h1>
        <p>The page may have moved, or the address may be incorrect. You can return to the homepage or explore the education businesses we help.</p>
        <div className="hero-actions"><Link className="button button-gold-dark" href="/">Back to Home</Link><Link className="button button-outline-dark" href="/who-we-help/">Who We Help</Link></div>
      </div>
    </section>
  );
}
