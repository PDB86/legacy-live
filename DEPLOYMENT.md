# Legacy Live deployment

Last checked: 2026-10-30 using the local repository and connected Vercel tools.

## Repository

- Local workspace: `D:\LEGACY LIVE\05 WEBCODE\legacy-live`
- GitHub: https://github.com/PDB86/legacy-live
- Git remote `origin`: `https://github.com/PDB86/legacy-live.git`
- Local branch at verification: `main`
- Framework: Next.js with React and TypeScript, using the App Router (`app/`).
- Main homepage: `app/page.tsx`; page metadata: `app/layout.tsx`.
- Package scripts: `npm run dev`, `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`, and `npm test`. See [HEALTH-CHECK.md](HEALTH-CHECK.md) for the subsequent v1.10.0 audit and validation.

## Hosting

- Hosting provider: Vercel.
- Project: `legacy-live`
- Project ID: `prj_HIV8980um2cUuMNhAcPdLG2MPDXm`
- Team name: `pablodellabella's projects`
- Team slug: `pablodellabella-projects`
- Team ID: `team_oSjpf8Iz2Nw1Vx44uSdJe655`
- Dashboard: https://vercel.com/pablodellabella-projects/legacy-live
- Production website: https://www.legacyliveevents.com
- Additional domains: https://legacyliveevents.com and https://legacy-live.vercel.app
- Vercel reports a GitHub connection to `PDB86/legacy-live`.

## Deployment workflow

1. Edit and preview changes locally.
2. Commit and push changes to GitHub's `main` branch when ready to publish.
3. The Git integration builds and deploys production changes on Vercel. A successful deployment updates the production domains.

Saving local files alone does not update the public website. Pushing to `main` should be treated as publishing because it triggers production deployment.

Verification evidence: publishing v1.10.0 to GitHub `main` triggered a production deployment through the Git integration. Vercel reported `READY`, assigned the production domains, and the live homepage, contact route, and corrected WebM returned HTTP 200.

## Last observed production deployment

This is a historical reference, not a guarantee of the current deployment.

- Deployment ID: `dpl_4atnhTpF7b5SB1iBoPTmB5uq5P1L`
- Status: `READY`
- Target: `production`
- Commit: `2858b29666495fafa171c9ca6468cbdeb9ee55e9`
- Commit subject: `Release v1.10.0: fix contact delivery and harden website checks`
- Deployment URL: https://legacy-live-eyrvhovqo-pablodellabella-projects.vercel.app
- Vercel Node.js setting: `22.x`
- Vercel authentication protection applies to non-custom deployment domains; custom production domains are excluded.

## Access and tooling notes

- Connected Vercel tools successfully read the team, project, Git connection, and deployment details in this session.
- `.vercel/` is ignored and was absent locally; use the IDs above to identify the existing project rather than creating another project.
- Git is not on this PowerShell PATH. For release work, Git was found at `C:/Users/pablo/AppData/Local/GitHubDesktop/app-3.6.10/resources/app/git/cmd/git.exe`. Use this executable (or locate the current GitHub Desktop version if updated). Fetching GitHub succeeded under the authenticated `PDB86` account.
- v1.10.0 was committed, pushed, and verified in production. The subsequent portfolio carousel update replaces the old desktop/mobile layouts with one responsive Embla gallery, retains all 27 assets and the existing preview, and passes production build, type checking, lint (warnings only), and local HTTP checks. Visual browser verification was unavailable. Check Vercel for this newer commit's deployment status.
