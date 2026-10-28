import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Discuss a growth challenge with EduFaros."
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="contact-page">
        <section className="contact-page-section page-shell">
          <div className="contact-page-eyebrow">
            <span className="contact-page-mark">EF</span>
            START A CONVERSATION
          </div>
          <div className="contact-page-grid">
            <div className="contact-page-copy">
              <h1>Let&apos;s discuss the growth challenge in front of you.</h1>
              <p>
                Share a little about your business, what you are trying to change,
                and where you feel the current approach is falling short.
              </p>
              <p>
                We&apos;ll start with the context before deciding what might be worth building.
              </p>
              <Link href="/" className="contact-back-link"><ArrowLeft size={15} /> Back to homepage</Link>
            </div>
            <div className="contact-page-card">
              <span className="contact-card-label">THE FIRST STEP</span>
              <div className="contact-card-icon"><Mail size={22} /></div>
              <h2>Tell us what you&apos;re working through.</h2>
              <p>
                Start an email with the challenge, goal or process you&apos;d like to improve.
              </p>
              <a
                className="button contact-email-button"
                href="mailto:contact.edufaros@gmail.com?subject=Discuss%20a%20Growth%20Challenge"
              >
                Email EduFaros <ArrowUpRight size={16} />
              </a>
              <span className="contact-email-note">A useful first conversation starts with context.</span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}