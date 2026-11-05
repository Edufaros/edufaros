import Link from "next/link";
import { CTASection, FAQList, MethodSteps, SectionHeading } from "@/components/site-components";

export const metadata = {
  title: "Our Approach to Student Acquisition & Enrolment Growth",
  description: "See how EduFaros audits the student journey, builds a focused growth strategy, implements the relevant systems and measures what changes.",
  alternates: { canonical: "/approach/" },
};

const faqs = [
  {question:"Do I need to know what is wrong before contacting you?",answer:"No. You can explain what you are trying to improve and what you currently observe. Part of the initial conversation is understanding whether a diagnostic would be useful."},
  {question:"Is the diagnostic free?",answer:"The initial fit conversation is to understand the situation. A detailed audit and written growth blueprint are a separate paid engagement when agreed."},
  {question:"Will you use our existing tools?",answer:"Where practical, yes. We review the current systems before recommending changes. Any new software or integration is scoped separately and discussed before implementation."},
  {question:"How long does an engagement take?",answer:"It depends on the problem, systems, approvals and agreed scope. The timeline is set in the proposal rather than promised before the work is understood."},
  {question:"Do you guarantee more students?",answer:"No unconditional enrolment or revenue guarantee is offered. We define the work, baseline, controllable deliverables and appropriate measures before implementation."},
];

const stages = [
  {
    number:"01",
    name:"Audit",
    title:"Understand the current journey.",
    text:"We review the business offer, target student, acquisition activity and process between first interest and the next meaningful action.",
    points:["Programme or advisory offer and intended student profile","Current traffic, referral and campaign sources","Enquiry forms and information collected","Qualification criteria and lead ownership","Response time, follow-up and booking process","Consultation, assessment, application, registration or payment steps","Available capacity, start dates and team responsibilities","Current reporting, CRM data and measurement gaps"],
    output:"A current-state view, priority bottleneck hypotheses, available baseline and outstanding questions.",
  },
  {
    number:"02",
    name:"Strategise",
    title:"Decide what deserves attention first.",
    text:"We use the audit to identify the most important constraint and agree on the change most likely to address it within the business's capacity and operating reality.",
    points:["The student or family segment to prioritise","The business action that matters most","The specific issue the implementation should address","The relevant channels, pages, workflows or processes","Success measures, data sources and review cadence","Scope, responsibilities, dependencies and exclusions"],
    output:"A prioritised strategy and implementation plan with agreed measures.",
  },
  {
    number:"03",
    name:"Build & Implement",
    title:"Put the agreed strategy into practice.",
    text:"We build or improve the components needed for the chosen scope. Depending on the problem, that may include campaigns, enquiry forms, landing pages, CRM stages, follow-up workflows, booking steps, admissions handoffs or reporting.",
    points:["Configuration and content preparation","Integration or connection of the selected components","Workflow and form testing with dummy records","Team handoff notes and process guidance","Launch checks and issue resolution within the agreed scope"],
    output:"The agreed system components configured, tested and ready for use, with relevant handover documentation.",
  },
  {
    number:"04",
    name:"Measure & Improve",
    title:"Review what changed and decide what comes next.",
    text:"We compare performance with the agreed baseline, review the available data and identify where the process still needs attention.",
    points:["The primary business measure agreed for the project","Leading indicators such as enquiry quality, contact rate and booking rate","Stage-level drop-offs and data quality","Client capacity, response ownership and operational constraints","Tests or changes that are justified by the evidence"],
    output:"A performance review and prioritised next-action plan.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <section className="page-intro-band">
        <div className="container page-intro-inner">
          <p className="eyebrow"><span className="eyebrow-rule" /> Our Approach</p>
          <h1>Understand the problem before deciding what to build.</h1>
          <p>Every education business has a different offer, student journey, team and set of constraints. That is why we do not begin with a fixed package of ads, funnels and automation.</p>
          <p>We first understand how your business attracts and handles student interest. Then we agree on the most important issue to address, build the relevant solution and measure what changes.</p>
          <Link className="button button-gold-dark" href="/discuss-growth/">Discuss Your Student Growth Challenge <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="section section-white">
        <div className="container reframe-grid">
          <div><p className="eyebrow"><span className="eyebrow-rule" /> The principle</p><h2 className="display-heading">A better decision comes before a bigger campaign.</h2></div>
          <div className="body-copy"><p>If the problem is insufficient qualified demand, acquisition may need attention. If suitable enquiries are already coming in but not progressing, the work may belong in qualification, response, booking, admissions coordination or measurement.</p><p>The aim is to solve the right problem—not to add activity for its own sake.</p></div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container">
          <SectionHeading eyebrow="The four stages" title="A practical process from diagnosis to improvement." intro="Each stage has a purpose, a clear output and an agreed decision before the next one begins." />
          <div className="approach-stages">
            {stages.map((stage) => (
              <article className="approach-stage" key={stage.number}>
                <div className="approach-stage-top"><span>{stage.number}</span><p>{stage.name}</p></div>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
                <h4>What we examine or do</h4>
                <ul>{stage.points.map((point) => <li key={point}>{point}</li>)}</ul>
                <div className="stage-output"><strong>Output</strong>{stage.output}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <SectionHeading eyebrow="How an engagement starts" title="A clear route into the work." />
          <div className="engagement-path">
            <article><span>01</span><h3>Initial conversation</h3><p>We understand the business, the offer and the challenge you want to address.</p></article>
            <article><span>02</span><h3>Growth diagnostic</h3><p>When there is a fit, a paid diagnostic reviews the current process and provides a prioritised blueprint.</p></article>
            <article><span>03</span><h3>Defined implementation</h3><p>We agree on deliverables, timeline, responsibilities, dependencies and measures before work begins.</p></article>
            <article><span>04</span><h3>Optimisation, where useful</h3><p>Ongoing support is considered when there is meaningful work to monitor, test and improve.</p></article>
          </div>
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container fit-grid">
          <div><p className="eyebrow"><span className="eyebrow-rule" /> Shared responsibility</p><h2 className="display-heading">A successful implementation needs the right people involved.</h2></div>
          <div className="fit-copy"><p>The business needs to provide accurate programme information, appropriate system access, relevant data, timely approvals and an owner for each part of the enquiry process. The client's team remains responsible for education delivery, admissions decisions and sales or counselling conversations.</p><ul className="plain-list"><li>Every client receives only the components agreed for their situation.</li><li>A new CRM is not required by default.</li><li>More advertising is not always the right answer.</li><li>Ongoing optimisation is considered only when there is meaningful recurring work.</li><li>EduFaros does not control admissions decisions, academic outcomes, funding approvals or student behaviour.</li></ul></div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container narrow-container"><SectionHeading eyebrow="Questions" title="A few things worth knowing." /><FAQList items={faqs} /></div>
      </section>
      <CTASection eyebrow="Start with the business challenge" title="Start with the business challenge—not a preselected service." body="Tell us what you offer, how student enquiries are handled and what you want to improve. We can use that context to determine whether the next step is a fit conversation or a structured diagnostic." />
    </>
  );
}
