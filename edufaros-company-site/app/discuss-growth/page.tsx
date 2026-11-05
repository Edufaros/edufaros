import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Discuss Your Student Growth Challenge | Contact EduFaros",
  description: "Tell EduFaros about your education business and the student acquisition or enrolment challenge you want to improve.",
  alternates: { canonical: "/discuss-growth/" },
};

export default function DiscussGrowthPage() {
  return (
    <>
      <section className="page-intro-band contact-intro">
        <div className="container page-intro-inner">
          <p className="eyebrow"><span className="eyebrow-rule" /> Start a conversation</p>
          <h1>Tell us what is happening in your student-growth process.</h1>
          <p>You do not need to know the exact bottleneck before getting in touch. Share a little about your business, how prospective students currently reach you and what you want to improve.</p>
          <p>We will review the information and, where there appears to be a fit, use an initial conversation to understand the challenge and decide whether a structured diagnostic makes sense.</p>
        </div>
      </section>
      <section className="section section-ivory contact-section">
        <div className="container contact-layout">
          <aside className="contact-aside">
            <p className="eyebrow"><span className="eyebrow-rule" /> Before we speak</p>
            <h2 className="display-heading">Start with what you know. We can work through the rest together.</h2>
            <p>You do not need to arrive with a perfect diagnosis or choose a service in advance. The initial conversation is about understanding the business and the challenge—not fitting you into a preselected package.</p>
            <div className="contact-aside-note"><span>01</span><p>Share your business model and the part of the student journey you want to improve.</p></div>
            <div className="contact-aside-note"><span>02</span><p>We review the context and, where there appears to be a fit, discuss whether a structured diagnostic makes sense.</p></div>
            <div className="contact-aside-note"><span>03</span><p>Any implementation scope, responsibilities and measures are agreed before work begins.</p></div>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
