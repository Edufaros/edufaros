# Publication gates

Items below must be resolved before public launch. This is a live project checklist.

## Business identity

- [ ] Confirm public legal entity name and the entity responsible for the website.
- [ ] Confirm official business contact route and privacy contact.
- [ ] Confirm official LinkedIn/company social URL.
- [ ] Confirm preferred founder name format and biography wording.
- [ ] Approve a real founder portrait and crop, or keep the current abstract mark.

## Client proof and logos

- [ ] Confirm relationship type for every prior project (direct client, agency-side, subcontracted or other).
- [ ] Confirm company spelling/category and publication permission for every logo.
- [ ] Confirm permission for screenshots, quotes and project summaries.
- [ ] Verify Azaan campaign dates/account context and whether the 40-lead and 33-lead snapshots overlap.
- [ ] Verify Synergy qualification definition and any before/after data.
- [ ] Keep student personal information, WhatsApp content and identity documents off the website.

The current new website omits client logos, case studies, testimonials and campaign metrics.

## Capabilities and scope

- [ ] Confirm which services can be delivered repeatedly today.
- [ ] Validate Meta Ads, CRM implementation and workflow QA scope before presenting them as standard capabilities.
- [ ] Do not claim advanced attribution, Google Ads results or retention improvement without evidence.
- [ ] Keep every service scoped after diagnosis; do not imply a fixed all-inclusive bundle.

## Contact form and Google Sheets

- [ ] Create the owner-controlled Google Sheet and `Enquiries` tab using `docs/google-sheets-webhook.gs`.
- [ ] Deploy the Apps Script web app as the sheet owner with access set to Anyone; confirm the account policy allows public web-app access.
- [ ] Store the shared webhook secret in Apps Script Script Properties and Vercel only; never commit it or expose it in browser code.
- [ ] Configure `GOOGLE_SHEETS_WEBHOOK_URL` and `GOOGLE_SHEETS_WEBHOOK_SECRET` in Vercel Preview.
- [ ] Test successful writes, repeated submissions, validation failures and destination outages using dummy information.
- [ ] Confirm exactly one row per accepted enquiry, correct field mapping, access control, retention and deletion procedures.
- [ ] Configure durable rate limiting and monitoring before public launch.
- [ ] Keep the form unavailable until a Preview test row is verified.
- [ ] Configure Production only after legal/privacy review and final founder approval.

## Privacy and legal

- [ ] Replace the pre-launch privacy notice with a complete notice reflecting actual data controller, data categories, purposes, providers, retention, rights and cross-border handling.
- [ ] Obtain appropriate legal review for the US and UK.
- [ ] Confirm cookie/analytics/advertising scripts and consent requirement before adding them.
- [ ] Review service Terms before publishing a Terms page.
- [ ] Confirm no student/applicant personal data is requested by the business enquiry form.

## Final founder approval

- [ ] Approve all public copy and page hierarchy.
- [ ] Approve desktop and mobile design.
- [ ] Approve SEO title/meta/canonical policy.
- [ ] Approve final QA and production release record.
