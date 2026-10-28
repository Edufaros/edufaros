import Link from "next/link";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Building2,
  Check,
  ClipboardCheck,
  Compass,
  Eye,
  FileSearch,
  Gauge,
  GraduationCap,
  Handshake,
  Layers3,
  Lightbulb,
  MessageSquareText,
  MonitorPlay,
  Network,
  Play,
  Route,
  Search,
  ShieldCheck,
  Target,
  Users,
  Workflow
} from "lucide-react";
import SiteHeader from "@/components/site-header";
import FounderMessage from "@/components/founder-message";
import SiteFooter from "@/components/site-footer";
import HeroVisual from "@/components/hero-visual";
import Reveal from "@/components/reveal";

const approach = [
  {
    number: "01",
    label: "DIAGNOSE",
    icon: Search,
    title: "Audit",
    description: "We examine the offer, audience, current approach, demand sources, customer journey, conversion process, follow-up, available measurement, and operating constraints. The aim is to understand the current situation and identify the areas that deserve closer attention."
  },
  {
    number: "02",
    label: "PRIORITIZE",
    icon: Compass,
    title: "Strategize",
    description: "We use what the audit reveals to identify the most important constraint or opportunity, prioritize what to address first, and define a focused objective and implementation plan."
  },
  {
    number: "03",
    label: "PUT INTO PRACTICE",
    icon: Workflow,
    title: "Build & Implement",
    description: "We implement the agreed components needed to put the strategy into practice. Depending on the situation, this may involve campaigns, pages, conversion flows, CRM workflows, follow-up, automation, tracking, or changes to an operating process."
  },
  {
    number: "04",
    label: "LEARN & REFINE",
    icon: Activity,
    title: "Measure & Improve",
    description: "We test the implementation, review performance against an available baseline, and assess what the evidence shows. The next improvement is based on what we learn—not on adding activity for its own sake."
  }
];

const auditAreas = [
  {
    number: "01",
    icon: Lightbulb,
    title: "The Offer and Its Audience",
    description: "Is the offer clear? Does it speak to the right audience? Can prospective customers understand what is being offered, who it is for, and what the next step involves?"
  },
  {
    number: "02",
    icon: Target,
    title: "Sources of Demand",
    description: "Where do inquiries, visitors, referrals, registrations, or buyers currently come from? What can the business tell about the quality of those sources—not just the volume of activity they produce?"
  },
  {
    number: "03",
    icon: Route,
    title: "The Conversion Path",
    description: "What happens after someone first shows interest? We look at the relevant steps between discovery and the business's primary conversion, whether that is an inquiry, consultation, trial, registration, checkout, or signed engagement."
  },
  {
    number: "04",
    icon: MessageSquareText,
    title: "Follow-Up and Ownership",
    description: "Are the next steps clear? Who is responsible for responding? Are reminders, follow-up tasks, and appropriate messages handled consistently?"
  },
  {
    number: "05",
    icon: Eye,
    title: "Measurement and Visibility",
    description: "Can the business connect its marketing activity to meaningful downstream outcomes? Where data is available and reliable, we look beyond clicks and raw lead counts to the measures that matter to the business."
  },
  {
    number: "06",
    icon: Gauge,
    title: "Capacity and Operating Constraints",
    description: "Can the business respond to and serve additional customers? Do budget, team capacity, sales processes, delivery schedules, or other operating conditions affect what should happen next?"
  }
];

const systems = [
  {
    number: "01",
    tag: "DEMAND",
    icon: Target,
    title: "Demand Generation",
    description: "Reach relevant prospective customers through channels suited to the offer and buyer. Where appropriate, this may include paid acquisition, campaign structure, audience and offer messaging, and relevant campaign pages."
  },
  {
    number: "02",
    tag: "CONVERSION",
    icon: Layers3,
    title: "Conversion Architecture",
    description: "Make the next step clear and measurable. Depending on the customer journey, this may include landing pages, offer pages, inquiry forms, qualification, consultation booking, trial registration, checkout, or enrollment flows."
  },
  {
    number: "03",
    tag: "OPERATIONS",
    icon: Workflow,
    title: "Follow-Up and Automation",
    description: "Make repeatable steps and ownership more consistent. Depending on the need, this may include CRM stages, lead routing, reminders, permission-based nurture, follow-up tasks, and selected administrative workflows."
  },
  {
    number: "04",
    tag: "MEASUREMENT",
    icon: BarChart3,
    title: "Measurement and Optimization",
    description: "Improve visibility into what is happening across the customer journey. Where reliable data is available, this may include tracking plans, source reporting, conversion metrics, dashboards, performance reviews, and prioritized improvement cycles."
  }
];

