import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { segments } from "@/content/segments";
import { CTASection, FAQList, SectionHeading } from "@/components/site-components";

export function generateStaticParams() {
  return segments.map((segment) => ({ slug: segment.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const segment = segments.find((item) => item.slug === slug);
  if (!segment) return {};
  return {
    title: segment.seoTitle,
    description: segment.description,
    alternates: { canonical: `/who-we-help/${segment.slug}/` },
  };
}

export default async function SegmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const segment = segments.find((item) => item.slug === slug);
  if (!segment) notFound();

  return (
    <>
      <section className="page-intro-band segment-page-intro">
        <div className="container page-intro-inner">
          <p className="eyebrow"><span className="eyebrow-rule" /> Who We Help / {segment.title}</p>
          <h1>{segment.heroHeading}</h1>
          <p>{segment.heroBody}</p>
          <div className="hero-actions">
            <Link className="button button-gold-dark" href="/discuss-growth/">{segment.primaryCta} <span aria-hidden="true">↗</span></Link>
            <Link className="button button-outline-dark" href="/approach/">Explore How We Work</Link>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container two-column-copy">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" /> The challenge</p>
            <h2 className="display-heading">{segment.challengeHeading}</h2>
          </div>
          <div className="body-copy"><p>{segment.challengeBody}</p></div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container">
          <SectionHeading eyebrow="The journey" title={segment.journeyHeading} intro="The steps below are a guide to the process we examine. The exact sequence depends on your service and admissions model." />
          <ol className="segment-journey">
            {segment.journey.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong></li>)}
          </ol>
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container two-column-copy">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" /> Diagnosis</p>
            <h2 className="display-heading">{segment.lossHeading}</h2>
          </div>
          <ul className="plain-list">{segment.losses.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="section section-white">
        <div className="container two-column-copy">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" /> Potential scope</p>
            <h2 className="display-heading">{segment.improvementsHeading}</h2>
          </div>
          <div className="body-copy">
            <p>{segment.improvements}</p>
            {segment.responsibility && <p className="scope-note">{segment.responsibility}</p>}
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container">
          <SectionHeading eyebrow="Measurement" title="Measures that matter" intro="The right measures depend on the business model, available data and the outcome agreed for the work." />
          <div className="measure-list">
            {segment.measures.map((measure) => <span key={measure}>{measure}</span>)}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container narrow-container">
          <SectionHeading eyebrow="Questions" title="A few things worth knowing." />
          <FAQList items={segment.faqs} />
        </div>
      </section>

      <CTASection eyebrow="Start with the business challenge" title={segment.finalHeading} body={segment.finalBody} />
    </>
  );
}
