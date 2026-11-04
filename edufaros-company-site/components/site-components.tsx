import Link from "next/link";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  onDark?: boolean;
};

export function SectionHeading({ eyebrow, title, intro, onDark = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading${onDark ? " section-heading-dark" : ""}`}>
      <p className="eyebrow"><span className="eyebrow-rule" /> {eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro-copy">{intro}</p>}
    </div>
  );
}

export function JourneyMap() {
  const stages = [
    ["01", "Attract", "Reach prospective students whose needs, intent and timing fit the programme."],
    ["02", "Capture & qualify", "Collect useful enquiry details and understand whether the prospect is a suitable fit."],
    ["03", "Follow up", "Make sure enquiries are assigned, contacted and given a relevant next step."],
    ["04", "Convert & enrol", "Support consultation, assessment, application, registration, payment or course start."],
    ["05", "Measure & improve", "Understand what progresses, where opportunities stall and what should change next."],
  ];
  return (
    <div className="journey-map">
      {stages.map(([n, title, text]) => (
        <article className="journey-stage" key={n}>
          <span className="journey-stage-number">{n}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

const methods = [
  { number:"01", name:"Audit", short:"Understand the current journey.", text:"Review the offer, audience, acquisition, enquiry handling, follow-up, conversion steps, ownership, capacity and available data.", output:"Current-state view, priority bottleneck hypotheses and baseline questions." },
  { number:"02", name:"Strategise", short:"Decide what deserves attention first.", text:"Agree on the most important constraint, target action, scope, dependencies and the way success will be evaluated.", output:"Prioritised strategy and implementation plan with agreed measures." },
  { number:"03", name:"Build & Implement", short:"Put the agreed strategy into practice.", text:"Build or improve the campaigns, forms, landing pages, pipeline, workflows, bookings, handoffs or reporting components in scope.", output:"Agreed components configured, tested and ready for use with handover notes." },
  { number:"04", name:"Measure & Improve", short:"Review what changed and decide what comes next.", text:"Compare performance with the baseline, review the available data and identify the next justified improvement.", output:"Performance review and prioritised next-action plan." },
];

export function MethodSteps({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`method-steps${compact ? " method-steps-compact" : ""}`}>
      {methods.map((method) => (
        <article className="method-step" key={method.number}>
          <span className="method-number">{method.number}</span>
          <div>
            <p className="method-kicker">{method.name}</p>
            <h3>{method.short}</h3>
            {!compact && <p>{method.text}</p>}
            <div className="method-output"><span>Output</span>{method.output}</div>
          </div>
        </article>
      ))}
    </div>
  );
}

type SegmentCardProps = {
  number: string;
  title: string;
  description: string;
  outcome: string;
  href: string;
};

export function SegmentCard({ number, title, description, outcome, href }: SegmentCardProps) {
  return (
    <article className="segment-card">
      <span className="card-index">{number}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="segment-outcome"><span>Typical next outcome</span>{outcome}</div>
      <Link href={href} className="text-link">Explore this segment <span aria-hidden="true">→</span></Link>
    </article>
  );
}

export function FAQList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details className="faq-item" key={item.question}>
          <summary><span>{item.question}</span><span className="faq-icon" aria-hidden="true">+</span></summary>
          <div className="faq-answer"><p>{item.answer}</p></div>
        </details>
      ))}
    </div>
  );
}

export function CTASection({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <p className="eyebrow eyebrow-on-dark"><span className="eyebrow-rule" /> {eyebrow}</p>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <Link className="button button-gold" href="/discuss-growth/">Discuss Your Student Growth Challenge <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}
