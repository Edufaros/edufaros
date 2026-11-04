import Link from "next/link";
import { CTASection, SectionHeading } from "@/components/site-components";

export const metadata = {
  title: "About EduFaros | Student Acquisition & Enrolment Growth",
  description: "Learn about EduFaros and its diagnosis-first approach to helping independent education businesses improve student acquisition and enrolment processes.",
  alternates: { canonical: "/about/" },
};

const principles = [
  ["Understand before prescribing", "More traffic is not always the answer."],
  ["Respect the student's journey", "Qualification and follow-up should be relevant, clear and appropriate."],
  ["Build for the team that will use it", "Systems should fit real people and workloads."],
  ["Measure what matters", "A raw enquiry count is not the same as a paid enrolment or course start."],
  ["Improve with evidence", "The next step should be based on what the data and process reveal."],
];

export default function AboutPage() {
  return (
    <>
      <section className="page-intro-band">
        <div className="container page-intro-inner">
          <p className="eyebrow"><span className="eyebrow-rule" /> About EduFaros</p>
          <h1>Growth should be built around the real problem.</h1>
          <p>EduFaros exists to help independent education businesses understand what is holding student growth back—and build practical systems to address it.</p>
          <p>We believe better growth work starts with better questions: Who is the right student? What happens after they enquire? Where does the process slow down? What does the business actually need to improve first?</p>
        </div>
      </section>

      <section className="section section-white">
        <div className="container about-story">
          <div><p className="eyebrow"><span className="eyebrow-rule" /> The thinking behind EduFaros</p><h2 className="display-heading">Education businesses do not all grow in the same way.</h2></div>
          <div className="body-copy">
            <p>A consultancy needs suitable family conversations. A language school needs learners matched to the right course. A tutoring centre may need more assessment bookings. A training provider needs eligible applicants to complete the right steps. An online academy may need to improve the journey from audience interest to cohort purchase.</p>
            <p>Treating these businesses as if they all need the same campaign or funnel misses the important part: the way each business turns interest into a customer.</p>
            <p>That is why EduFaros begins by understanding the offer, student journey, team process and available data before recommending what to build.</p>
          </div>
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container founder-panel">
          <div className="founder-mark" aria-hidden="true"><span>EF</span><i /></div>
          <div className="founder-copy">
            <p className="eyebrow"><span className="eyebrow-rule" /> A founder-led approach</p>
            <h2 className="display-heading">A lead form is only one moment in a much longer student journey.</h2>
            <p>EduFaros is founder-led. Work with education businesses has included student acquisition campaigns, enquiry capture, qualification, pipeline organisation and communication with counselling teams.</p>
            <p>Those experiences shaped a simple operating belief: the business also needs a clear way to understand, contact and progress suitable enquiries after the first expression of interest.</p>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <SectionHeading eyebrow="How we think about growth" title="A few principles guide the work." />
          <div className="principle-grid">
            {principles.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container two-column-copy">
          <div><p className="eyebrow"><span className="eyebrow-rule" /> Who we work with</p><h2 className="display-heading">Independent education businesses in the US and UK.</h2></div>
          <div className="body-copy"><p>We focus on education and admissions consultancies, language schools, tutoring and test-preparation providers, vocational and professional training businesses, and online academies.</p><Link className="text-link" href="/who-we-help/">Explore who we help <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>
      <CTASection eyebrow="A clearer starting point" title="Let's understand what growth needs from your business." body="Tell us what you offer, how student interest moves through the business and what you want to improve." />
    </>
  );
}
