# Theejay Tagama — personal portfolio

A single-page React + TypeScript portfolio with Vite, Tailwind CSS v4, Motion, and Lucide. DM Serif Display and Inter are bundled locally through Fontsource; the page makes no font CDN requests.

## Local development

```sh
npm install
npm run dev
```

Open the localhost URL printed by Vite. Pushing to `main` triggers the GitHub Actions workflow in `.github/workflows/static.yml`, which validates, builds, and deploys the site to GitHub Pages at https://theejay06.github.io/personal-website/.

## Content to replace

- `src/data/profile.ts`: GitHub, LinkedIn, and email are populated from the supplied resume. The original portrait is `public/images/theejay-tagama.png`; the active transparent portrait with extended shoulders is `public/images/theejay-tagama-cutout.png`.
- `src/data/projects.ts`: VerifAI and Personal Page have supplied live URLs; Personal Page also links to its GitHub repository. Both projects use locally saved screenshots of their live homepages. Add the VerifAI repository URL when available.
- `src/data/certificates.ts`: five supplied certificates with dates, issuers, participation/appreciation/membership categories, and contextual descriptions. Original documents and faithful PDF previews are in `public/certificates/`. The modal links to each original; this is not a claim of external credential verification. An empty array still displays a clearly labeled placeholder.
- Put project images in `public/images/` and reference them as `/images/filename.webp`. Project screenshots are stored as `public/images/verifai-preview.png` and `public/images/personal-page-preview.png`. The portrait background and cropped shoulders were edited at the owner's request; certificate artwork is unaltered.
- `src/data/skills.ts`: edit skill categories and items.

## Structure

- `src/components/`: reusable page sections, project and certificate presentation, native accessible dialog, navigation, and motion helpers.
- `src/index.css`: palette, Tailwind theme, typography, responsive layouts, and reduced-motion overrides.
- `tests/portfolio.spec.ts`: viewport, navigation, runtime, modal, focus, and reduced-motion checks. Credential test data exists only in browser interception, never in the published portfolio.

## Validation

```sh
npm run typecheck
npm run build
npm run lint
npm run test:e2e
```

Browser tests use locally installed Microsoft Edge through Playwright. The deployment workflow installs the Playwright browser in CI and runs lint, typecheck, and end-to-end tests before deployment. If Edge is unavailable, install a Playwright browser and adjust `channel` in `playwright.config.ts`.

Implementation references: [Tailwind Vite integration](https://tailwindcss.com/docs/installation/using-vite), [Motion accessibility](https://motion.dev/docs/react-accessibility). Components are purpose-built; no third-party visual template is used.

## Portfolio maintenance

Project status and roles are intentionally visible. The Canvas workflow runs locally, and CodeBreak is in development; neither is presented as a public live demo. Add authentic CodeBreak screenshots only after the team approves sharing them. Source links are shown only for repositories that have been verified and are intended to be public. Social metadata uses the existing portrait; replace it with a dedicated 1200×630 social card when available. A custom domain is optional and should only be configured after ownership and DNS are confirmed.

## Engineering evidence

The project cards include a **Behind the code** summary covering architecture, implementation, and current evidence. These are descriptions of existing work, not performance benchmarks or claims of completed features. Update `engineering` and `evidenceNote` in `src/data/projects.ts` when source code, diagrams, tests, or authentic project screenshots become available.

Potential future projects (not claimed as completed): an interactive shortest-path algorithm visualizer and a database-backed task API. Only publish them once there is a working implementation and tests.
