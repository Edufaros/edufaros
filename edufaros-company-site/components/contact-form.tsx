"use client";

import { FormEvent, useState } from "react";

type FormValues = {
  name: string;
  email: string;
  business: string;
  website: string;
  country: string;
  businessType: string;
  challenges: string[];
  context: string;
  phone: string;
  websiteConfirmation: string;
};

const initialValues: FormValues = {
  name: "", email: "", business: "", website: "", country: "",
  businessType: "", challenges: [], context: "", phone: "", websiteConfirmation: "",
};

const challengeOptions = [
  "Attracting suitable enquiries",
  "Improving enquiry quality",
  "Follow-up and contact",
  "Consultation or assessment booking",
  "Applications or registration",
  "Enrolment visibility and reporting",
  "Retention or re-engagement",
  "Not sure where the problem is",
];

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    if (status === "error") setStatus("idle");
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Please complete this field.";
    if (!values.email.trim()) next.email = "Please complete this field.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid work email address.";
    if (!values.business.trim()) next.business = "Please complete this field.";
    if (!values.website.trim()) next.website = "Enter your website link, or write “Not available”.";
    if (!values.country) next.country = "Please select your country.";
    if (!values.businessType) next.businessType = "Please select your business type.";
    if (values.challenges.length === 0) next.challenges = "Choose at least one area you would like to improve.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || "Your enquiry could not be sent. Please check your connection and try again. Your entries have been kept.");
      }
      setStatus("success");
      setMessage("Thank you. Your enquiry has been submitted.");
      setValues(initialValues);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Your enquiry could not be sent. Your entries have been kept.");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-intro">
        <p className="eyebrow"><span className="eyebrow-rule" /> Discuss your growth challenge</p>
        <h2>A few details to help us understand your business.</h2>
        <p>Fields marked <span aria-hidden="true">*</span> are required.</p>
      </div>

      {status === "success" ? (
        <div className="form-success" role="status">
          <span className="form-success-mark" aria-hidden="true">✓</span>
          <h3>Thank you. Your enquiry has been submitted.</h3>
          <p>{message}</p>
        </div>
      ) : (
        <>
          {status === "error" && <div className="form-alert" role="alert">{message}</div>}
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Your name <span>*</span></label>
              <input id="name" name="name" autoComplete="name" required maxLength={100} value={values.name} onChange={(e) => update("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
              {errors.name && <small className="field-error" id="name-error">{errors.name}</small>}
            </div>
            <div className="form-field">
              <label htmlFor="email">Work email <span>*</span></label>
              <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={(e) => update("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : "email-help"} />
              <small id="email-help">Use the address you check for business enquiries.</small>
              {errors.email && <small className="field-error" id="email-error">{errors.email}</small>}
            </div>
            <div className="form-field">
              <label htmlFor="business">Business name <span>*</span></label>
              <input id="business" name="business" autoComplete="organization" required maxLength={140} value={values.business} onChange={(e) => update("business", e.target.value)} aria-invalid={!!errors.business} aria-describedby={errors.business ? "business-error" : undefined} />
              {errors.business && <small className="field-error" id="business-error">{errors.business}</small>}
            </div>
            <div className="form-field">
              <label htmlFor="website">Business website <span>*</span></label>
              <input id="website" name="website" type="text" autoComplete="url" required maxLength={300} placeholder="https:// or Not available" value={values.website} onChange={(e) => update("website", e.target.value)} aria-invalid={!!errors.website} aria-describedby={errors.website ? "website-error" : "website-help"} />
              <small id="website-help">Enter your website link, or write “Not available”.</small>
              {errors.website && <small className="field-error" id="website-error">{errors.website}</small>}
            </div>
            <div className="form-field">
              <label htmlFor="country">Where is your business based? <span>*</span></label>
              <select id="country" name="country" required value={values.country} onChange={(e) => update("country", e.target.value)} aria-invalid={!!errors.country}>
                <option value="">Select a country</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Other">Other</option>
              </select>
              {errors.country && <small className="field-error">{errors.country}</small>}
            </div>
            <div className="form-field">
              <label htmlFor="businessType">What type of education business do you run? <span>*</span></label>
              <select id="businessType" name="businessType" required value={values.businessType} onChange={(e) => update("businessType", e.target.value)} aria-invalid={!!errors.businessType}>
                <option value="">Select a business type</option>
                <option value="Education or admissions consultancy">Education or admissions consultancy</option>
                <option value="Language school or English-test preparation">Language school or English-test preparation</option>
                <option value="Tutoring or test preparation">Tutoring or test preparation</option>
                <option value="Vocational or professional training">Vocational or professional training</option>
                <option value="Online academy or certification">Online academy or certification</option>
                <option value="Other">Other</option>
              </select>
              {errors.businessType && <small className="field-error">{errors.businessType}</small>}
            </div>
            <fieldset className="form-field form-field-wide challenge-field">
              <legend>What would you most like to improve? <span>*</span></legend>
              <p>Select all that apply.</p>
              <div className="challenge-options">
                {challengeOptions.map((option) => (
                  <label key={option} className="check-option">
                    <input type="checkbox" checked={values.challenges.includes(option)} onChange={(e) => update("challenges", e.target.checked ? [...values.challenges, option] : values.challenges.filter((x) => x !== option))} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {errors.challenges && <small className="field-error">{errors.challenges}</small>}
            </fieldset>
            <div className="form-field form-field-wide">
              <label htmlFor="context">Anything else we should understand?</label>
              <textarea id="context" name="context" rows={5} maxLength={1600} value={values.context} onChange={(e) => update("context", e.target.value)} placeholder="Briefly describe what is happening and what you would like to change." />
              <small>Please do not include student or applicant personal information.</small>
            </div>
            <div className="form-field">
              <label htmlFor="phone">Phone number <span className="optional">(optional)</span></label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} value={values.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="websiteConfirmation">Leave this field empty</label>
              <input id="websiteConfirmation" name="websiteConfirmation" tabIndex={-1} autoComplete="off" value={values.websiteConfirmation} onChange={(e) => update("websiteConfirmation", e.target.value)} />
            </div>
          </div>
          <div className="form-privacy">
            We will use the information you submit to review your enquiry and communicate with you about it. Please do not include student records, applicant documents or sensitive personal information. See our <a href="/privacy/">Privacy Policy</a> for details.
          </div>
          <button className="button button-gold-dark form-submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send My Enquiry"} <span aria-hidden="true">↗</span>
          </button>
          <p className="form-status-note" role="status">{status === "sending" ? "Your enquiry is being sent securely." : status === "error" ? "Your entries have been kept so you can try again." : "We will only show a confirmation once the enquiry destination accepts your submission."}</p>
        </>
      )}
    </form>
  );
}
