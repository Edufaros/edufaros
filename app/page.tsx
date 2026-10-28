import Link from "next/link";
import {
  Activity,
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Building2,
  Check,
  GraduationCap,
  Layers3,
  Lightbulb,
  MonitorPlay,
  Network,
  Play,
  Target,
  Users,
  Workflow,
  Zap
} from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import HeroVisual from "@/components/hero-visual";
import Reveal from "@/components/reveal";

const problems = [
  {
    number: "01",
    icon: Target,
    title: "Inconsistent inquiries",
    description: "Activity comes in waves, making it harder to plan, forecast and grow with confidence."
  },
  {
    number: "02",
    icon: Users,
    title: "Lead quality gaps",
    description: "More inquiries do not always mean more of the right prospective students."
  },
  {
    number: "03",
    icon: Workflow,
    title: "Disconnected follow-up",
    description: "Marketing, counselling and CRM processes can drift apart when systems do not connect."
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Limited visibility",
    description: "Without a clear view of the journey, it is difficult to know where momentum is lost."
  }
];

const solutions = [
  {
    number: "01",
    icon: Target,
    title: "Performance marketing",
    tag: "ATTRACT",
    description: "Build more intentional acquisition journeys across paid channels, campaigns and landing experiences.",
    detail: "Campaign strategy · Paid media · Lead quality"
  },
  {
    number: "02",
    icon: Layers3,
    title: "Funnels & conversion",
    tag: "CONVERT",
    description: "Design the path from first interaction to meaningful conversation with less friction along the way.",
    detail: "Landing pages · Qualification · Booking journeys"
  },
  {
    number: "03",
    icon: Workflow,
    title: "CRM & automation",
    tag: "CONNECT",
    description: "Bring lead capture, follow-up and team workflows into a more consistent operating system.",
    detail: "CRM setup · Follow-up workflows · Integrations"
  },
  {
    number: "04",
    icon: Activity,
    title: "Growth strategy & analytics",
    tag: "OPTIMIZE",
    description: "Make the numbers more useful by connecting campaign activity to conversion and operational insight.",
    detail: "Measurement · Funnel analysis · Optimization"
  }
];

const audiences = [
  {
    icon: GraduationCap,
    title: "Study-abroad consultancies",
    description: "Connect student acquisition, inquiry qualification and counselling follow-up."
  },
  {
    icon: BookOpen,
    title: "Language test preparation",
    description: "Build more consistent journeys from course interest to enrolment."
  },
  {
    icon: Building2,
    title: "Training & education providers",
    description: "Make marketing and enrolment workflows easier to manage as demand grows."
  },
  {
    icon: MonitorPlay,
    title: "Digital education businesses",
    description: "Align digital campaigns, landing experiences and lead management."
  }
];

const method = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the business, audience, current journey and points of friction."
  },
  {
    number: "02",
    title: "Strategize",
    description: "Prioritize the highest-value opportunities and define the system to build."
  },
  {
    number: "03",
    title: "Implement",
    description: "Connect the campaign, funnel, CRM and operational pieces that matter."
  },
  {
    number: "04",
    title: "Optimize",
    description: "Review performance signals and refine the journey based on evidence."
  },
  {
    number: "05",
    title: "Scale",
    description: "Strengthen what works and build a more repeatable growth foundation."
  }
];

