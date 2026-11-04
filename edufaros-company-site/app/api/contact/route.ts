import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

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
      return NextResponse.json(
        { error: "Too many attempts. Please wait a moment and try again." },
        { status: 429, headers: { "Cache-Control": "no-store" } },
      );
    }
    recent.push(now);
    requestTimes.set(address, recent);

    const origin = request.headers.get("origin");
    const expectedOrigin = request.nextUrl.origin;
    if (origin && origin !== expectedOrigin) {
      return NextResponse.json(
        { error: "This request could not be verified. Please reload the page and try again." },
        { status: 403, headers: { "Cache-Control": "no-store" } },
      );
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 12_000) {
      return NextResponse.json(
        { error: "The submitted information is too large. Please shorten it and try again." },
        { status: 413, headers: { "Cache-Control": "no-store" } },
      );
    }

    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "The submitted information could not be read." }, { status: 400 });
    }

    // Honeypot submissions are discarded without being written to the sheet.
    if (clean(body.websiteConfirmation, 200)) {
      return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
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
      ? [...new Set(body.challenges
          .filter((item: unknown) => typeof item === "string" && allowedChallenges.has(item))
          .slice(0, 8))]
      : [];

    if (
      !name ||
      !business ||
      !website ||
      !allowedCountries.has(country) ||
      !allowedBusinessTypes.has(businessType) ||
      challenges.length === 0
    ) {
      return NextResponse.json(
        { error: "Some details need your attention. Review the highlighted fields and try again." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid work email address." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }
    if (website.toLowerCase() !== "not available" && !/^https?:\/\//i.test(website)) {
      return NextResponse.json(
        { error: "Enter a valid website link, or write “Not available”." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
    const webhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim();

    if (!webhookUrl || !webhookSecret || webhookSecret.length < 32) {
      return NextResponse.json(
        {
          error: "The enquiry form is not active yet. Google Sheets routing is being configured, and your details have not been stored. Please try again later.",
        },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    let parsedWebhookUrl: URL;
    try {
      parsedWebhookUrl = new URL(webhookUrl);
    } catch {
      return NextResponse.json(
        { error: "The enquiry destination is not configured correctly. Your details have not been stored." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (
      parsedWebhookUrl.protocol !== "https:" ||
      parsedWebhookUrl.hostname !== "script.google.com" ||
      !/^\/macros\/s\/[^/]+\/exec$/.test(parsedWebhookUrl.pathname)
    ) {
      return NextResponse.json(
        { error: "The enquiry destination is not configured correctly. Your details have not been stored." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    const payload = {
      secret: webhookSecret,
      submissionId: randomUUID(),
      name,
      email,
      businessName: business,
      website,
      country,
      businessType,
      challenges,
      context,
      phone,
      sourcePage: "/discuss-growth/",
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);
    let destinationResponse: Response;
    try {
      destinationResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        redirect: "follow",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    const destinationResult = await destinationResponse.json().catch(() => null);
    if (!destinationResponse.ok || destinationResult?.ok !== true) {
      // Deliberately do not log or return personal data or the destination response body.
      return NextResponse.json(
        {
          error: "We could not save your enquiry to the EduFaros sheet just now. Your entries have been kept—please try again shortly.",
        },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { ok: true, message: "Your enquiry has been saved." },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    return NextResponse.json(
      {
        error: aborted
          ? "The enquiry destination took too long to respond. Your entries have been kept—please try again."
          : "The form is temporarily unavailable. Your entries have been kept—please try again later.",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
