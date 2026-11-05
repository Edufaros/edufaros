export type SegmentPage = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  heroHeading: string;
  heroBody: string;
  primaryCta: string;
  challengeHeading: string;
  challengeBody: string;
  journeyHeading: string;
  journey: string[];
  lossHeading: string;
  losses: string[];
  improvementsHeading: string;
  improvements: string;
  responsibility?: string;
  measures: string[];
  faqs: { question: string; answer: string }[];
  finalHeading: string;
  finalBody: string;
};

export const segments: SegmentPage[] = [
  {
    slug: "education-admissions-consultancies",
    title: "Education & Admissions Consultancies",
    seoTitle: "Student Enquiry & Consultation Growth for Education Consultancies | EduFaros",
    description: "Improve how your education consultancy attracts suitable student and family enquiries, books consultations and moves prospects towards a paid advisory engagement.",
    heroHeading: "Turn suitable student enquiries into meaningful consultations.",
    heroBody: "Education and admissions consultancies need more than a high count of enquiry forms. They need conversations with students and families whose goals, timing, academic plans and expectations fit the service. EduFaros helps independent consultancies examine where suitable enquiries are being lost and improve the process from first interest to consultation and paid engagement.",
    primaryCta: "Discuss Your Consultancy's Growth Challenge",
    challengeHeading: "A student enquiry is only the beginning.",
    challengeBody: "A person may enquire because they are exploring options, comparing providers or looking for general information. The consultancy still needs to understand their goals, establish fit, arrange a useful conversation and explain the advisory service.",
    journeyHeading: "The journey we examine",
    journey: ["Discovery or referral", "Enquiry", "Initial qualification", "Consultation booked", "Consultation held", "Proposal or engagement", "Paid client onboarding"],
    lossHeading: "Where opportunities may be lost",
    losses: [
      "Audience fit: Are campaigns attracting students and families who fit the consultancy's service and market?",
      "Enquiry context: Does the form collect enough useful information without asking for too much too soon?",
      "Response and ownership: Is every suitable enquiry assigned to someone who knows the next action?",
      "Consultation booking: Is the next step clear and easy to arrange?",
      "Show-up and follow-up: Are reminders and post-consultation next steps consistent?",
      "Source visibility: Can the consultancy identify which channels generate paid advisory clients, not just enquiries?",
    ],
    improvementsHeading: "Improve the route from enquiry to paid engagement.",
    improvements: "Depending on the audit, the work may include campaign and audience review, enquiry-form structure, student-intent qualification, CRM stages, counsellor assignment, consultation booking, reminders, nurture and source reporting.",
    responsibility: "We work around your existing counselling process. The consultancy remains responsible for academic guidance, admissions advice, university decisions and the client relationship unless a separate, explicitly agreed scope says otherwise. University admission, visa approval or an application outcome is not the same measure and is not promised by EduFaros.",
    measures: ["Qualified enquiry rate", "Contact rate", "Consultation booking rate", "Consultation show rate", "Proposal-to-engagement rate", "Cost per qualified consultation", "Cost per paid advisory client where reliable data is available"],
    faqs: [
      {question:"Can EduFaros guarantee more university admissions?",answer:"No. EduFaros works on the consultancy's acquisition and client-conversion process. University admission decisions, visa outcomes and application results depend on factors outside this work."},
      {question:"We already receive referrals. Why change anything?",answer:"Referrals can be valuable. The question is whether the consultancy has enough suitable conversations and a clear way to manage each opportunity. The audit looks at the current mix before recommending additional acquisition activity."},
      {question:"We already have counsellors who follow up.",answer:"The aim is not to replace them. It is to make the handoff, ownership, next action and visibility clearer so the team can use its time well."},
      {question:"Will you send us more student leads?",answer:"Campaigns may be appropriate if demand is the constraint. If the bigger issue is qualification, consultation booking or follow-up, we would address that first."},
    ],
    finalHeading: "Make each suitable enquiry easier to move forward.",
    finalBody: "Tell us how students and families currently find your consultancy, what happens after they enquire and where the process becomes difficult.",
  },
  {
    slug: "language-schools",
    title: "Language Schools & English-Test Preparation",
    seoTitle: "Student Enrolment Marketing for Language Schools & Test Prep | EduFaros",
    description: "Help language schools and English-test preparation providers turn course enquiries into placement assessments, registrations and course starts.",
    heroHeading: "Turn more course enquiries into the right next step.",
    heroBody: "A learner may be interested in a language course or exam preparation but still need help choosing the right level, schedule, format or class. The enquiry process should make that next step clear. EduFaros helps language schools and English-test preparation providers improve the journey from course interest to placement assessment, course recommendation and registration.",
    primaryCta: "Discuss Your School's Growth Challenge",
    challengeHeading: "Interest does not become registration by itself.",
    challengeBody: "Course enquiries can arrive from different sources and relate to different languages, levels, exams, locations and schedules. When the next step is unclear—or the team cannot see who has been contacted—suitable learners may not progress. Common issues to investigate include seasonal enquiry patterns, underfilled classes, unbooked placement assessments, incomplete course information, inconsistent responses and limited visibility by course or intake.",
    journeyHeading: "The learner journey",
    journey: ["Search, social or referral", "Course enquiry", "Placement test or consultation", "Course recommendation", "Schedule and location choice", "Registration and payment", "First attendance"],
    lossHeading: "Where opportunities may be lost",
    losses: [
      "Does the enquiry identify the language, level, exam, location and intended start date?",
      "Can a prospective learner understand the course options and next step?",
      "Is the placement assessment easy to book?",
      "Does the right person receive each enquiry?",
      "Are reminders and follow-up appropriate and timely?",
      "Is the school promoting courses that have capacity for additional learners?",
    ],
    improvementsHeading: "Help suitable learners reach the right course.",
    improvements: "The agreed scope may include campaign and course-page review, course-specific enquiry forms, placement-assessment booking, enquiry qualification, CRM pipeline stages, response and reminder workflows, and reporting by course, location or intake.",
    responsibility: "The objective is not to fill every class regardless of fit. It is to help suitable learners reach the right course and make the registration process easier to manage.",
    measures: ["Qualified course enquiries", "Placement-assessment bookings", "Assessment show rate", "Course recommendation-to-registration rate", "Paid registrations", "Course starts", "Class fill by course or intake where tracked"],
    faqs: [
      {question:"Can you help us fill underbooked classes?",answer:"We can investigate the cause first. It may involve low demand, audience fit, course information, assessment bookings, follow-up or capacity. The solution depends on what the data and process review show."},
      {question:"Our enrolment is seasonal. Does this still apply?",answer:"Yes. The approach can account for terms, exam calendars and course start dates. The plan should reflect your actual intake pattern rather than assume demand is constant throughout the year."},
      {question:"We use spreadsheets today. Do we need a new CRM?",answer:"Not necessarily. We review the existing process and tools first. Any change should solve a clear problem and be usable by the team."},
      {question:"Can you guarantee IELTS or TOEFL score improvements?",answer:"No. EduFaros supports acquisition and enrolment processes. Teaching quality, learner effort and exam outcomes remain the responsibility of the education provider and learner."},
    ],
    finalHeading: "Help the right learners find the right course—and take the next step.",
    finalBody: "Share how course enquiries are handled today and where learners tend to stop progressing.",
  },
  {
    slug: "tutoring-test-prep",
    title: "Tutoring & Test-Preparation Businesses",
    seoTitle: "Student Acquisition for Tutoring & Test-Prep Businesses | EduFaros",
    description: "Improve how tutoring centres and test-preparation providers attract suitable families, book assessments or trials and convert enquiries into paid programmes.",
    heroHeading: "Turn suitable family enquiries into assessments, trials and paid programmes.",
    heroBody: "For tutoring centres and test-preparation businesses, the person making the enquiry may be a parent or guardian, while the learner is the student. Both need a clear, helpful path from first contact to the right learning support. EduFaros helps tutoring and test-preparation providers examine their acquisition and enquiry process, then improve the steps that move suitable families towards an assessment, trial or paid programme.",
    primaryCta: "Discuss Your Centre's Growth Challenge",
    challengeHeading: "A parent enquiry needs more than a reply.",
    challengeBody: "The business may need to understand the learner's subject, level, location, schedule, goals and timing before recommending a programme. If this information is missing—or the assessment or trial is difficult to arrange—the family may not progress. Potential issues include enquiries outside the subjects or schedules offered, parents who do not book a trial, seasonal peaks around exams, reliance on referrals, and limited visibility into whether families have been contacted or assessed.",
    journeyHeading: "The family-to-enrolment journey",
    journey: ["Local search, referral or campaign", "Parent/learner enquiry", "Subject and schedule fit", "Assessment or trial", "Programme recommendation", "Payment", "Lessons or course start"],
    lossHeading: "Where opportunities may be lost",
    losses: [
      "Does the enquiry explain the learner's subject, grade or level and timing?",
      "Is the parent clear about what happens in an assessment or trial?",
      "Can families easily choose an appropriate appointment?",
      "Are trial bookings followed up when a family does not attend?",
      "Is the centre promoting groups or subjects with available capacity?",
      "Can the owner distinguish enquiry volume from paid package conversion?",
    ],
    improvementsHeading: "Support the team's process and the family's next step.",
    improvements: "Depending on the diagnosis, the work may include local and programme-level audience review, parent-focused campaign messaging, enquiry capture, assessment or trial booking, pipeline stages, follow-up workflows and reporting by programme, subject or location.",
    responsibility: "The system should support the centre's staff and teaching process—not create extra administration or send families irrelevant reminders.",
    measures: ["Suitable family enquiries", "Assessment or trial bookings", "Show rate", "Trial-to-paid package conversion", "Paid programme registrations", "Cost per enrolled learner where reliable data is available", "Capacity utilisation by subject or location"],
    faqs: [
      {question:"We grow mainly through word of mouth. Do we need marketing support?",answer:"Referrals may remain an important source. We would first understand how much demand they create, how consistently it arrives and how the centre handles other opportunities. The answer may be to improve follow-up or visibility rather than add a new channel."},
      {question:"Can EduFaros guarantee better grades or exam scores?",answer:"No. EduFaros works on the acquisition and enquiry process, not academic delivery or guaranteed learner outcomes."},
      {question:"We have limited places in some subjects.",answer:"Capacity should be part of the plan. More enquiries are not useful if the centre cannot serve them. Campaigns and follow-up should reflect available subjects, schedules and locations."},
      {question:"Can you help us book more trial sessions?",answer:"We can review the route from enquiry to trial booking, including information, forms, scheduling and reminders. The scope and measures will be agreed after the process is understood."},
    ],
    finalHeading: "Give suitable families a clearer route to the right learning support.",
    finalBody: "Tell us what happens after a parent or learner gets in touch—and where families tend to drop off.",
  },
  {
    slug: "vocational-professional-training",
    title: "Vocational & Professional Training Providers",
    seoTitle: "Student Recruitment & Enrolment Systems for Training Providers | EduFaros",
    description: "Improve how vocational, technical and professional training providers attract eligible prospects, support application completion and measure course starts.",
    heroHeading: "Move eligible prospects from programme interest to course start.",
    heroBody: "For vocational, technical and professional training providers, a useful enquiry is not simply someone who submits a form. The prospect may need to meet entry requirements, complete an application, provide documents, arrange funding or payment and be ready for a specific course start. EduFaros helps training providers examine this journey and improve the acquisition, qualification, follow-up and admissions steps that support eligible applicants.",
    primaryCta: "Discuss Your Training Growth Challenge",
    challengeHeading: "More enquiries do not necessarily mean more eligible applicants.",
    challengeBody: "A provider may attract interest from people who do not meet prerequisites, cannot start in the available window or do not understand the steps required. Admissions teams can spend time on unsuitable prospects while eligible applicants stall at documentation, funding or payment. The process needs to distinguish enquiry, eligibility, application, enrolment and course start.",
    journeyHeading: "The applicant journey",
    journey: ["Search, referral or campaign", "Programme enquiry", "Information and eligibility review", "Application", "Documents and prerequisites", "Funding or payment", "Enrolment", "Course start"],
    lossHeading: "Where opportunities may be lost",
    losses: [
      "Are programme requirements and prerequisites explained accurately?",
      "Does the enquiry collect the information needed for an initial fit assessment?",
      "Are prospects routed to the right programme or admissions contact?",
      "Where do applicants stop: application, documentation, funding, payment or scheduling?",
      "Are reminders tied to actual deadlines and start dates?",
      "Can the provider distinguish eligible enquiries, completed applications, enrolled students and starts?",
    ],
    improvementsHeading: "Improve the steps that help eligible applicants progress.",
    improvements: "The agreed scope may include programme-message review, eligibility-aware enquiry capture, application follow-up, pipeline configuration, reminders, admissions handoff and reporting by programme or cohort.",
    responsibility: "EduFaros does not make admissions, accreditation, licensing, funding or educational decisions. The provider retains authority over eligibility, admissions policy and training delivery.",
    measures: ["Eligible enquiry rate", "Application starts", "Application completion", "Document completion", "Paid enrolment", "Course starts", "Cost per enrolled or started student where the source data permits"],
    faqs: [
      {question:"Can you help us attract more eligible applicants?",answer:"We can review how the programme is presented, who is being reached and how eligibility is captured. Any qualification criteria must come from the provider and be applied accurately."},
      {question:"Can you guarantee course starts or employment outcomes?",answer:"No. Course starts depend on eligibility, admissions, funding, student decisions and programme operations. EduFaros does not guarantee jobs, salaries, certification, licensing or funding approval."},
      {question:"We already have an admissions team.",answer:"The purpose is to support the team's process with clearer enquiry capture, ownership, follow-up and measurement—not to replace admissions judgement."},
      {question:"Our programmes have strict requirements.",answer:"Those requirements should be reflected accurately in the information and qualification process. We do not recommend hiding requirements to increase form submissions."},
    ],
    finalHeading: "Make the path from programme enquiry to course start easier to understand and manage.",
    finalBody: "Tell us about your programmes, entry requirements and where prospective applicants tend to stop progressing.",
  },
  {
    slug: "online-academies",
    title: "Online Academies & Certification Businesses",
    seoTitle: "Student Acquisition & Cohort Enrolment Systems for Online Academies | EduFaros",
    description: "Connect audience interest, applications, booked calls, checkout and follow-up to improve the enrolment journey for online academies and certification providers.",
    heroHeading: "Connect audience interest to your next cohort.",
    heroBody: "An online academy may have an audience, content, webinars and paid campaigns—but still struggle to move suitable prospects into applications, calls, purchases or the next cohort. EduFaros helps online academies and certification businesses examine the path from first interest to paid programme participation and improve the steps that need attention.",
    primaryCta: "Discuss Your Academy's Growth Challenge",
    challengeHeading: "Attention is not the same as paid programme demand.",
    challengeBody: "Content can build visibility without creating enough qualified applications. Webinar registrations may not attend. Prospects may start an application but not complete it, book a call but not show, or reach checkout without purchasing. Launch performance can vary from cohort to cohort. The business needs to understand which stage deserves attention before increasing traffic or adding another automation.",
    journeyHeading: "The audience-to-cohort journey",
    journey: ["Content, referral or campaign", "Lead magnet, webinar or programme page", "Follow-up and nurture", "Application, booked call or checkout", "Payment", "Onboarding", "Cohort start"],
    lossHeading: "Where opportunities may be lost",
    losses: [
      "Is the paid programme clearly positioned for the intended learner?",
      "Does the content audience match the actual buyer of the programme?",
      "Do webinar registrants attend and take the next step?",
      "Is the application or checkout process clear and proportionate?",
      "Are reminders aligned with launch dates and cohort deadlines?",
      "Can the business see conversion and economics by programme or cohort?",
    ],
    improvementsHeading: "Connect the steps between audience interest and cohort purchase.",
    improvements: "Depending on the audit, the work may include audience and offer review, landing-page and application-flow improvements, campaign testing where appropriate, lead capture, CRM and nurture workflows, webinar or call reminders, checkout tracking and cohort reporting.",
    responsibility: "We do not assume every academy needs paid ads or a new funnel. Offer fit, audience alignment and the existing sales process must be understood first.",
    measures: ["Qualified applications", "Webinar registration and attendance", "Booked calls", "Call show rate", "Application-to-purchase conversion", "Paid enrolments", "Cohort fill", "Revenue or payback where tracking is reliable"],
    faqs: [
      {question:"We already have a funnel. Can EduFaros still help?",answer:"Possibly. The question is whether the current journey is working as intended. We can examine where prospects stop progressing and whether the issue is traffic, offer clarity, application friction, follow-up or another constraint."},
      {question:"Our audience buys through content and referrals. Do we need paid ads?",answer:"Not automatically. Paid acquisition is one possible tool. The right approach depends on where qualified demand is available and what the current process can convert."},
      {question:"Can you guarantee cohort sales or revenue?",answer:"No. Sales depend on offer fit, audience demand, price, timing, sales process and delivery capacity. EduFaros agrees on the work and measures that can be responsibly monitored; it does not guarantee cohort sales or revenue."},
      {question:"Can you improve webinar or booked-call attendance?",answer:"We can review the registration, reminders, follow-up and booking journey. The exact work and success measures depend on the platform and process currently in use."},
    ],
    finalHeading: "Understand where your next cohort journey is losing momentum.",
    finalBody: "Share how people currently discover your programme, what happens after they show interest and which step you most want to improve.",
  },
];
