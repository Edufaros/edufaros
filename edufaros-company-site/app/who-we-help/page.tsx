import Link from "next/link";
import { CTASection, SectionHeading, SegmentCard } from "@/components/site-components";

export const metadata = {
  title: "Education Businesses We Help | Student Acquisition & Enrolment",
  description: "Explore how EduFaros supports admissions consultancies, language schools, tutoring providers, training businesses and online academies.",
  alternates: { canonical: "/who-we-help/" },
};

const segments = [
  { number:"01", title:"Education & Admissions Consultancies", description:"Attract suitable student and family enquiries, create meaningful consultation opportunities and improve the path to a paid advisory engagement.", outcome:"Enquiry → consultation → paid engagement", href:"/who-we-help/education-admissions-consultancies/" },
  { number:"02", title:"Language Schools & English-Test Preparation", description:"Move course enquiries towards placement assessments, appropriate course recommendations and registrations.", outcome:"Course enquiry → assessment → registration", href:"/who-we-help/language-schools/" },
  { number:"03", title:"Tutoring & Test-Preparation Businesses", description:"Make it easier to understand a family's learning needs, book the right next step and follow up consistently.", outcome:"Family enquiry → trial → paid programme", href:"/who-we-help/tutoring-test-prep/" },
  { number:"04", title:"Vocational & Professional Training", description:"Connect accurate programme information, eligibility questions, application follow-up and enrolment visibility.", outcome:"Programme enquiry → eligible application → course start", href:"/who-we-help/vocational-professional-training/" },
  { number:"05", title:"Online Academies & Certification", description:"Review the path between content, campaigns, webinars, applications, booked calls, checkout and onboarding.", outcome:"Audience interest → purchase → cohort start", href:"/who-we-help/online-academies/" },
];

export default function WhoWeHelpPage() {
  return (
    <>
      <section className="page-intro-band">
        <div className="container page-intro-inner">
          <p className="eyebrow"><span className="eyebrow-rule" /> Who We Help</p>
          <h1>Student growth looks different across education businesses.</h1>
          <p>Whether you help families choose an education pathway, teach languages, prepare learners for exams or deliver professional training, the route from first interest to a paying student is shaped by your offer and admissions process.</p>
          <p>EduFaros works with independent education businesses to understand that journey and improve the points where suitable opportunities may be getting lost.</p>
        </div>
      </section>
      <section className="section section-white">
        <div className="container">
          <SectionHeading eyebrow="Five business pathways" title="Different models. Different conversion journeys." intro="The work starts with the way your business serves learners—not with a preselected marketing package." />
          <div className="segment-grid">
            {segments.map((segment) => <SegmentCard key={segment.number} {...segment} />)}
          </div>
        </div>
      </section>
      <section className="section section-ivory">
        <div className="container fit-grid">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" /> Finding the right fit</p>
            <h2 className="display-heading">The right fit is about your growth process—not only your industry label.</h2>
          </div>
          <div className="fit-copy">
            <p>We are most useful when you have a paid programme or advisory offer, a defined next step for interested prospects, the capacity to serve suitable new customers and a willingness to understand what is happening across the journey.</p>
            <p>Not sure which page reflects your business? You do not need to choose perfectly. Tell us what you offer and where the process feels stuck.</p>
            <Link className="button button-gold-dark" href="/discuss-growth/">Discuss Your Student Growth Challenge <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
      <CTASection eyebrow="A conversation, not a package" title="Tell us what your business is trying to improve." body="You do not need to choose the perfect category or arrive with a diagnosis. Start with the business challenge." />
    </>
  );
}
