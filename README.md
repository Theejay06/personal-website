# Theejay Tagama — personal portfolio

A single-page React + TypeScript portfolio with Vite, Tailwind CSS v4, Motion, and Lucide. DM Serif Display and Inter are bundled locally through Fontsource; the page makes no font CDN requests.

## Local development

```sh
npm install
npm run dev
```

Open the localhost URL printed by Vite. No deployment or push is configured.

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

Browser tests use locally installed Microsoft Edge through Playwright. If Edge is unavailable, install a Playwright browser and adjust `channel` in `playwright.config.ts`.

Implementation references: [Tailwind Vite integration](https://tailwindcss.com/docs/installation/using-vite), [Motion accessibility](https://motion.dev/docs/react-accessibility). Components are purpose-built; no third-party visual template is used.
