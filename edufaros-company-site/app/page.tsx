import Link from "next/link";
import { HeroBookVisual } from "@/components/hero-book-visual";
import {
  CTASection,
  FAQList,
  MethodSteps,
  SectionHeading,
  SegmentCard,
} from "@/components/site-components";

export const metadata = {
  title: "Student Acquisition & Enrolment Growth for Education Businesses",
  description:
    "EduFaros helps independent education businesses improve student acquisition, enquiry quality, follow-up and enrolment processes across the US and UK.",
  alternates: { canonical: "/" },
};

const challenges = [
  {
    number: "01",
    title: "Wrong-fit enquiries",
    text: "Enquiries arrive, but they do not match the programme, level, location or entry requirements.",
  },
  {
    number: "02",
    title: "Interest without a next step",
    text: "Prospective students show interest but never book a consultation, assessment or trial.",
  },
  {
    number: "03",
    title: "Follow-up that depends on memory",
    text: "Responses, reminders and handoffs vary because no one has a clear view of the next action.",
  },
  {
    number: "04",
    title: "Limited enrolment visibility",
    text: "Reports show clicks and enquiries, but not what happened after the first conversation.",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Attract the right students",
    text: "Review audience fit, programme messaging and acquisition activity. Where paid campaigns are appropriate, build around the student action that matters—not only the cheapest form submission.",
  },
  {
    number: "02",
    title: "Capture and qualify enquiries",
    text: "Improve forms, enquiry fields and qualification questions so the team can understand who is interested and what should happen next.",
  },
  {
    number: "03",
    title: "Strengthen follow-up and coordination",
    text: "Clarify ownership, pipeline stages, reminders and communication workflows so suitable enquiries do not depend on memory alone.",
  },
  {
    number: "04",
    title: "Improve the conversion path",
    text: "Review the steps between enquiry and consultation, assessment, application, registration or payment. Reduce avoidable confusion and friction.",
  },
  {
    number: "05",
    title: "Make performance easier to understand",
    text: "Agree on the measures that matter, organise the available data and review performance beyond raw clicks and enquiries.",
  },
];

const segments = [
  {
    number: "01",
    title: "Education & Admissions Consultancies",
    description: "Attract suitable student and family enquiries, create meaningful consultation opportunities and improve the path to a paid advisory engagement.",
    outcome: "Enquiry → consultation → paid engagement",
    href: "/who-we-help/education-admissions-consultancies/",
  },
  {
    number: "02",
    title: "Language Schools & English-Test Preparation",
    description: "Move course enquiries towards placement assessments, appropriate course recommendations and registrations.",
    outcome: "Course enquiry → assessment → registration",
    href: "/who-we-help/language-schools/",
  },
  {
    number: "03",
    title: "Tutoring & Test-Preparation Businesses",
    description: "Help suitable families move from an initial enquiry to an assessment, trial and paid learning programme.",
    outcome: "Family enquiry → trial → paid programme",
    href: "/who-we-help/tutoring-test-prep/",
  },
  {
    number: "04",
    title: "Vocational & Professional Training",
    description: "Improve the path from programme interest to eligible applications, completed steps and course starts.",
    outcome: "Programme enquiry → eligible application → start",
    href: "/who-we-help/vocational-professional-training/",
  },
  {
    number: "05",
    title: "Online Academies & Certification",
    description: "Connect audience interest, applications, booked calls, checkout and cohort onboarding.",
    outcome: "Audience interest → purchase → cohort start",
    href: "/who-we-help/online-academies/",
  },
];

