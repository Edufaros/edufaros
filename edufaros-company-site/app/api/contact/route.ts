import { NextRequest, NextResponse } from "next/server";

const allowedCountries = new Set(["United States", "United Kingdom", "Other"]);
const allowedBusinessTypes = new Set([
  "Education or admissions consultancy",
  "Language school or English-test preparation",
  "Tutoring or test preparation",
  "Vocational or professional training",
  "Online academy or certification",
  "Other",
]);
const allowedChallenges = new Set([
  "Attracting suitable enquiries",
  "Improving enquiry quality",
  "Follow-up and contact",
  "Consultation or assessment booking",
  "Applications or registration",
  "Enrolment visibility and reporting",
  "Retention or re-engagement",
  "Not sure where the problem is",
]);

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Per-instance best-effort throttle. Configure an edge/WAF limit before public launch.
const requestTimes = new Map<string, number[]>();

export async function POST(request: NextRequest) {
  try {
    const address = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
    const now = Date.now();
    const recent = (requestTimes.get(address) || []).filter((time) => now - time < 60_000);
    if (recent.length >= 5) {
      return NextResponse.json({ error: "Too many attempts. Please wait a moment and try again." }, { status: 429 });
    }
    recent.push(now);
    requestTimes.set(address, recent);

    const origin = request.headers.get("origin");
    const expectedOrigin = request.nextUrl.origin;
    if (origin && origin !== expectedOrigin) {
      return NextResponse.json({ error: "This request could not be verified. Please reload the page and try again." }, { status: 403 });
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 12_000) {
      return NextResponse.json({ error: "The submitted information is too large. Please shorten it and try again." }, { status: 413 });
    }

    const body = await request.json();
    if (clean(body.websiteConfirmation, 200)) {
      return NextResponse.json({ ok: true });
    }

    const name = clean(body.name, 100);
    const email = clean(body.email, 254).toLowerCase();
    const business = clean(body.business, 140);
    const website = clean(body.website, 300);
    const country = clean(body.country, 40);
    const businessType = clean(body.businessType, 100);
    const context = clean(body.context, 1600);
    const phone = clean(body.phone, 40);
    const challenges = Array.isArray(body.challenges)
      ? body.challenges.filter((item: unknown) => typeof item === "string" && allowedChallenges.has(item)).slice(0, 8)
      : [];

    if (!name || !business || !website || !allowedCountries.has(country) || !allowedBusinessTypes.has(businessType) || challenges.length === 0) {
      return NextResponse.json({ error: "Some details need your attention. Review the highlighted fields and try again." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid work email address." }, { status: 400 });
    }
    if (website.toLowerCase() !== "not available" && !/^https?:\/\//i.test(website)) {
      return NextResponse.json({ error: "Enter a valid website link, or write “Not available”." }, { status: 400 });
    }

    // A live CRM destination has not been configured or verified for this project.
    // Do not store or log submitted contact details and never return false success.
    return NextResponse.json({
      error: "The enquiry form is not active yet while secure submission routing and the privacy review are being completed. Your details have not been stored. Please check back shortly.",
    }, { status: 503 });
  } catch {
    return NextResponse.json({ error: "The form is temporarily unavailable. Please try again later." }, { status: 503 });
  }
}
