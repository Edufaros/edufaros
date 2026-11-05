# Implementation decisions

## Source-of-truth order

1. Phase 1 — Business Intelligence & Research Blueprint.
2. Phase 2 — Customer Psychology & Positioning.
3. Phase 3 — Website Strategy & Architecture.
4. Phase 4 — Complete Website Copywriting.
5. Phase 5 — Visual Design & UX Direction.
6. Phase 6 — Developer Handoff & Implementation Blueprint.

Phase 4 supplies public copy, Phase 5 governs appearance and interactions, and Phase 6 governs implementation and release.

## Design system

- Midnight Navy `#071A2B`
- Deep Navy `#0D2B43`
- Ink `#162433`
- Warm Ivory `#F7F5EF`
- Pure White `#FFFFFF`
- Muted Gold `#D5A640`
- Soft Gold `#F2E7CB`
- Slate `#566575`
- Mist `#EEF2F4`
- Border `#DDE2E5`
- Success `#28634F`; error `#A33A35`; focus `#1C64B4`

Typography: DM Serif Display for selected display headings and DM Sans for body/UI with Georgia and system fallbacks. Content width capped at 1,200px; mobile-first reflow; restrained motion.

## Content and publishing decisions

- Use one English-language site for the US and UK; no duplicate pages solely for spelling variants.
- Use the Phase 4 brand line “student interest to enrolment”.
- Five audience segments are distinct routes.
- Insights and Experience/Case Studies are not linked because their launch content and permissions are not ready.
- No unapproved logo strip, case study, testimonial, lead metric, client count, office, address or credential is published.
- About page is founder-led but omits a portrait and public founder name until approval.
- The privacy route is a transparent pre-launch notice and is marked noindex until a full legal notice is approved.
- Terms are omitted until the real service terms are reviewed.

## Contact integration boundary

The form UI and API route are present, with server-side validation and a honeypot. The API does not persist, log, email or forward submitted data. It responds with HTTP 503 until the CRM destination and legal/operational setup are confirmed. This is intentional; the site must not show a false success message.

The in-memory throttle is best-effort per serverless instance only. Configure a durable edge/WAF rate limit before public launch. No non-essential analytics are loaded because the provider and consent design have not been approved.

## Release workflow

- Keep this app in `edufaros-company-site/`.
- Work on `setup/edufaros-company-site` and feature branches.
- Use a Vercel Preview deployment for founder review.
- Do not merge the new app or deploy it on the existing website's custom domain until explicitly approved.

## Homepage visual hierarchy — Magic Book hero

- The original Three.js Magic Book from the previous EduFaros site is the primary homepage hero visual again.
- It occupies the same visual column beside the hero copy on desktop and moves below the hero copy on mobile, using the original responsive proportions (590px desktop, 380px mobile).
- The four original floating labels remain around the book: Understand, Prioritize, Build and Improve.
- The five-stage student journey panel is moved into homepage section two, alongside the four growth-challenge cards. The later duplicate journey-map section is removed to avoid repeating the same process.
- The existing new-site copy, navigation, header/footer identity, and other page sections remain unchanged.
- The animation reuses the original Three.js scene and its pause-on-scroll/tab-hidden and reduced-motion handling. The new sub-app declares `three` and `@types/three` as dependencies.

## Homepage sequence — founder message and client logos

- Place the founder message directly after the Magic Book hero, before the growth-challenge section.
- Reuse the founder-note copy and the approved `faizan-ul-haque-v2.webp` portrait already present in the repository.
- Follow the founder note with the continuous logo band titled “Education companies & professionals we've worked with”.
- Show the seven logos in the supplied reference: LinkedIn Coach, Creative Agency, Azan Overseas, Azan Enterprises, D-Naaz International, Synergy Career Consultant and Paika.
- Keep the founder section in a two-column desktop layout and stack it for mobile. The logo band remains continuously readable at small widths and respects reduced-motion preferences.

## Founder section visual alignment with the new design system

- Restyle the founder message as a warm-ivory editorial section rather than a near-black, teal-accented panel.
- Use the Phase 5 palette: navy and deep navy for typography, warm ivory/white for the surface, muted gold for accent details, and slate for body copy.
- Use DM Serif Display for the founder heading and quote, DM Sans for supporting text and labels, with Caveat retained only for the handwritten signature.
- Keep the founder's message, portrait, position after the hero, and the partner-logo strip below it unchanged.
- Reduce the oversized typography and portrait treatment and keep a compact responsive layout on mobile.

## Site-wide spacing and layout cleanup

- Standardise section spacing with a responsive spacing token instead of the previous fixed 92px padding.
- Reduce the homepage hero's top/bottom whitespace without shrinking the desktop Magic Book artwork.
- Tighten section heading, CTA, footer, founder and partner-strip vertical rhythm.
- Remove fixed minimum heights from content-driven challenge, capability and segment cards so short copy does not leave empty card space; rely on grid row stretching for alignment.
- Reduce internal page-intro padding consistently on desktop and mobile.
- Fix the founder heading's responsive selector specificity so tablet/mobile font sizing is honoured.
- Retain the existing content, navigation, section order, palette, logo and animation.

