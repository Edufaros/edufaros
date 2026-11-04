# Acceptance checklist

## Function
- [ ] All required routes load directly and refresh without 404.
- [ ] Main navigation and footer links resolve to the correct routes.
- [ ] Mobile menu opens/closes by pointer and keyboard; Escape closes; focus returns to trigger; background scroll locks.
- [ ] All primary CTAs reach `/discuss-growth/`; secondary CTAs reach `/approach/`.
- [ ] Five segment cards lead to distinct segment pages.
- [ ] FAQ disclosure works by keyboard.
- [ ] Contact form validation, loading and failure states work; no false success.

## Content and proof
- [ ] One H1 per page and logical heading structure.
- [ ] Phase 4 copy preserved.
- [ ] No internal notes or unapproved proof/claims.
- [ ] Insights, experience and terms remain unpublished until approved.

## Responsive and accessibility
- [ ] No horizontal overflow at 320px.
- [ ] Test widths: 320, 360, 390, 768, 1024, 1280, 1440px.
- [ ] Visible focus, logical tab order, labelled controls and announced errors/statuses.
- [ ] Reflow at 200% zoom.
- [ ] Reduced motion respected.
- [ ] Contrast verified on actual rendered components.

## Security and privacy
- [ ] Secrets remain server-side only.
- [ ] Durable rate limit/edge protection configured before launch.
- [ ] CRM handoff tested with dummy data.
- [ ] No PII sent to analytics.
- [ ] Privacy notice describes actual data practices and is legally reviewed.
- [ ] Student/applicant records are not requested or collected.

## Release
- [ ] Preview build and route smoke test pass.
- [ ] Founder approves desktop and mobile preview.
- [ ] Public contact route and notification owner confirmed.
- [ ] Privacy and publication gates pass.
- [ ] Production release and rollback record completed.
