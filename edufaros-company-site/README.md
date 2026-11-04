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

## Contact form status

The contact form UI and same-origin API boundary are implemented. The API intentionally returns an unavailable response until the live CRM destination, pipeline, field mapping, authorised credentials, notification owner and privacy notice are confirmed. It does not store or log submitted contact details and does not claim success.

Before public launch:
1. Confirm GoHighLevel location/subaccount and pipeline.
2. Map country, business type, challenge, website and source fields.
3. Configure server-only credentials in Vercel Preview, then Production.
4. Test contact/opportunity creation and duplicate handling with dummy data.
5. Confirm assignment, notifications, retention and privacy language.

## Vercel

Vercel project: `edufaros-company-website`

Root directory: `edufaros-company-site`

Git source: `Edufaros/edufaros`

Implementation branch: `setup/edufaros-company-site`

Production branch remains `main`; the new website has not been merged into the existing site's source or custom domain.
