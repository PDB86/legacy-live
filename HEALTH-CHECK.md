# Code health check — v1.10.0

Reviewed: 2026-10-30. This report records the audit results before publication. The user subsequently authorized committing, pushing, and deploying v1.10.0.

## Verdict

Several material issues were found and fixed. The dependency audit is clean, TypeScript errors are resolved, and the production build succeeds. This is not a guarantee that every browser interaction or email delivery works: the verification limits and remaining work are listed below.

## Findings and fixes

| Priority | Finding | Local resolution |
| --- | --- | --- |
| Critical dependency advisory | Next.js 15.5.23 was flagged by npm for multiple vulnerabilities, including critical advisories. | Updated to 15.5.28 and Sharp 0.35.5. Actual exploitability depends on platform and enabled features; an advisory does not establish compromise. |
| High | `/contact` only logged form values and displayed an alert; it never submitted an inquiry. | Connected the page to the existing server action, included selected song details, and added pending, success, and error states. |
| High | The homepage action returned success even when Resend returned an error object. | Check both the provider error and returned message ID before reporting success. Transport failures also return a controlled error. |
| High | Server-side form inputs were cast to strings without validation. | Added shared validation for required fields, real calendar dates, email, guest counts, enumerated event types, file-valued inputs, and text lengths. |
| Medium | Resend was instantiated at module load before the missing-key guard. | Initialize it only after validation and the configuration check. |
| Medium | Builds skipped TypeScript and lint checks; direct TypeScript checking found 10 errors. | Restored build checks; fixed nullable refs, DayPicker's changed icon interface, and Recharts tooltip/legend types. Added usable standalone lint and typecheck commands. |
| Medium | The form reset read `event.currentTarget` after an asynchronous call. | Retain the form element before awaiting the server action. |
| Medium | Setlist parsing discarded songs using en/em dashes and could split hyphenated song titles incorrectly. | Parse whitespace-delimited hyphen/en/em dashes. The catalogue now has 416 unique songs, up from 405. Existing title-based song IDs are preserved. |
| Medium | Ballads also had a Pop genre and were assigned to the first matching Pop section. | Group using each song's primary genre so Ballads remain in their section. |
| Medium | Reading localStorage during initial rendering could cause hydration differences; unavailable or malformed storage could throw. | Start with consistent server/client defaults, restore preferences after mounting, validate stored values, and catch storage failures. |
| Medium | `/deck_1.webm` differed in case from `public/Deck_1.webm`. | Corrected the URL for case-sensitive production servers. |
| Low | Inputs, favorite controls, and the mobile navigation button lacked explicit accessible names or state announcements. | Added accessible names, expanded/pressed state, and live submission status. |
| Low | An empty pnpm lockfile coexisted with the populated npm lockfile. | Removed the empty pnpm file; retain npm's lockfile and declare npm as the package manager. |

Other changes: set the application and npm lockfile versions to `1.10.0`; declare Node.js 22 to match Vercel; add `.nvmrc`; remove the artificial email delay and avoid logging full provider responses; set email reply-to to the validated sender. Email sender and recipients are unchanged.

Dependency cleanup included Resend 6.36.0, Zod 4.6.7, compatible transitive updates, and an explicit PostCSS 8.5.23 override. The PostCSS override is needed because the retained Next.js 15 line otherwise resolves an older nested version. Re-evaluate this override on future Next.js upgrades. The Resend and Zod major upgrades are covered by the action/validation regression tests; unused scaffold components were not exhaustively exercised.

## Verification

