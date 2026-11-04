import Image from "next/image";
import Link from "next/link";

const segments = [
  ["Education & Admissions Consultancies", "/who-we-help/education-admissions-consultancies/"],
  ["Language Schools & English-Test Preparation", "/who-we-help/language-schools/"],
  ["Tutoring & Test Preparation", "/who-we-help/tutoring-test-prep/"],
  ["Vocational & Professional Training", "/who-we-help/vocational-professional-training/"],
  ["Online Academies & Certification", "/who-we-help/online-academies/"],
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="footer-logo-link" aria-label="EduFaros home">
              <Image
                src="/edufaros-logo.webp"
                alt="EduFaros — Education Growth Systems"
                width={760}
                height={253}
                unoptimized
                className="brand-logo"
              />
            </Link>
            <p className="footer-tagline">Build a stronger path from student interest to enrolment.</p>
            <p>EduFaros helps independent education businesses find where student opportunities are being lost and improve the acquisition, qualification, follow-up and admissions processes that move suitable enquiries forward.</p>
          </div>
          <div className="footer-links">
            <div>
              <h2>Who We Help</h2>
              <Link href="/who-we-help/">Overview</Link>
              {segments.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            </div>
            <div>
              <h2>Explore</h2>
              <Link href="/approach/">How We Work</Link>
              <Link href="/growth-systems/">Growth Systems</Link>
              <Link href="/about/">About EduFaros</Link>
              <Link href="/discuss-growth/">Discuss Your Challenge</Link>
            </div>
            <div>
              <h2>Start a Conversation</h2>
              <p>Tell us what you offer, how enquiries are handled and what you want to improve.</p>
              <Link className="footer-cta-link" href="/discuss-growth/">Discuss Your Student Growth Challenge <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Find the real constraint. Design the strategy. Build the systems.</p>
          <div><span>© {new Date().getFullYear()} EduFaros. All rights reserved.</span><Link href="/privacy/">Privacy Policy</Link></div>
        </div>
      </div>
    </footer>
  );
}