const insights = [
  {
    number: "FIELD NOTE 01",
    category: "ACQUISITION",
    title: "Lead volume is not the same as lead quality",
    description: "A practical way to think about better-fit inquiries and the journey after the click.",
    icon: Target
  },
  {
    number: "FIELD NOTE 02",
    category: "CONVERSION",
    title: "Designing a clearer path to enrolment",
    description: "How landing experiences, qualification and follow-up can work as one journey.",
    icon: Layers3
  },
  {
    number: "FIELD NOTE 03",
    category: "SYSTEMS",
    title: "From scattered tools to connected workflows",
    description: "A systems-first view of CRM, automation and performance insight.",
    icon: Network
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
              EDUCATION GROWTH SYSTEMS
            </div>
            <h1 className="hero-title">
              Growth<br />
              engineered<br />
              <span>for education.</span>
            </h1>
            <p className="hero-description">
              We help education businesses connect performance marketing,
              conversion systems and automation into a clearer path to growth.
            </p>
            <div className="hero-actions">
              <Link href="#contact" className="button button-primary">
                Book a Strategy Call <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link href="#system" className="button button-quiet">
                <span className="play-button"><Play size={12} fill="currentColor" aria-hidden="true" /></span>
                Explore the system
              </Link>
            </div>

            <div className="hero-pillars">
              <div className="hero-pillar">
                <span className="pillar-number">01</span>
                <span>Acquire</span>
              </div>
              <div className="hero-pillar">
                <span className="pillar-number">02</span>
                <span>Convert</span>
              </div>
              <div className="hero-pillar">
                <span className="pillar-number">03</span>
                <span>Connect</span>
              </div>
              <div className="hero-pillar">
                <span className="pillar-number">04</span>
                <span>Optimize</span>
              </div>
            </div>
            <div className="hero-scroll-note">
              <span className="scroll-line" />
              <span>Scroll to explore</span>
              <ArrowDown size={13} aria-hidden="true" />
            </div>
          </div>

          <div className="hero-art">
            <HeroVisual />
            <div className="hero-art-footnote">
              <span className="tiny-cross">✳</span>
              Strategy / Technology / Performance
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Education business focus">
          <div className="trust-inner page-shell">
            <p className="trust-intro">BUILT FOR<br /><strong>EDUCATION BUSINESSES</strong></p>
            <div className="trust-item"><GraduationCap size={19} /><span>Study-abroad<br />consultancies</span></div>
            <div className="trust-item"><BookOpen size={19} /><span>Language test<br />preparation</span></div>
            <div className="trust-item"><Building2 size={19} /><span>Training<br />providers</span></div>
            <div className="trust-item"><MonitorPlay size={19} /><span>Digital education<br />businesses</span></div>
          </div>
        </section>

        <section className="section problem-section page-shell" id="challenge">
          <Reveal className="section-intro">
            <div>
              <SectionEyebrow>THE CHALLENGE</SectionEyebrow>
              <h2 className="section-title">Good education deserves<br />a <span>stronger growth system.</span></h2>
            </div>
            <p className="section-summary">
              Growth gets harder when campaigns, lead handling and enrolment
              processes operate in isolation. The opportunity is to connect them.
            </p>
          </Reveal>
          <div className="problem-grid">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <Reveal key={problem.number} delay={index * 0.06} className="problem-card">
                  <div className="card-topline">
                    <span className="card-number">{problem.number}</span>
                    <Icon size={20} strokeWidth={1.55} aria-hidden="true" />
                  </div>
                  <h3>{problem.title}</h3>
                  <p>{problem.description}</p>
                  <div className="card-edge-glow" aria-hidden="true" />
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section system-section" id="system">
          <div className="page-shell system-layout">
            <Reveal className="system-copy">
              <SectionEyebrow>THE EDUFAROS GROWTH SYSTEM</SectionEyebrow>
              <h2 className="section-title">A connected ecosystem<br />for <span>education growth.</span></h2>
              <p className="section-summary">
                Marketing is one part of the journey. We bring acquisition,
                conversion, follow-up and measurement into a system designed
                around how your business actually works.
              </p>
              <Link href="#solutions" className="button button-outline">
                Explore our solutions <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <div className="system-caption">
                <span className="caption-mark">EF</span>
                <p>One strategy. Connected systems. A clearer view of growth.</p>
              </div>
            </Reveal>

            <Reveal className="system-map-wrap" delay={0.1}>
              <div className="system-map" aria-label="Diagram connecting four growth capabilities">
                <svg className="system-connectors" viewBox="0 0 700 470" fill="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="line-teal" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#61EEDB" stopOpacity="0.15" />
                      <stop offset="55%" stopColor="#61EEDB" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#6294FF" stopOpacity="0.35" />
                    </linearGradient>
                  </defs>
                  <path d="M160 105 C220 105 230 165 286 193" stroke="url(#line-teal)" strokeWidth="1.5" />
                  <path d="M540 105 C478 105 467 164 414 193" stroke="url(#line-teal)" strokeWidth="1.5" />
                  <path d="M160 366 C220 366 234 300 286 273" stroke="url(#line-teal)" strokeWidth="1.5" />
                  <path d="M540 366 C480 366 466 300 414 273" stroke="url(#line-teal)" strokeWidth="1.5" />
                  <circle cx="160" cy="105" r="3" fill="#61EEDB" />
                  <circle cx="540" cy="105" r="3" fill="#6294FF" />
                  <circle cx="160" cy="366" r="3" fill="#6294FF" />
                  <circle cx="540" cy="366" r="3" fill="#61EEDB" />
                </svg>
                <div className="system-card system-card-one">
                  <Target size={21} />
                  <div><span>01 / ATTRACT</span><strong>Performance marketing</strong><small>Reach the right audience</small></div>
                </div>
                <div className="system-card system-card-two">
                  <Layers3 size={21} />
                  <div><span>02 / CONVERT</span><strong>Funnels & conversion</strong><small>Design the next step</small></div>
                </div>
                <div className="system-core">
                  <div className="core-orbit core-orbit-one" />
                  <div className="core-orbit core-orbit-two" />
                  <div className="core-icon"><span>EF</span></div>
                  <strong>EduFaros</strong>
                  <small>GROWTH SYSTEMS</small>
                </div>
                <div className="system-card system-card-three">
                  <Workflow size={21} />
                  <div><span>03 / CONNECT</span><strong>CRM & automation</strong><small>Keep follow-up moving</small></div>
                </div>
                <div className="system-card system-card-four">
                  <BarChart3 size={21} />
                  <div><span>04 / OPTIMIZE</span><strong>Strategy & analytics</strong><small>Learn from the journey</small></div>
                </div>
                <div className="system-map-label">CONNECTED CAPABILITIES / 01—04</div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section solutions-section page-shell" id="solutions">
          <Reveal className="section-intro">
            <div>
              <SectionEyebrow>WHAT WE BUILD</SectionEyebrow>
              <h2 className="section-title">The parts of growth,<br /><span>working together.</span></h2>
            </div>
            <p className="section-summary">
              Four connected capabilities, shaped around your goals, team,
              audience and current stage of growth.
            </p>
          </Reveal>
          <div className="solutions-grid">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Reveal key={solution.number} delay={index * 0.055} className="solution-card">
                  <div className="solution-card-header">
                    <span className="solution-number">{solution.number}</span>
                    <span className="solution-tag">{solution.tag}</span>
                  </div>
                  <div className="solution-icon"><Icon size={24} strokeWidth={1.55} /></div>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                  <div className="solution-detail">{solution.detail}</div>
                  <Link href="#contact" className="card-link" aria-label={"Discuss " + solution.title}>
                    Discuss this solution <ArrowUpRight size={16} />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section audience-section" id="who-we-help">
          <div className="page-shell">
            <Reveal className="section-intro">
              <div>
                <SectionEyebrow>WHO WE HELP</SectionEyebrow>
                <h2 className="section-title">Built for education<br />businesses with <span>ambition.</span></h2>
              </div>
              <p className="section-summary">
                The education sector has its own buying journeys, seasonal
                patterns and follow-up demands. Your growth system should reflect that.
              </p>
            </Reveal>
            <div className="audience-grid">
              {audiences.map((audience, index) => {
                const Icon = audience.icon;
                return (
                  <Reveal key={audience.title} delay={index * 0.06} className="audience-card">
                    <div className={"audience-art audience-art-" + (index + 1)}>
                      <div className="audience-art-grid" aria-hidden="true" />
                      <div className="audience-art-orbit" aria-hidden="true" />
                      <div className="audience-icon"><Icon size={28} strokeWidth={1.45} /></div>
                      <span className="audience-art-index">EDU / 0{index + 1}</span>
                    </div>
                    <div className="audience-card-copy">
                      <h3>{audience.title}</h3>
                      <p>{audience.description}</p>
                      <Link href="#contact" aria-label={"Discuss growth for " + audience.title}>
                        Explore fit <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section method-section page-shell" id="method">
          <Reveal className="section-intro">
            <div>
              <SectionEyebrow>OUR METHOD</SectionEyebrow>
              <h2 className="section-title">A clear process.<br /><span>Built around progress.</span></h2>
            </div>
            <p className="section-summary">
              No disconnected tactics or mystery process. We start with the
              business, map the journey, build the right pieces and improve them over time.
            </p>
          </Reveal>
          <div className="method-track">
            <div className="method-track-line" aria-hidden="true"><span /></div>
            {method.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.07} className="method-step">
                <div className="method-node"><span>{step.number}</span></div>
                <div className="method-step-content">
                  <span className="method-step-label">PHASE {step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section results-section" id="results">
          <div className="page-shell results-layout">
            <Reveal className="results-copy">
              <SectionEyebrow>MEASURE WHAT MATTERS</SectionEyebrow>
              <h2 className="section-title">Make growth easier<br />to <span>understand.</span></h2>
              <p className="section-summary">
                We believe in useful visibility over vanity metrics. A connected
                view of campaigns, inquiries and follow-up helps teams see where
                to investigate and what to improve next.
              </p>
              <Link href="#contact" className="button button-outline">
                Talk through your goals <ArrowRight size={16} />
              </Link>
              <p className="results-note"><Check size={14} /> Illustrative interface concept — not live client data.</p>
            </Reveal>
            <Reveal className="dashboard-panel" delay={0.12}>
              <div className="dashboard-topbar">
                <div className="dashboard-title-group">
                  <span className="dashboard-status-dot" />
                  <span>GROWTH OVERVIEW</span>
                </div>
                <span className="dashboard-period">SYSTEM VIEW / CONCEPT</span>
              </div>
              <div className="dashboard-metrics">
                <div><span>01 / ACQUISITION</span><strong>Campaigns</strong><small>Source & quality</small></div>
                <div><span>02 / CONVERSION</span><strong>Journey</strong><small>Stages & handoffs</small></div>
                <div><span>03 / OPERATIONS</span><strong>Follow-up</strong><small>Speed & consistency</small></div>
              </div>
              <div className="dashboard-chart">
                <div className="chart-heading"><strong>Journey signals</strong><span>Illustrative view</span></div>
                <div className="chart-lines" aria-hidden="true">
                  <span /><span /><span /><span />
                </div>
                <svg viewBox="0 0 650 180" className="chart-svg" role="img" aria-label="Illustrative rising line representing the review of growth trends, without real business data">
                  <defs>
                    <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#61EEDB" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#61EEDB" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="chart-stroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6294FF" />
                      <stop offset="100%" stopColor="#61EEDB" />
                    </linearGradient>
                  </defs>
                  <path d="M0 145 C42 138 53 118 95 124 S151 93 195 105 S261 77 303 89 S354 54 398 70 S458 31 499 48 S579 18 650 10 V180 H0Z" fill="url(#chart-fill)" />
                  <path d="M0 145 C42 138 53 118 95 124 S151 93 195 105 S261 77 303 89 S354 54 398 70 S458 31 499 48 S579 18 650 10" stroke="url(#chart-stroke)" strokeWidth="2.4" fill="none" />
                  <circle cx="499" cy="48" r="4.5" fill="#61EEDB" />
                  <circle cx="499" cy="48" r="10" fill="#61EEDB" fillOpacity="0.15" />
                </svg>
                <div className="chart-axis"><span>BASELINE</span><span>OBSERVE</span><span>IMPROVE</span><span>REVIEW</span></div>
              </div>
              <div className="dashboard-bottom">
                <div><span className="dashboard-mini-icon"><Target size={15} /></span><span>Focus on lead quality</span></div>
                <div><span className="dashboard-mini-icon blue"><Workflow size={15} /></span><span>Connect the next step</span></div>
                <div><span className="dashboard-mini-icon"><Lightbulb size={15} /></span><span>Learn and iterate</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section insights-section page-shell" id="insights">
          <Reveal className="section-intro">
            <div>
              <SectionEyebrow>FIELD NOTES</SectionEyebrow>
              <h2 className="section-title">Ideas for a more<br /><span>connected kind of growth.</span></h2>
            </div>
            <p className="section-summary">
              Working ideas on acquisition, conversion and systems for
              education businesses. The insights library will grow with the brand.
            </p>
          </Reveal>
          <div className="insights-grid">
            {insights.map((article, index) => {
              const Icon = article.icon;
              return (
                <Reveal key={article.number} delay={index * 0.06} className="insight-card">
                  <div className={"insight-art insight-art-" + (index + 1)}>
                    <div className="insight-art-grid" aria-hidden="true" />
                    <div className="insight-art-ring" aria-hidden="true" />
                    <Icon size={32} strokeWidth={1.25} />
                    <span className="insight-art-code">{article.number}</span>
                  </div>
                  <div className="insight-content">
                    <span className="insight-category">{article.category}</span>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                    <Link href="#contact" className="card-link">Discuss this topic <ArrowUpRight size={15} /></Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="cta-section" id="contact">
          <div className="cta-atmosphere" aria-hidden="true">
            <div className="cta-ring cta-ring-one" />
            <div className="cta-ring cta-ring-two" />
            <div className="cta-horizon" />
          </div>
          <div className="page-shell cta-layout">
            <Reveal className="cta-copy">
              <SectionEyebrow>LET'S BUILD WHAT'S NEXT</SectionEyebrow>
              <h2 className="section-title">Ready to give your<br />growth a <span>stronger system?</span></h2>
              <p>Start with the challenge in front of you. We can map the next practical step together.</p>
            </Reveal>
            <Reveal className="cta-actions" delay={0.1}>
              <Link href="mailto:contact.edufaros@gmail.com?subject=EduFaros%20Strategy%20Conversation" className="button button-primary">
                Start a conversation <ArrowUpRight size={17} />
              </Link>
              <span className="cta-availability"><span className="eyebrow-live-dot" /> Strategic conversations start here</span>
            </Reveal>
          </div>
        </section>

        <section className="about-anchor page-shell" id="about">
          <div className="about-anchor-mark">EF</div>
          <div>
            <SectionEyebrow>ABOUT EDUFAROS</SectionEyebrow>
            <p>We bring strategy, performance marketing and operational systems together to help education businesses grow with greater clarity.</p>
          </div>
          <Link href="#top" className="about-back-link">Back to top <ArrowUpRight size={15} /></Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}