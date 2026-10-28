import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerGroups = [
  {
    title: "Explore",
    links: [
      ["Home", "/#top"],
      ["About Us", "/#about"],
      ["Contact Us", "/contact"]
    ]
  },
  {
    title: "Our Approach",
    links: [
      ["The Growth Challenge", "/#challenge"],
      ["What We Examine", "/#examine"],
      ["Growth Systems", "/#systems"],
      ["Who We Help", "/#who-we-help"],
      ["How an Engagement Works", "/#engagement"]
    ]
  },
  {
    title: "Information",
    links: [
      ["Privacy Policy", "mailto:contact.edufaros@gmail.com?subject=Request%20for%20Privacy%20Policy"],
      ["Terms", "mailto:contact.edufaros@gmail.com?subject=Request%20for%20Terms"]
    ]
  }
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top page-shell">
        <div className="footer-brand">
          <Link href="/#top" className="footer-logo-link" aria-label="EduFaros home">
            <Image
              src="/edufaros-logo.webp"
              alt="EduFaros — Growth Systems for Education Businesses"
              width={760}
              height={253}
              unoptimized
              className="footer-logo"
            />
          </Link>
          <p>
            EduFaros is a growth-systems partner for established education and knowledge businesses. We audit the current approach, develop a focused strategy, implement what is needed, and measure what changes.
          </p>
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
          <span className="eyebrow">START WITH CONTEXT</span>
          <h3>Let's understand the challenge.</h3>
          <p>Tell us what your business sells, what you want to improve, and what you currently know about the customer journey.</p>
          <Link href="/contact" className="footer-newsletter-link">
            Discuss a Growth Challenge <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <div className="footer-bottom page-shell">
        <span>© {new Date().getFullYear()} EduFaros. All rights reserved.</span>
        <span className="footer-bottom-note">Growth Systems for Education & Knowledge Businesses</span>
        <Link href="/#top" className="back-to-top">Back to top ↑</Link>
      </div>
    </footer>
  );
}
