export const metadata = {
  title: "Privacy Policy",
  description: "Privacy information for the EduFaros website.",
  alternates: { canonical: "/privacy/" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="section section-ivory legal-page">
      <div className="container narrow-container">
        <p className="eyebrow"><span className="eyebrow-rule" /> Website privacy</p>
        <h1 className="legal-title">Privacy information</h1>
        <div className="legal-notice">
          <strong>Pre-launch notice — full privacy policy pending review</strong>
          <p>This website is being prepared for launch. EduFaros has not yet activated the public enquiry submission route in this preview. A complete Privacy Policy will be published before the contact form is enabled for public use.</p>
        </div>
        <h2>What the final notice will explain</h2>
        <p>The published notice will identify the responsible legal entity and contact route, describe the information collected and why it is needed, name the service providers that process it, explain retention and deletion, and set out applicable privacy rights and any relevant international data handling.</p>
        <h2>Do not send student or applicant records</h2>
        <p>The EduFaros business enquiry form is designed for education-business decision-makers. It must not be used to submit student names, contact details, academic records, identity documents, passports or other sensitive applicant information.</p>
        <h2>Questions</h2>
        <p>Do not use this preview page to send personal or confidential information. The public privacy contact details will be added after the legal and operational review is complete.</p>
      </div>
    </section>
  );
}
