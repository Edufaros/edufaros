# EduFaros Company Website

A separate Next.js application for the EduFaros student acquisition and enrolment growth website.

## Application location

This app lives in `edufaros-company-site/` inside the `Edufaros/edufaros` repository. The existing EduFaros website remains in the repository root and is not modified by this app.

## Local development

From this directory:

```bash
npm install
npm run dev
```

## Validation

```bash
npm run typecheck
npm run build
```

## Main routes

- `/` — Home
- `/who-we-help/` — Audience overview
- `/who-we-help/education-admissions-consultancies/`
- `/who-we-help/language-schools/`
- `/who-we-help/tutoring-test-prep/`
- `/who-we-help/vocational-professional-training/`
- `/who-we-help/online-academies/`
- `/approach/` — How We Work
- `/growth-systems/`
- `/about/`
- `/discuss-growth/`
- `/privacy/` — Pre-launch notice; full legal review pending
- `/thank-you/` — No-index confirmation route

## Content and design sources

The implementation follows the six EduFaros phase documents supplied by the founder. Phase 4 is the copy source; Phase 5 is the visual and interaction source; Phase 6 is the technical acceptance source. See `docs/` for implementation decisions and publication gates.

## Contact form and Google Sheets

The contact form posts to the same-origin `/api/contact` route. The server validates the fields and forwards the enquiry to a Google Apps Script web app using server-only environment variables. The Apps Script writes the enquiry to the owner's Google Sheet.

Setup instructions and the receiver source are in:
- `docs/google-sheets-setup.md`
- `docs/google-sheets-webhook.gs`

Required Vercel environment variables:
- `GOOGLE_SHEETS_WEBHOOK_URL`
- `GOOGLE_SHEETS_WEBHOOK_SECRET`

The integration is not live until the owner creates the Sheet, deploys Apps Script, configures both variables in Preview and verifies a test row. Keep Production disabled until privacy/legal review and launch approval are complete. Never commit a real URL/secret pair.

## Vercel

Vercel project: `edufaros-company-website`

Root directory: `edufaros-company-site`

Git source: `Edufaros/edufaros`

Implementation branch: `setup/edufaros-company-site`

Production branch remains `main`; the new website has not been merged into the existing site's source or custom domain.
