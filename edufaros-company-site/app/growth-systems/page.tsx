import Link from "next/link";
import { CTASection, FAQList, SectionHeading } from "@/components/site-components";

export const metadata = {
  title: "Student Acquisition, Enquiry Management & Enrolment Systems",
  description: "Explore how EduFaros can improve student attraction, enquiry capture, qualification, admissions follow-up, conversion and measurement.",
  alternates: { canonical: "/growth-systems/" },
};

const systems = [
  {number:"01",title:"Student attraction",heading:"Reach people who are a fit for your programme.",body:"We examine the audience, offer, message and acquisition source to understand whether the right prospective students are discovering the business.",parts:"Audience research · Programme messaging · Campaign planning · Paid lead-generation campaigns · Creative/message testing · Campaign review",measures:"Relevant traffic · Enquiry volume · Cost per enquiry · Qualified enquiry rate where defined"},
  {number:"02",title:"Enquiry capture and qualification",heading:"Give every suitable enquiry useful context.",body:"A well-designed enquiry process captures enough information to route and understand an opportunity without asking for unnecessary details.",parts:"Landing-page or form structure · Qualification questions · Course/programme fields · Source capture · CRM records · Lead assignment · Pipeline stages",measures:"Form completion · Contactability · Qualified enquiry rate · Source-level quality"},
  {number:"03",title:"Follow-up and admissions coordination",heading:"Make the next action visible and owned.",body:"The team should be able to see who is responsible for an enquiry, what has happened and what needs to happen next.",parts:"Response workflows · Email or approved messaging sequences · Booking and assessment reminders · Task assignment · Counsellor/admissions handoff · SOPs",measures:"Time to first response · Contact rate · Follow-up completion · Booking rate · Show rate"},
  {number:"04",title:"Conversion-path improvement",heading:"Reduce friction between interest and the meaningful decision.",body:"The next step may be a consultation, placement test, trial, eligibility review, application, registration or checkout. We examine where the current process creates confusion or unnecessary effort.",parts:"Landing-page messaging · Booking flow · Application or registration path · Form simplification · Information hierarchy · Next-step communication",measures:"Consultation/assessment booking · Show rate · Application completion · Paid registration · Other agreed stage conversions"},
  {number:"05",title:"Measurement and optimisation",heading:"Understand what happens beyond the lead form.",body:"We establish the measures that matter for the business model and review the data available across marketing and admissions.",parts:"Stage definitions · Source fields · Pipeline reporting · Campaign review · Conversion analysis · Dashboard requirements · Optimisation priorities",measures:"Qualified enquiries · Consultations · Applications · Paid enrolments · Course starts · Cost per meaningful outcome where reliable records exist"},
];

const faqs = [
  {question:"Do you provide all of these systems in one package?",answer:"No. The appropriate components depend on the diagnosed constraint and the agreed scope."},
  {question:"Which CRM or automation platform do you use?",answer:"The platform is selected or retained based on the client's requirements and the agreed implementation. A tool should support the process, not dictate it."},
  {question:"Can you manage paid advertising?",answer:"Paid lead-generation campaign work is part of the experience represented in the supplied project evidence. The channels and scope for a new engagement are confirmed based on the business need and delivery capability."},
  {question:"Can you improve student retention?",answer:"We can assess and scope communication or re-engagement processes where appropriate. We do not claim that automation alone can fix retention or education-quality issues."},
];

export default function GrowthSystemsPage() {
  return (
    <>
      <section className="page-intro-band">
        <div className="container page-intro-inner">
          <p className="eyebrow"><span className="eyebrow-rule" /> Growth Systems</p>
          <h1>Improve the systems behind student acquisition and enrolment.</h1>
          <p>Student growth is not one task. It is a connected process involving the people you reach, the enquiries you capture, the follow-up your team provides and the steps required to become a paying student.</p>
          <p>EduFaros identifies which part of that process needs attention and builds the relevant components around your business—not a standard bundle that every client receives.</p>
          <Link className="button button-gold-dark" href="/discuss-growth/">Discuss Your Student Growth Challenge <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <SectionHeading eyebrow="Connected capabilities" title="Work on the stage that needs attention." intro="These systems can work together, but a client may need only one part or a combination. The audit determines the appropriate scope." />
          <div className="system-list">
            {systems.map((system) => (
              <article className="system-card" key={system.number}>
                <div className="system-card-number">{system.number}</div>
                <div className="system-card-main">
                  <p className="eyebrow">{system.title}</p>
                  <h2>{system.heading}</h2>
                  <p>{system.body}</p>
                  <div className="system-detail"><strong>Possible components</strong><span>{system.parts}</span></div>
                  <div className="system-detail"><strong>Useful measures</strong><span>{system.measures}</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container selective-support">
          <div><p className="eyebrow"><span className="eyebrow-rule" /> Selective support</p><h2 className="display-heading">Student retention and re-engagement.</h2></div>
          <div className="body-copy"><p>Where it fits the engagement and the provider has reliable student-status data, the work may include onboarding communication, attendance-related follow-up, re-engagement or continuation workflows. These systems can support the student experience, but they do not replace teaching quality, learner support or programme outcomes. Retention improvement is not presented as a proven core result.</p></div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container"><SectionHeading eyebrow="How scope is selected" title="A system shaped around the diagnosed need." intro="We agree on the scope, tools, responsibilities and measures before implementation. A tool should support the process, not dictate it." /></div>
      </section>

      <section className="section section-ivory">
        <div className="container narrow-container"><SectionHeading eyebrow="Questions" title="A few things worth knowing." /><FAQList items={faqs} /></div>
      </section>
      <CTASection eyebrow="Find the real constraint" title="Find the part of your student-growth system that needs attention." body="Start with the challenge you can see. We can examine the parts of the journey around it and decide what deserves attention first." />
    </>
  );
}
