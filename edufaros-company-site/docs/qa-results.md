# QA results — initial implementation pass

**Status:** Awaiting current Vercel Preview build.

## Implemented checks

- [x] Core page routes created.
- [x] Five distinct audience routes created from the segment content model.
- [x] Main navigation and footer routes point to implemented pages.
- [x] Conditional Insights and Experience links are not published.
- [x] Mobile navigation includes Escape handling, focus containment, background scroll lock and focus return.
- [x] FAQ uses native `details/summary` disclosure.
- [x] Journey map reflows to a vertical layout on mobile.
- [x] Contact form has visible labels, required fields, client-side validation, server-side validation, honeypot, failure message and retained values on failure.
- [x] API does not log or store submitted contact data and does not report success without a confirmed destination.
- [x] Thank-you route is noindex and omitted from sitemap.
- [x] Privacy notice is noindex and excluded from sitemap until reviewed.
- [x] Sitemap contains approved core pages only.
- [x] Robots rules exclude API and thank-you paths.
- [x] No unapproved client logos, testimonials or performance claims are displayed.
- [x] Reduced-motion preference is respected.
- [x] Skip link, semantic landmarks and focus indicators are present.

## Pending verification

- [ ] Vercel Preview build completes successfully.
- [ ] Confirm the resolved Next.js version in the build log is no longer 15.5.7.
- [ ] Confirm Next.js compilation and TypeScript checks pass.
- [ ] Smoke-test all route URLs from the preview deployment.
- [ ] Test 320, 360, 390, 768, 1024, 1280 and 1440px viewports.
- [ ] Test keyboard navigation and screen-reader names/states.
- [ ] Audit actual contrast ratios in rendered components.
- [ ] Run Lighthouse/Core Web Vitals checks.
- [ ] Test form validation and verify 503 state preserves entered values.
- [ ] Confirm sitemap, robots and canonical tags on preview.

## Known limitations

- No CRM handoff is configured.
- No analytics vendor is configured.
- Privacy notice is a pre-launch notice, not a completed legal policy.
- In-memory API throttling is best-effort only; an edge/WAF rate limit is still required.
- No automated test framework or CI quality gate has yet been configured.
