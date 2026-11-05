import Link from "next/link";

export const metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="section section-ivory thank-you-page">
      <div className="container narrow-container">
        <p className="eyebrow"><span className="eyebrow-rule" /> Enquiry status</p>
        <h1 className="display-heading">Thank you.</h1>
        <p>This page is shown only after a confirmed enquiry handoff. The preview form is not yet connected to a live submission destination.</p>
        <Link href="/" className="button button-gold-dark">Back to Home <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}