const audiences = [
  {
    number: "01",
    icon: GraduationCap,
    title: "Independent Admissions Consultants & College Counselors",
    description: "For independent educational consultants and smaller practices advising students and families on college choice and applications.",
    examines: "We may examine how the practice explains its services, attracts suitable family inquiries, qualifies prospective clients, books consultations, follows up with families, and understands which sources lead to signed engagements.",
    journey: "Suitable family inquiry → qualification → fit call or consultation → paid package or signed engagement."
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Professional Certification & Exam-Prep Companies",
    description: "For businesses selling preparation courses, question banks, study materials, mock exams, tutoring, bootcamps, or subscriptions for professional credentials and exams.",
    examines: "We may examine the path from exam-specific interest to a sample, trial, or course page and onward to paid enrollment, including offer clarity, checkout, follow-up, and measurement through purchase.",
    journey: "Exam-specific interest → course page → sample, trial, or checkout → paid course enrollment."
  },
  {
    number: "03",
    icon: Building2,
    title: "Continuing Education Providers",
    description: "For providers selling professional development courses, webinars, workshops, credit-bearing learning, memberships, course bundles, or employer training.",
    examines: "We may examine course discovery, registration, webinar follow-up, purchase and refund data, repeat registration, and relevant paths to further courses or employer opportunities.",
    journey: "Professional learning need → course discovery or webinar → paid registration → relevant next course or program."
  },
  {
    number: "04",
    icon: MessageSquareText,
    title: "Online Language & Test-Preparation Businesses",
    description: "For online businesses offering language instruction or preparation for tests such as IELTS, TOEFL, PTE, OET, and similar exams.",
    examines: "We may examine how learners move from search, referral, or campaign activity to a relevant course page, inquiry or trial, follow-up, and paid enrollment—while taking class schedules and teaching capacity into account.",
    journey: "Relevant learner interest → inquiry or trial → follow-up → paid course or cohort enrollment."
  },
  {
    number: "05",
    icon: MonitorPlay,
    title: "Online Coaches, Trainers & Educational Content Creators",
    description: "For expertise-led businesses that already sell a paid coaching offer, course, cohort, workshop, membership, professional training program, or B2B education service.",
    examines: "We may examine how existing audience and demand become qualified bookings, leads, or purchases, and whether launch follow-up, checkout, onboarding, or retention processes need attention.",
    journey: "Audience or demand source → booking, lead capture, or checkout → appropriate follow-up → paid program, course, cohort, or membership."
  },
  {
    number: "06",
    icon: Users,
    title: "College-Admissions Consultancies",
    description: "For branded college-admissions advisory firms with multiple counselors or a structured team serving students and families, primarily around U.S. college applications.",
    examines: "We may examine qualification, consultation booking and attendance, proposal follow-up, ownership of inquiries, team capacity, and the ability to connect inquiry sources to signed advisory engagements.",
    journey: "Discovery → qualified family inquiry → consultation → proposal or package decision → signed engagement."
  }
];

const engagementSteps = [
  {
    number: "01",
    icon: Handshake,
    title: "Confirm Fit",
    description: "We establish whether the business has a suitable paid offer, a meaningful challenge to address, the ability to implement changes, and a clear objective for the work."
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Understand the Current Journey",
    description: "We review the relevant customer journey, acquisition sources, conversion steps, follow-up, measurement, and operating constraints. Where possible, we establish a baseline for the agreed measures."
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Agree on the Strategy and Scope",
    description: "We define the priority to address, the intended outcome, the implementation components, responsibilities, exclusions, timeline, and completion criteria."
  },
  {
    number: "04",
    icon: Workflow,
    title: "Build and Test",
    description: "We implement the agreed scope and check the relevant pages, forms, workflows, notifications, booking or checkout steps, tracking, and reporting before launch."
  },
  {
    number: "05",
    icon: Activity,
    title: "Review and Improve",
    description: "We assess the available performance data, identify what needs attention, and agree on the next reasonable improvement based on the evidence."
  }
];

