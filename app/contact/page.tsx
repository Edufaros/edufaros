import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Compass, MessageSquareText, ShieldCheck } from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Tell EduFaros about your education or knowledge business, the growth challenge you are facing, and what you want to improve."
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="contact-page" id="top">
        <div className="page-shell contact-shell">
          <Link href="/#top" className="contact-back-link">
            <ArrowLeft size={15} aria-hidden="true" /> Back to EduFaros
          </Link>

          <div className="contact-page-heading">
            <div className="hero-eyebrow">
              <span className="eyebrow-live-dot" />
              START WITH THE CHALLENGE
            </div>
            <h1>Let&apos;s understand what&apos;s <span>holding growth back.</span></h1>
            <p>
              Tell us what your business sells, what you want to improve, and what you currently know about your customer journey. We&apos;ll use that context to assess whether EduFaros is a suitable fit and whether there is a useful next step.
            </p>
          </div>

          <div className="contact-page-layout">
            <aside className="contact-context-panel">
              <div className="contact-context-orbit contact-context-orbit-one" aria-hidden="true" />
              <div className="contact-context-orbit contact-context-orbit-two" aria-hidden="true" />
              <div className="contact-context-content">
                <span className="contact-panel-kicker">EDUFAROS / FIRST CONVERSATION</span>
                <h2>Good conversations start with <span>the right context.</span></h2>
                <p>
                  This is not a commitment to a predefined package. It is a first step to understand the business before recommending what to change.
                </p>

                <div className="contact-context-step">
                  <span className="contact-context-icon"><MessageSquareText size={19} /></span>
                  <div><strong>Tell us the situation</strong><p>Share your offer, the challenge, and what progress would look like.</p></div>
                </div>
                <div className="contact-context-step">
                  <span className="contact-context-icon"><Compass size={19} /></span>
                  <div><strong>We assess the fit</strong><p>We look at whether the problem and your current stage fit our approach.</p></div>
                </div>
                <div className="contact-context-step">
                  <span className="contact-context-icon"><CheckCircle2 size={19} /></span>
                  <div><strong>Define a useful next step</strong><p>If there is a fit, we can discuss what deserves attention first.</p></div>
                </div>

                <div className="contact-context-footnote">
                  <ShieldCheck size={15} />
                  <span>No guaranteed results. No prescription before understanding the business.</span>
                </div>
              </div>
            </aside>

            <section className="contact-form-panel" aria-labelledby="contact-form-heading">
              <div className="contact-form-heading">
                <div>
                  <span className="contact-panel-kicker">GROWTH CHALLENGE / INQUIRY</span>
                  <h2 id="contact-form-heading">Tell us about your business.</h2>
                  <p>Fields marked * are required.</p>
                </div>
                <span className="contact-form-mark" aria-hidden="true">EF</span>
              </div>
              <ContactForm />
              <p className="contact-form-privacy">
                Your details will be used to respond to this inquiry and assess whether EduFaros may be a suitable fit.
              </p>
            </section>
          </div>

          <div className="contact-page-bottom">
            <span>EDUFAROS / CLARITY BEFORE ACTIVITY</span>
            <Link href="/#about">Learn about EduFaros <ArrowUpRight size={14} /></Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