const homeFaqs = [
  {
    question: "Do we need more student leads, or could the problem be somewhere else?",
    answer: "It could be either. The first step is to understand your current demand, enquiry quality, response process and conversion journey. If the main constraint is not lead volume, increasing advertising may not be the right move.",
  },
  {
    question: "Does EduFaros only run advertising campaigns?",
    answer: "No. Campaigns may be part of the work when they address the diagnosed problem. The scope can also include enquiry capture, qualification, follow-up workflows, conversion-path improvements and measurement.",
  },
  {
    question: "Do we need to replace our existing CRM or systems?",
    answer: "Not necessarily. We first review what you already use and whether it supports the process. A new tool should be recommended only when there is a clear reason.",
  },
  {
    question: "Does every engagement include all the services on this website?",
    answer: "No. The work is scoped around the business's main constraint, the agreed outcome and the systems that are appropriate for it.",
  },
  {
    question: "Can EduFaros guarantee a certain number of enrolments?",
    answer: "No universal enrolment guarantee is offered. Outcomes also depend on programme fit, pricing, available capacity, market demand, staff response, admissions decisions and other factors. We agree on the work, baseline and measures that can reasonably be monitored.",
  },
  {
    question: "What happens after I contact EduFaros?",
    answer: "We review the information you share and, where there appears to be a fit, arrange an initial conversation about your current student-growth process and the challenge you want to address.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-on-dark"><span className="eyebrow-rule" /> Student Acquisition & Enrolment Growth</p>
            <h1>Build a stronger path from student interest to <em>enrolment.</em></h1>
            <p className="hero-lede">
              EduFaros helps independent education businesses find where suitable student enquiries are being lost—and improve the acquisition, qualification, follow-up and admissions processes that move them towards enrolment.
            </p>
            <p className="hero-supporting">
              We start by understanding the real constraint. Then we design and implement the changes that make sense for your business.
            </p>
            <div className="hero-actions">
              <Link className="button button-gold" href="/discuss-growth/">Discuss Your Student Growth Challenge <span aria-hidden="true">↗</span></Link>
              <Link className="button button-outline-light" href="/approach/">Explore How We Work</Link>
            </div>
            <p className="hero-audience">For education and training businesses in the United States and United Kingdom.</p>
          </div>

          <HeroBookVisual />
        </div>
        <div className="hero-bottom-line" aria-hidden="true" />
      </section>

      <section className="section section-ivory challenge-section">
        <div className="container">
          <SectionHeading
            eyebrow="The growth challenge"
            title="More leads are not always the answer."
            intro="A campaign can generate enquiries and still leave an education business short of its enrolment goals. The issue may sit in the audience being reached, the information collected, the speed of follow-up, the next step offered—or the way the admissions process is managed."
          />
          <div className="challenge-journey-layout">
            <div className="problem-grid">
              {challenges.map((item) => (
                <article className="problem-card" key={item.number}>
                  <span className="card-index">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <aside className="journey-panel" aria-labelledby="journey-panel-title">
              <p className="visual-kicker" id="journey-panel-title">A clearer path through the student journey</p>
              <div className="visual-path">
                <span className="visual-path-line" aria-hidden="true" />
                {[
                  ["01", "Attract", "Reach the right people"],
                  ["02", "Capture", "Understand the enquiry"],
                  ["03", "Follow up", "Make the next step clear"],
                  ["04", "Convert", "Support the decision"],
                  ["05", "Improve", "Learn from the process"],
                ].map(([number, title, detail]) => (
                  <div className="visual-path-step" key={number}>
                    <span className="visual-path-number">{number}</span>
                    <span className="visual-path-copy"><strong>{title}</strong><small>{detail}</small></span>
                  </div>
                ))}
              </div>
              <p className="visual-note">One connected process. Different priorities for every education business.</p>
              <p className="journey-specificity-note">A placement assessment, paid consultation and training eligibility review are different next steps.</p>
            </aside>
          </div>
          <p className="section-close-copy">The first task is not to assume which problem you have. It is to find out where the journey is breaking down.</p>
        </div>
      </section>

      <section className="section section-white reframe-section">
        <div className="container reframe-grid">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" /> Diagnosis before activity</p>
            <h2 className="display-heading">Before investing in more activity, understand what is holding growth back.</h2>
          </div>
          <div className="reframe-copy">
            <p>More advertising may help when suitable demand is too low. It will not fix a confusing offer, weak programme fit, unassigned enquiries or an admissions process that loses track of interested people.</p>
            <p>EduFaros looks at the full path—from the first response to a campaign or recommendation through to the meaningful action your business wants the prospect to take. We use that picture to identify what deserves attention first.</p>
            <Link className="text-link" href="/approach/">See how our approach works <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="container">
          <div className="contrast-panel">
            <div className="contrast-side contrast-muted">
              <span className="contrast-label">More activity</span>
              <h3>More clicks. More forms. More noise.</h3>
              <p>Activity can increase without solving the reason suitable prospects do not progress.</p>
            </div>
            <div className="contrast-divider" aria-hidden="true">/</div>
            <div className="contrast-side">
              <span className="contrast-label">Understand the constraint first</span>
              <h3>Find the stage that needs attention.</h3>
              <p>Look at fit, information, ownership, follow-up and the next meaningful action.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container">
          <SectionHeading
            eyebrow="What EduFaros may improve"
            title="Work on the part of the journey that needs attention."
            intro="The right components depend on the business, its current process and the constraint identified during the audit."
          />
          <div className="capability-grid">
            {capabilities.map((item) => (
              <article className="capability-card" key={item.number}>
                <span className="card-index">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="section-link-row"><Link className="text-link" href="/growth-systems/">Explore Growth Systems <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="section section-navy">
        <div className="container">
          <SectionHeading
            eyebrow="How we work"
            title="Understand first. Build second."
            intro="We do not start by assuming every education business needs more ads, a new funnel or another CRM. We first understand the offer, the student journey and the current process. Then we agree on the priority and implement the relevant solution."
            onDark
          />
          <MethodSteps compact />
          <div className="section-link-row"><Link className="button button-outline-light" href="/approach/">Explore How We Work <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <SectionHeading
            eyebrow="Who we help"
            title="Built around the way your education business enrols students."
            intro="We focus on independent education businesses in the United States and United Kingdom, with a different journey for every model."
          />
          <div className="segment-grid">
            {segments.map((segment) => <SegmentCard key={segment.number} {...segment} />)}
          </div>
          <div className="section-link-row"><Link className="text-link" href="/who-we-help/">Find your business type <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container experience-grid">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" /> Practical experience</p>
            <h2 className="display-heading">Practical experience across student acquisition and enquiry management.</h2>
          </div>
          <div className="experience-copy">
            <p>Our work has included education-focused acquisition campaigns, student enquiry capture, qualification, pipeline organisation, WhatsApp follow-up and coordination with counselling teams.</p>
            <p>The aim is to connect the activity that creates interest with the process that handles it afterwards.</p>
            <div className="experience-note">
              <span className="experience-note-mark">EF</span>
              <p>Find the real constraint.<br />Design the strategy.<br />Build the systems.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container fit-grid">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" /> Is EduFaros the right fit?</p>
            <h2 className="display-heading">Best suited to education businesses with a real programme and a process to improve.</h2>
          </div>
          <div className="fit-copy">
            <p>EduFaros is likely to be a better fit when your business:</p>
            <ul className="check-list">
              <li>Sells a paid course, class, training programme, certification or education-related advisory service.</li>
              <li>Has an identifiable student or family enquiry and enrolment journey.</li>
              <li>Has capacity, or a clear plan to create capacity, for additional suitable students.</li>
              <li>Has someone responsible for responding to enquiries and managing the next steps.</li>
              <li>Is willing to review its process, share relevant business data and agree on meaningful measures.</li>
            </ul>
            <p className="muted-paragraph">We may not be the right fit if the programme itself is not ready to sell, there is no capacity to serve additional students, nobody can respond to enquiries, or the expected outcome depends on admissions decisions or educational results outside the agreed work.</p>
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container narrow-container">
          <SectionHeading eyebrow="Questions" title="A few things worth knowing." intro="A clear view of the work starts with clear expectations." />
          <FAQList items={homeFaqs} />
        </div>
      </section>

      <CTASection
        eyebrow="Start with the real challenge"
        title="Not sure where student opportunities are being lost?"
        body="You do not need to arrive with a perfect diagnosis. Tell us how your current student acquisition and enrolment process works, where you are seeing friction and what you want to improve. We can use that conversation to determine whether a closer review makes sense."
      />
    </>
  );
}
