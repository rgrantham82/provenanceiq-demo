# ProvenanceIQ Demo

ProvenanceIQ is an AI-assisted private art collection and appraisal prototype for individual collectors, inheritors, artists, estate users, and working artists.

The demo focuses on:

- artwork intake
- collection inventory
- documentation scoring
- preliminary valuation ranges
- risk flags
- qualified appraiser escalation language
- collector-facing evidence organization

## Important disclaimer

This is a frontend-only prototype. It does not provide certified appraisals, legal advice, tax advice, insurance approval, authentication, or private document storage.

Do not upload sensitive collector documents, private appraisal records, receipts, or personally identifying information to the public demo.

## Tech stack

- React
- Vite
- Tailwind CSS
- lucide-react
- GitHub Pages deployment through GitHub Actions

## Local setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages

This project is configured for deployment at:

```text
https://rgrantham82.github.io/provenanceiq-demo/
```

The Vite base path is set in `vite.config.js`:

```js
base: "/provenanceiq-demo/"
```

In the repository settings, go to **Settings → Pages** and set the source to **GitHub Actions**.

## Future production architecture

A real private version should use a secure backend such as:

- Vercel for frontend hosting and serverless functions
- Supabase for authentication, Postgres data, private file storage, and row-level security
- server-side AI calls for artwork intake and report generation

GitHub Pages should be treated as the public showroom, not the vault.