const principles = [
  {
    number: "01",
    icon: Search,
    title: "Understand Before Prescribing",
    description: "We don't assume the answer is more advertising, another funnel, or a new tool. We first examine the business and its current customer journey."
  },
  {
    number: "02",
    icon: Target,
    title: "Focus on the Priority",
    description: "We define the main objective and primary conversion journey for the agreed project instead of trying to change everything at once."
  },
  {
    number: "03",
    icon: Workflow,
    title: "Connect Strategy to Implementation",
    description: "Recommendations need to translate into clear actions. We build the components agreed for the project rather than stopping at advice alone."
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Define Responsibilities Clearly",
    description: "The scope, deliverables, required access, client responsibilities, exclusions, and completion criteria should be understood before work begins."
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Measure What the Evidence Supports",
    description: "We select measures that fit the business model and available data. We do not treat clicks or raw leads as proof of business growth when the relevant downstream outcomes cannot be established."
  },
  {
    number: "06",
    icon: Lightbulb,
    title: "Improve Based on What We Learn",
    description: "Performance reviews should help determine what to keep, change, test, or prioritize next—not justify activity that does not serve the agreed goal."
  }
];

const fitSignals = [
  "Already sell a paid offer or service.",
  "Have some evidence of existing demand, such as inquiries, referrals, paid traffic, registrations, an audience, or repeat buyers.",
  "Have a meaningful question about demand, offer clarity, conversion, follow-up, measurement, or another growth constraint.",
  "Have a decision-maker who can approve the work.",
  "Can provide relevant information and take responsibility for agreed actions.",
  "Have the capacity to serve additional customers when growth is the objective.",
  "Are willing to assess progress using relevant data rather than activity metrics alone."
];