- `npm audit`: **0 vulnerabilities**, down from 17 flagged packages (1 critical, 10 high, 2 moderate, 4 low). This covers npm's advisory database at the time checked, not a complete application security assessment.
- TypeScript: passes. Build-time checking is enabled again.
- ESLint: passes with **0 errors and 24 warnings**. Warnings remain visible for image optimization, unused scaffolding, and hook dependencies; they have not all been corrected.
- Production build: passes, including a final build under Node.js **22.23.4** matching Vercel's major version. Routes `/`, `/contact`, and the not-found page compile successfully. Homepage first-load JavaScript is approximately 163 kB as reported by Next.js.
- Six regression tests pass, including Node.js 22 verification: malformed/oversized/file input, missing email configuration, provider rejection, empty provider response, transport failures, successful mocked inquiry with song selections/reply-to, song parser edge cases, and exact-case local media references.
- Production-server HTTP smoke check: homepage and contact route return 200, unknown route returns 404, and the corrected WebM and favicon return 200. The homepage HTML includes the updated song count. The contact page relies on client rendering under its loading boundary.
- Targeted source scan found no matches for common Resend, AWS access-key, GitHub token, or private-key patterns in the inspected app/source/public/config directories. Git history and all possible credential formats were not scanned.
- Vercel project rechecked: production still points to the previously recorded deployment; its Node version is 22.x. `RESEND_API_KEY` is configured for production, preview, and development. Its value was not decrypted or read.

## Remaining work and limits

1. **Contact-form abuse protection:** validation does not rate-limit legitimate-looking automated submissions. Add durable rate limiting or an appropriate Vercel firewall/bot-protection rule before assuming the email endpoint is resistant to spam and quota abuse. No distributed limiter or CAPTCHA is currently implemented in this code.
2. **Mobile performance:** public assets total about 77 MB; the hero MP4 is about 16.6 MB and many PNG images are around 2 MB. The page uses raw images and multiple embedded videos without lazy loading. Compress/resize media and review loading strategy. Total repository asset size is not a measured first-page network transfer.
3. **Accessibility:** the custom format and portfolio-grid modals still need focus-trapping/focus-return and keyboard testing. Several grid items are clickable divs. A complete WCAG audit, contrast review, screen-reader run, and mobile/browser interaction test were not performed.
4. **SEO:** the description is still the generic `Developed by DB Studios`; no sitemap or robots route exists (both return 404). Add business-specific metadata and sitemap handling as a separate content/SEO pass. Missing robots.txt alone does not prevent indexing.
5. **Lint/maintenance:** 24 nonblocking warnings remain, including custom-modal hook dependencies and unused scaffold code. The homepage is a large client component with scroll-driven rerenders; extracting sections and isolating animations would improve maintainability/performance.
6. **Email delivery:** tests use a mocked provider and never send real messages. A configured key does not prove its validity, sender-domain verification, quota availability, or final inbox delivery. An authorized real inquiry test remains necessary for delivery verification.
7. **Browser testing:** the browser automation host was unavailable. No visual, hydration-console, localStorage-browser, keyboard, responsive, or cross-browser pass is claimed. Unit tests and HTTP checks do not replace those checks.
8. **Release:** these fixes do not change the live site until committed/pushed and successfully deployed. The audit baseline was `7add38ca5655227fc42357ec832f32b756b10fd7`. During release preparation, Git was located in GitHub Desktop, the working-tree changes were inspected, and fetching confirmed `main` was current with `origin/main`. See Vercel's deployment history for the published release status.

## Repeatable checks

Saved evidence: [initial audit](reports/health-2026-10-30/audit-before.json), [final audit](reports/health-2026-10-30/audit-after.json), [lint output](reports/health-2026-10-30/health-lint.log), and [final Node.js 22 production build](reports/health-2026-10-30/health-build-node22.log).

Use Node.js 22, then run:

```sh
npm ci
npm run typecheck
npm run lint
npm test
npm audit
npm run build
```

The test harness compiles the actual TypeScript modules in memory and stubs the email provider; no production credentials are required. Deployment context remains in [DEPLOYMENT.md](DEPLOYMENT.md).

Security references from the dependency audit: [Next.js Server Actions denial of service](https://github.com/advisories/GHSA-p3m5-59mp-jv5r), [Next.js image optimization advisory](https://github.com/advisories/GHSA-2464-fhr4-w9xw), and [Zod collection validation advisory](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5). Resend's [send-email documentation](https://resend.com/docs/api-reference/emails/send-email) documents the returned `data` and `error` fields.
