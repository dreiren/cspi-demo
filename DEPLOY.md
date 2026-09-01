# Deploy on Vercel

This repo cannot be connected to your Vercel account from this environment.
There is no `VERCEL_TOKEN` (or `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID`), the
Vercel CLI is not logged in, and GitHub shows no Vercel deployments or
environments for `dreiren/cspi-demo`.

**Connecting the account requires you to authorize Vercel once in the
browser** (GitHub OAuth / the Vercel GitHub App). After that, every push to
`main` can auto-deploy.

## Import the GitHub repo (one-time)

1. Open [vercel.com/new](https://vercel.com/new) and sign in.
2. Authorize Vercel to access GitHub if prompted.
3. Import **`dreiren/cspi-demo`**.
4. Confirm:
   - **Framework Preset:** Next.js (Vercel auto-detects this; `vercel.json` also sets `framework` to `nextjs`)
   - **Root Directory:** `.` (repository root)
   - Leave Build Command and Output Directory as the Next.js defaults
5. Deploy. Do not set `NEXT_PUBLIC_SITE_URL` yet — you need the first production URL.

## After the first production URL is known

1. Copy the production origin (example: `https://cspi-demo.vercel.app`), with no trailing slash.
2. In the project: **Settings → Environment Variables**
   - Name: `NEXT_PUBLIC_SITE_URL`
   - Value: that `https://…` origin
   - Environment: Production (Preview optional)
3. Redeploy Production so sitemap, Open Graph, canonicals, and JSON-LD use the real origin.

Optional later (server-only, never `NEXT_PUBLIC_`): `CONTACT_WEBHOOK_URL` for contact-form delivery. See `.env.example`.

## Auto-deploy on every push

In the project: **Settings → Git → Production Branch** → **`main`**.

Pushes to `main` then deploy Production. Pull-request branches get Preview deployments.

## CLI later (optional)

After you create a token at [vercel.com/account/tokens](https://vercel.com/account/tokens):

```bash
npx vercel login          # browser authorize, or use VERCEL_TOKEN
npx vercel link           # link this repo to the Vercel project
npx vercel --prod         # production deploy from the current tree
```

Non-interactive deploys need `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`.