const faqs = [
  {
    question: "What does EduFaros do?",
    answer: "EduFaros works with established education and knowledge businesses to assess their current approach, identify important growth constraints, develop a strategy, implement the relevant systems, and measure what changes. The scope depends on the business and the challenge being addressed."
  },
  {
    question: "What types of businesses does EduFaros work with?",
    answer: "Our target segments include independent admissions consultants and college counselors, professional certification and exam-prep companies, continuing education providers, online language and test-preparation businesses, online coaches and educational content creators, and structured college-admissions consultancies."
  },
  {
    question: "Does every client need paid ads, a new funnel, or a CRM?",
    answer: "No. The audit determines which intervention, if any, is appropriate. Some businesses may need a clearer offer or conversion path; others may need better follow-up, measurement, demand generation, or an operational change. We do not automatically bundle every capability into every engagement."
  },
  {
    question: "What happens during the first conversation?",
    answer: "We discuss what your business sells, the goal you want to pursue, how the current customer journey works, and what challenge you are trying to solve. The purpose is to understand the situation and determine whether EduFaros's approach is a suitable fit."
  },
  {
    question: "What does an engagement include?",
    answer: "The scope is defined around the diagnosis and agreed objective. Depending on the project, work may include strategy, landing pages, campaigns, conversion flows, CRM workflows, follow-up, automation, tracking, reporting, or related implementation. The agreed scope specifies what is and is not included."
  },
  {
    question: "Does EduFaros guarantee leads, enrollments, exam results, admissions, or revenue?",
    answer: "No. These outcomes depend on factors that may include the offer, market, budget, customer demand, sales execution, delivery capacity, and other conditions outside EduFaros's control. We define an appropriate objective and measure performance where reliable data is available, but we do not promise a fixed outcome regardless of those conditions."
  },
  {
    question: "How do you measure progress?",
    answer: "The measures depend on the business model, the agreed objective, and available data. They may include qualified inquiries, consultation bookings and attendance, signed engagements, paid course enrollments, registrations, purchases, repeat purchases, acquisition costs, or revenue where it can be reliably connected to the journey."
  },
  {
    question: "Who handles sales conversations and customer delivery?",
    answer: "The client remains responsible for its educational delivery, counseling, sales conversations, closing, and timely response to prospects. EduFaros's responsibilities are defined in the agreed scope and may include implementing systems that support the customer journey and help the team manage the process more consistently."
  },
  {
    question: "How much does an engagement cost?",
    answer: "Cost depends on the challenge, the scope of the work, the systems involved, and the agreed deliverables. We first need to understand the situation before defining an appropriate scope and price. No public price is stated here."
  },
  {
    question: "Is EduFaros suitable for a business that has not started selling yet?",
    answer: "Our focus is established businesses with a real paid offer and some evidence of demand. If an offer has not been validated, the priority may be to establish whether customers want it before investing in a larger marketing or automation system."
  },
  {
    question: "Does EduFaros work as an outsourced cold-outreach team?",
    answer: "Daily manual prospect research and cold outreach are not our core client deliverable. Our focus is on diagnosing and implementing the relevant growth systems for the business and its customer journey."
  },
  {
    question: "Which tools and platforms does EduFaros use?",
    answer: "The tools depend on the business, the existing setup, and the requirements of the agreed implementation. We do not assume that every client needs the same platform or that every system requires the same combination of tools."
  }
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="section-eyebrow"><span className="eyebrow-line" />{children}</div>;
}

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section className="hero-section page-shell">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="eyebrow-live-dot" />
              GROWTH SYSTEMS FOR EDUCATION & KNOWLEDGE BUSINESSES
            </div>
            <h1 className="hero-title hero-title-approved">
              Understand What&apos;s Holding Growth Back.{" "}
              <span>Build What Moves the Business Forward.</span>
            </h1>
            <div className="hero-description hero-description-approved">
              <p>
                EduFaros works with established education and knowledge businesses to audit their current approach, develop a strategy around their goals, and build the systems needed to put that strategy into practice.
              </p>
              <p>We then measure what changes and improve where the evidence supports it.</p>
            </div>
            <p className="hero-audience-approved">
              For businesses in professional learning, exam preparation, continuing education, language learning, coaching, training, and college admissions.
            </p>
            <div className="hero-actions">
              <Link href="#contact" className="button button-primary">
                Discuss a Growth Challenge <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link href="#approach" className="button button-quiet">
                <span className="play-button"><Play size={12} fill="currentColor" aria-hidden="true" /></span>
                Explore Our Approach
              </Link>
            </div>
            <div className="hero-pillars" aria-label="Our four-step approach">
              <div className="hero-pillar"><span className="pillar-number">01</span><span>Understand</span></div>
              <div className="hero-pillar"><span className="pillar-number">02</span><span>Strategize</span></div>
              <div className="hero-pillar"><span className="pillar-number">03</span><span>Build</span></div>
              <div className="hero-pillar"><span className="pillar-number">04</span><span>Improve</span></div>
            </div>
            <div className="hero-scroll-note">
              <span className="scroll-line" />
              <span>Scroll to explore</span>
              <ArrowDown size={13} aria-hidden="true" />
            </div>
          </div>
          <div className="hero-art">
            <HeroVisual />
            <div className="hero-art-footnote"><span className="tiny-cross">✳</span>Strategy / Technology / Performance</div>
          </div>
        </section>

        <section className="section challenge-section page-shell" id="challenge">
          <Reveal className="section-intro challenge-intro">
            <div>
              <SectionEyebrow>THE GROWTH CHALLENGE / 02</SectionEyebrow>
              <h2 className="section-title">Growth Is Not Always<br />a <span>Traffic Problem.</span></h2>
            </div>
            <p className="section-summary">
              When growth slows, the instinct is often to invest in more advertising, generate more leads, or try another marketing channel. But more activity doesn&apos;t necessarily solve the problem.
            </p>
          </Reveal>
          <div className="challenge-body">
            <Reveal className="challenge-secondary" delay={0.06}>
              <span className="micro-label">LOOK BEYOND THE OBVIOUS</span>
              <p className="challenge-secondary-lead">The real constraint may be somewhere else.</p>
              <p>
                Your offer may not clearly communicate its value. The right prospects may not be reaching you. Inquiries may not be turning into consultations. Prospects may lose interest because follow-up is inconsistent. Or you may be generating activity without knowing which efforts actually lead to paying customers.
              </p>
            </Reveal>
            <Reveal className="challenge-highlight" delay={0.12}>
              <div className="highlight-glyph">EF<span> / DIAGNOSE</span></div>
              <p>Without understanding where the problem lies, investing in more marketing can mean spending more without addressing what is holding growth back.</p>
              <div className="challenge-highlight-line"><span />DIAGNOSIS BEFORE ACTIVITY</div>
            </Reveal>
          </div>
          <Reveal className="challenge-conclusion">
            <p>That&apos;s why EduFaros starts by examining the business, its customer journey, and the evidence available before recommending what to change.</p>
            <p className="challenge-conclusion-emphasis">Because the goal isn&apos;t simply to do more. It&apos;s to understand what deserves attention first—and build from there.</p>
          </Reveal>
        </section>

        <section className="section approach-section" id="approach">
          <div className="page-shell">
            <Reveal className="section-intro">
              <div>
                <SectionEyebrow>OUR APPROACH / 03</SectionEyebrow>
                <h2 className="section-title">Understand the Business<br /><span>Before Changing It.</span></h2>
              </div>
              <p className="section-summary">
                We don&apos;t assume every business needs more ads, a new funnel, or another tool. We begin by understanding the business, its goals, and how its current customer journey works. Then we develop a strategy around what the business actually needs.
              </p>
            </Reveal>
            <div className="approach-grid">
              {approach.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.number} className="approach-card" delay={index * 0.07}>
                    <div className="approach-card-top"><span>{step.number}</span><Icon size={22} strokeWidth={1.5} /><i>{step.label}</i></div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    <div className="approach-card-footer"><span>EDUFAROS / PROCESS</span><span>0{index + 1} — 04</span></div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal className="inline-cta">
              <span>Have a specific growth challenge in mind?</span>
              <Link href="#contact">Discuss a Growth Challenge <ArrowUpRight size={16} /></Link>
            </Reveal>
          </div>
        </section>

        <section className="section examine-section page-shell" id="examine">
          <Reveal className="section-intro">
            <div>
              <SectionEyebrow>DIAGNOSTIC SCOPE / 04</SectionEyebrow>
              <h2 className="section-title">Before Deciding What to Build,<br /><span>We Look at the Whole Journey.</span></h2>
            </div>
            <p className="section-summary">
              A growth problem can appear at different points in a business. We examine the relevant parts of the journey before deciding where an intervention may be useful.
            </p>
          </Reveal>
          <div className="examine-grid">
            {auditAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Reveal key={area.number} className="examine-card" delay={index * 0.045}>
                  <div className="examine-card-top"><span>{area.number}</span><Icon size={20} strokeWidth={1.5} /></div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <span className="examine-card-rule" />
                </Reveal>
              );
            })}
          </div>
          <p className="examine-note"><span>NOTE / SCOPE</span>These are areas to investigate, not assumptions about every business. The audit determines which questions matter most for the situation at hand.</p>
        </section>

        <section className="section systems-section" id="systems">
          <div className="page-shell">
            <Reveal className="section-intro">
              <div>
                <SectionEyebrow>GROWTH SYSTEMS / 05</SectionEyebrow>
                <h2 className="section-title">The Strategy Determines<br /><span>the System.</span></h2>
              </div>
              <p className="section-summary">
                Strategy only creates value when it changes what the business does. After the audit, EduFaros builds the components needed to put the agreed strategy into practice. The exact combination depends on the diagnosed constraint and the client&apos;s operating model.
              </p>
            </Reveal>
            <div className="systems-grid">
              {systems.map((system, index) => {
                const Icon = system.icon;
                return (
                  <Reveal key={system.number} className="systems-card" delay={index * 0.055}>
                    <div className="systems-card-head"><span>{system.number}</span><span>{system.tag}</span></div>
                    <div className="systems-card-icon"><Icon size={25} strokeWidth={1.45} /></div>
                    <h3>{system.title}</h3>
                    <p>{system.description}</p>
                    <Link href="#contact" className="systems-card-link">Discuss this capability <ArrowUpRight size={15} /></Link>
                  </Reveal>
                );
              })}
            </div>
            <p className="systems-note"><Check size={15} />The components are selected after diagnosis. They are not a fixed package of every service, and not every engagement requires every component.</p>
            <div className="systems-section-cta"><Link href="#contact" className="button button-primary">Discuss a Growth Challenge <ArrowUpRight size={16} /></Link></div>
          </div>
        </section>

        <section className="section audiences-section" id="who-we-help">
          <div className="page-shell">
            <Reveal className="section-intro">
              <div>
                <SectionEyebrow>WHO WE HELP / 06</SectionEyebrow>
                <h2 className="section-title">Different Education Businesses.<br /><span>Different Customer Journeys.</span></h2>
              </div>
              <p className="section-summary">
                EduFaros works with established education and knowledge businesses that already sell a paid offer and want to improve the path from relevant demand to the paid conversion that matters for their business.
              </p>
            </Reveal>
            <p className="audiences-intro-note">Each segment has different buyers, decision processes, economics, and measures of success. We adapt the customer journey to the business rather than force every client into the same funnel.</p>
            <div className="audiences-grid">
              {audiences.map((audience, index) => {
                const Icon = audience.icon;
                return (
                  <Reveal key={audience.number} className="segment-card" delay={index * 0.045}>
                    <div className="segment-card-top"><span>{audience.number} / SEGMENT</span><Icon size={22} strokeWidth={1.45} /></div>
                    <h3>{audience.title}</h3>
                    <p className="segment-description">{audience.description}</p>
                    <div className="segment-divider" />
                    <p className="segment-examines">{audience.examines}</p>
                    <div className="segment-journey">
                      <span className="micro-label">RELEVANT JOURNEY</span>
                      <p>{audience.journey}</p>
                    </div>
                    <Link href="#contact" className="segment-link">Discuss your business <ArrowUpRight size={15} /></Link>
                  </Reveal>
                );
              })}
            </div>
            <p className="audiences-disclaimer"><ShieldCheck size={16} />EduFaros supports the business and customer-acquisition systems of these providers. It does not guarantee college admissions, exam scores, exam passes, or other outcomes outside its control.</p>
            <div className="audiences-cta"><Link href="#contact" className="button button-primary">Discuss a Growth Challenge <ArrowUpRight size={16} /></Link></div>
          </div>
        </section>

        <section className="section engagement-section page-shell" id="engagement">
          <Reveal className="section-intro">
            <div>
              <SectionEyebrow>HOW AN ENGAGEMENT WORKS / 07</SectionEyebrow>
              <h2 className="section-title">Clear Scope. Relevant Implementation.<br /><span>Honest Measurement.</span></h2>
            </div>
            <p className="section-summary">
              Every engagement starts with a business goal and an understanding of the current approach. Before implementation begins, we agree on what will be addressed, what will be delivered, who is responsible, what information is needed, and how progress will be evaluated.
            </p>
          </Reveal>
          <div className="engagement-list">
            {engagementSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.number} className="engagement-step" delay={index * 0.05}>
                  <div className="engagement-step-number">{step.number}</div>
                  <div className="engagement-step-icon"><Icon size={21} strokeWidth={1.45} /></div>
                  <div className="engagement-step-copy"><span>PHASE {step.number}</span><h3>{step.title}</h3><p>{step.description}</p></div>
                  <div className="engagement-step-end"><ArrowRight size={17} /></div>
                </Reveal>
              );
            })}
          </div>
          <p className="responsibility-note"><span>SHARED RESPONSIBILITY</span>EduFaros handles the agreed strategy and implementation work. The client remains responsible for its educational delivery, counseling and sales conversations, closing, timely response to prospects, accurate information, and other responsibilities agreed for the engagement.</p>
        </section>

        <section className="section principles-section" id="principles">
          <div className="page-shell">
            <Reveal className="section-intro">
              <div>
                <SectionEyebrow>OUR OPERATING PRINCIPLES / 08</SectionEyebrow>
                <h2 className="section-title">Thoughtful Decisions.<br /><span>Practical Implementation. Honest Measurement.</span></h2>
              </div>
            </Reveal>
            <div className="principles-grid">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <Reveal key={principle.number} className="principle-card" delay={index * 0.045}>
                    <div className="principle-card-top"><span>{principle.number}</span><Icon size={21} strokeWidth={1.45} /></div>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section about-section page-shell" id="about">
          <Reveal className="about-intro-grid">
            <div>
              <SectionEyebrow>ABOUT EDUFAROS / 09</SectionEyebrow>
              <h2 className="section-title">A Business-Minded Perspective<br /><span>on Education.</span></h2>
            </div>
            <div className="about-copy">
              <p>Education and expertise create value, but building a sustainable business around that value also requires an understanding of customers, business models, and how people move from interest to a buying decision.</p>
              <p>EduFaros is being built around that intersection of education and business. The founder&apos;s background combines experience in the education industry with hands-on work in performance marketing.</p>
              <p>Our focus is to understand the business before prescribing marketing activity, connect the strategy to practical implementation, and measure what can be measured.</p>
              <Link href="#founder" className="button button-outline">About EduFaros <ArrowUpRight size={16} /></Link>
            </div>
          </Reveal>
          <div className="about-bottomline"><span>EDUFAROS / POINT OF VIEW</span><span>BUSINESS CONTEXT × PRACTICAL SYSTEMS</span></div>
        </section>

        <FounderMessage />

        <section className="section fit-section page-shell" id="fit">
          <Reveal className="section-intro">
            <div>
              <SectionEyebrow>IS EDUFAROS THE RIGHT FIT? / 10</SectionEyebrow>
              <h2 className="section-title">Built for Businesses with a Real Offer<br /><span>and Readiness to Improve.</span></h2>
            </div>
            <p className="section-summary">The goal is to identify the work that makes sense for the business—not to recommend a system regardless of fit.</p>
          </Reveal>
          <div className="fit-layout">
            <Reveal className="fit-card fit-card-good">
              <div className="fit-card-heading"><span className="fit-card-status"><Check size={15} /></span><div><span>SUITABLE CONDITIONS</span><h3>EduFaros is best suited to businesses that:</h3></div></div>
              <ul>
                {fitSignals.map((signal, index) => <li key={index}><Check size={15} />{signal}</li>)}
              </ul>
            </Reveal>
            <Reveal className="fit-card fit-card-caution" delay={0.08}>
              <div className="fit-card-heading"><span className="fit-card-status"><Compass size={15} /></span><div><span>WHEN TO RECONSIDER</span><h3>EduFaros may not be the right fit for:</h3></div></div>
              <p>EduFaros may not be the right fit for an idea-stage business without a paid offer, a business with no capacity to serve additional customers, or a buyer seeking guaranteed results regardless of market conditions, offer quality, budget, or sales execution.</p>
              <p>If the offer, demand, or operating capacity is not ready, more marketing or automation may not be the right next step.</p>
            </Reveal>
          </div>
        </section>

        <section className="section faq-section page-shell" id="faq">
          <Reveal className="section-intro">
            <div>
              <SectionEyebrow>COMMON QUESTIONS / 11</SectionEyebrow>
              <h2 className="section-title">Clear Answers Before<br /><span>the First Conversation.</span></h2>
            </div>
            <p className="section-summary">A practical overview of what EduFaros does, how we work, and what to expect from a potential engagement.</p>
          </Reveal>
          <div className="faq-layout">
            <div className="faq-aside">
              <span className="faq-aside-icon"><MessageSquareText size={22} /></span>
              <h3>Something specific on your mind?</h3>
              <p>The first conversation is about understanding the business, the challenge, and whether there is a useful next step.</p>
              <Link href="#contact">Discuss a Growth Challenge <ArrowUpRight size={15} /></Link>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details className="faq-item" key={faq.question}>
                  <summary><span className="faq-number">{String(index + 1).padStart(2, "0")}</span><span className="faq-question">{faq.question}</span><span className="faq-toggle" aria-hidden="true">+</span></summary>
                  <div className="faq-answer"><p>{faq.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section final-cta-section" id="contact">
          <div className="final-cta-atmosphere" aria-hidden="true"><div className="final-cta-orbit final-cta-orbit-one" /><div className="final-cta-orbit final-cta-orbit-two" /><div className="final-cta-beam" /></div>
          <div className="page-shell final-cta-layout">
            <Reveal className="final-cta-copy">
              <SectionEyebrow>START WITH THE CHALLENGE / 12</SectionEyebrow>
              <h2 className="section-title">Start by Understanding<br /><span>the Challenge.</span></h2>
              <p>Tell us what your business sells, what you want to improve, and what you currently know about your customer journey. We&apos;ll use that context to assess whether the way EduFaros works is a fit and whether there is a useful next step.</p>
              
            </Reveal>
            <Reveal className="final-cta-actions" delay={0.1}>
              <Link href="mailto:contact.edufaros@gmail.com?subject=Discuss%20a%20Growth%20Challenge" className="button button-primary">Discuss a Growth Challenge <ArrowUpRight size={17} /></Link>
              <Link href="#about" className="button button-quiet">Learn About EduFaros <ArrowRight size={16} /></Link>
              <span className="final-cta-contact-note">A focused first conversation. A clearer next step.</span>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
