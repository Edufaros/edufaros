# Repository audit — EduFaros company website

**Audit date:** 4 November 2026  
**Status:** Access confirmed; new app scaffold and implementation branch created.

## Verified project facts

- GitHub repository: `Edufaros/edufaros`.
- Default branch: `main`.
- Implementation branch: `setup/edufaros-company-site`.
- New application directory: `edufaros-company-site/`.
- Existing website application remains at the repository root.
- Existing Vercel project: `edufaros`.
- New Vercel project: `edufaros-company-website`.
- New project is associated with the same Git repository and configured to build from `edufaros-company-site/`.
- New Vercel project is independent from the existing `edufaros` project.
- The new project currently has no environment variables configured.
- The supplied EduFaros SVG logo was found at `public/edufaros-logo.svg` in the original site and copied into the new app as a light variant; a dark variant was generated from the same vector geometry for light surfaces.

## Stack

- Next.js App Router
- React
- TypeScript
- CSS custom properties and component-scoped class conventions
- Vercel deployment from GitHub

The app uses the Next.js 15 line and a patched-version semver range in `package.json`. The first starter deployment warned that Next.js 15.5.7 was vulnerable; the new app dependency was moved forward from that exact version. The effective resolved version must be checked in the current build log.

## Baseline and integration facts

- The initial new app was a small Next.js starter scaffold and built successfully before design implementation.
- The new Vercel project initially had no environment variables.
- A GoHighLevel account/location, pipeline, custom field IDs, notification owner and API credentials have not been verified for this new app.
- No analytics provider or consent configuration has been selected.
- No approved contact email, telephone number, office address or official social URL was supplied for the new site.
- The founder portrait has not been supplied/approved for this website.
- No client logo or case-study publication permissions have been confirmed for this website.

## Architecture decision

**Preserve and extend.** The new app is implemented as an isolated application directory inside the existing Git repository and deployed through its own Vercel project. No framework migration or changes to the existing root website are required.

## Baseline limitations

A clean local lint/test run was not available through the connected repository actions. Vercel build output is the authoritative compile/type-check evidence for this branch. The current preview build remains the next verification gate.
