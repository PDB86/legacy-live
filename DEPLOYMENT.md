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

Verification evidence: Vercel's Git deployment context lists this project's GitHub connection. Its latest production deployment at the time of inspection had `source: git`, `githubCommitRef: main`, and the production domains assigned. No test push or deployment was performed during this investigation.

## Last observed production deployment

This is a historical reference, not a guarantee of the current deployment.

- Deployment ID: `dpl_8fiL6CBwiouhvANqcw2pxByFRzbK`
- Status: `READY`
- Target: `production`
- Commit: `7add38ca5655227fc42357ec832f32b756b10fd7`
- Commit subject: `upgrade nextjs`
- Deployment URL: https://legacy-live-1i2va3ca2-pdbmusicacademys-projects.vercel.app
- Vercel Node.js setting: `22.x`
- Vercel authentication protection applies to non-custom deployment domains; custom production domains are excluded.

## Access and tooling notes

- Connected Vercel tools successfully read the team, project, Git connection, and deployment details in this session.
- `.vercel/` is ignored and was absent locally; use the IDs above to identify the existing project rather than creating another project.
- Git is not on this PowerShell PATH. For release work, Git was found at `C:/Users/pablo/AppData/Local/GitHubDesktop/app-3.6.10/resources/app/git/cmd/git.exe`. Use this executable (or locate the current GitHub Desktop version if updated). Fetching GitHub succeeded under the authenticated `PDB86` account.
- During the subsequent health check, local `main` and the cached `origin/main` ref both pointed to the production commit listed above. Working-tree status was not verified using Git; local v1.10.0 fixes are not deployed.
