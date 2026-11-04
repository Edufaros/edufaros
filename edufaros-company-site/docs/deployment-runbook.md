# Deployment runbook

## Development
Run commands from `edufaros-company-site/`:
```bash
npm install
npm run dev
npm run typecheck
npm run build
``

## Preview
1. Commit implementation changes to a feature or setup branch.
2. Confirm Vercel is building the `edufaros-company-website` project from root directory `edufaros-company-site`.
3. Inspect the preview deployment build log and compile/type-check status.
4. Test routes, form validation and mobile navigation.
5. Send preview to the founder for approval.

## Production
Do not merge into `main` or promote to a public custom domain until:
- founder approves preview;
- CRM handoff is configured and tested, or form is intentionally disabled;
- Privacy Policy and business identity are approved;
- proof and logo permissions are resolved;
- QA checklist passes.

## Rollback
Keep the previous known-good Vercel deployment available. If a critical problem is found, redeploy/restore the previous production deployment and disable the broken integration while diagnosing.

## Current release state
The current app is on `setup/edufaros-company-site`. No merge to `main`, custom domain assignment or public production launch has been requested or performed.
