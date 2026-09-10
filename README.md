# Matt Wong portfolio

Personal site for [mattwong.info](https://mattwong.info): a single-page portfolio built with Next.js App Router and Mantine.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Production build:

```bash
npm run build
npm start
```

This project expects the public npm registry (`https://registry.npmjs.org`).

## Content

Edit files in `data/` — they are the source of truth for About, Resume, Projects, and Contact. Quotes live in `constants/quotes.ts`.

Blog posts are fetched from the Medium RSS feed (`@mattchw`) at build time and revalidated hourly.

The contact form posts to Formspree. Theme preference is stored by Mantine (`localStorage`).

## Environment

Optional analytics:

```
NEXT_PUBLIC_GOOGLE_ANALYTICS4_MEASUREMENT_ID=
```
