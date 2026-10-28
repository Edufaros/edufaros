import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Linkedin, Instagram, MoveUpRight } from "lucide-react";

const footerGroups = [
  {
    title: "Solutions",
    links: [
      ["Performance Marketing", "#solutions"],
      ["Funnels & Conversion", "#solutions"],
      ["CRM & Automation", "#solutions"],
      ["Growth Strategy", "#solutions"]
    ]
  },
  {
    title: "Explore",
    links: [
      ["Who We Help", "#who-we-help"],
      ["Our Method", "#method"],
      ["Our Approach", "#results"],
      ["Insights", "#insights"]
    ]
  },
  {
    title: "Company",
    links: [
      ["About EduFaros", "#about"],
      ["Contact", "#contact"],
      ["Privacy Policy", "#contact"],
      ["Terms of Service", "#contact"]
    ]
  }
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top page-shell">
        <div className="footer-brand">
          <Link href="#top" className="footer-logo-link" aria-label="EduFaros home">
            <Image
              src="/edufaros-logo.svg"
              alt="EduFaros — Education Growth Systems"
              width={760}
              height={253}
              unoptimized
              className="footer-logo"
            />
          </Link>
          <p>
            Growth systems, marketing and strategic support for education
            businesses with bigger ambitions.
          </p>
          <div className="footer-socials" aria-label="Social profiles">
            <a href="#contact" aria-label="LinkedIn profile placeholder"><Linkedin size={16} /></a>
            <a href="#contact" aria-label="Instagram profile placeholder"><Instagram size={16} /></a>
            <a href="#contact" aria-label="Company updates"><MoveUpRight size={16} /></a>
          </div>
        </div>

        {footerGroups.map((group) => (
          <div className="footer-group" key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map(([label, href]) => (
              <Link key={label} href={href}>{label}</Link>
            ))}
          </div>
        ))}

        <div className="footer-newsletter">
          <span className="eyebrow">FIELD NOTES</span>
          <h3>Ideas for education growth.</h3>
          <p>Practical thinking on acquisition, conversion and connected systems.</p>
          <Link href="#insights" className="footer-newsletter-link">
            Explore insights <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <div className="footer-bottom page-shell">
        <span>© {new Date().getFullYear()} EduFaros. All rights reserved.</span>
        <span className="footer-bottom-note">Education Growth Systems</span>
        <Link href="#top" className="back-to-top">Back to top ↑</Link>
      </div>
    </footer>
  );
}