"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle, Send } from "lucide-react";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Hidden honeypot: bots may fill it, real users never see it.
    if (String(formData.get("_honey") ?? "").trim()) {
      setStatus("success");
      return;
    }

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      businessType: String(formData.get("businessType") ?? "").trim(),
      primaryChallenge: String(formData.get("primaryChallenge") ?? "").trim(),
      desiredImprovement: String(formData.get("desiredImprovement") ?? "").trim(),
      privacyConsent: formData.get("privacyConsent") === "on" ? "Yes" : "No",
      _subject: "New EduFaros growth challenge inquiry",
      _template: "table",
      _honey: ""
    };

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/contact.edufaros@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result || result.success !== "true") {
        throw new Error(
          typeof result?.message === "string"
            ? result.message
            : "The inquiry could not be submitted right now."
        );
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "We couldn't send your inquiry just now. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="contact-form-success" role="status" aria-live="polite">
        <span className="contact-success-icon"><CheckCircle2 size={27} /></span>
        <h3>Thank you for the context.</h3>
        <p>Your inquiry has been accepted by the form service. EduFaros can now review the details and follow up if there is a suitable fit.</p>
        <button type="button" className="button button-outline" onClick={() => setStatus("idle")}>
          Send another inquiry <ArrowUpRight size={15} />
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-grid">
        <div className="contact-field">
          <label htmlFor="contact-name">Full name <span>*</span></label>
          <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your name" maxLength={120} required />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">Work email <span>*</span></label>
          <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" maxLength={254} required />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-company">Business / company <span>*</span></label>
          <input id="contact-company" name="company" type="text" autoComplete="organization" placeholder="Company name" maxLength={160} required />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-website">Website <span className="optional-label">OPTIONAL</span></label>
          <input id="contact-website" name="website" type="url" autoComplete="url" placeholder="https://yourwebsite.com" maxLength={500} />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-business-type">What best describes your business? <span>*</span></label>
          <select id="contact-business-type" name="businessType" defaultValue="" required>
            <option value="" disabled>Select a business type</option>
            <option>Independent admissions consultant / college counselor</option>
            <option>Professional certification / exam preparation</option>
            <option>Continuing education provider</option>
            <option>Language learning / test preparation</option>
            <option>Coach, trainer, or educational content creator</option>
            <option>College-admissions consultancy</option>
            <option>Other education or knowledge business</option>
          </select>
        </div>
        <div className="contact-field">
          <label htmlFor="contact-challenge">What do you most want to improve? <span>*</span></label>
          <select id="contact-challenge" name="primaryChallenge" defaultValue="" required>
            <option value="" disabled>Select a priority</option>
            <option>Demand generation / reaching the right audience</option>
            <option>Offer clarity / positioning</option>
            <option>Conversion / turning interest into paid customers</option>
            <option>Follow-up / CRM / workflow</option>
            <option>Measurement / understanding performance</option>
            <option>Not sure yet / need help diagnosing it</option>
          </select>
        </div>
        <div className="contact-field contact-field-full">
          <label htmlFor="contact-details">A little context about the challenge <span>*</span></label>
          <textarea id="contact-details" name="desiredImprovement" rows={5} minLength={20} maxLength={5000} placeholder="What does your business sell, what is happening today, and what would you like to improve?" required />
          <span className="contact-field-help">A few sentences is enough to start. Please don&apos;t include sensitive personal information.</span>
        </div>
        <div className="contact-field contact-field-full contact-consent-field">
          <label className="contact-consent">
            <input type="checkbox" name="privacyConsent" required />
            <span>I understand these details will be shared with EduFaros so it can respond to my inquiry. <b>*</b></span>
          </label>
        </div>
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="contact-honey">Leave this field empty</label>
          <input id="contact-honey" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status === "error" && (
        <div className="contact-form-error" role="alert">
          <strong>We couldn&apos;t submit the inquiry.</strong>
          <span>{errorMessage}</span>
          <span>Please try again. If it continues, contact contact.edufaros@gmail.com directly.</span>
        </div>
      )}

      <div className="contact-form-submit-row">
        <p>We&apos;ll assess the context first. Submitting this form does not commit you to a service.</p>
        <button type="submit" className="button button-primary" disabled={status === "sending"}>
          {status === "sending" ? (
            <>Sending <LoaderCircle size={16} className="contact-spinner" /></>
          ) : (
            <>Send inquiry <Send size={15} /></>
          )}
        </button>
      </div>
    </form>
  );
}
