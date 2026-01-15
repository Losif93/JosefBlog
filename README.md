# Josef'sThoughts

Warm, minimal personal blog built with React + Vite. It features a daily notes area, a photo grid, and music embeds in a calm, editorial layout.

## Preview

Add a screenshot at `docs/preview.png` and it will show here.

![Josef'sThoughts preview](docs/preview.png)

## Features

- Minimal, warm visual system with EB Garamond
- "Thoughts of the day" cards for short posts
- Photo grid for visual entries
- Music embed cards

## Local development

```bash
npm install
npm run dev
```

## Admin backend (local)

1) Copy `.env.example` to `.env` and set your admin credentials.
2) Install backend dependencies (same `package.json`).
3) Run the API server:

```bash
npm run dev:server
```

The API runs on `http://localhost:5174`. The admin UI lives at `http://localhost:5173/admin`.

## Admin usage

- Sign in at `/admin` with the credentials in `.env`.
- Add stories, photos, and music from the form cards.
- Content is stored in `db.sqlite` (ignored by git).

## Build

```bash
npm run build
npm run preview
```

## Deployment notes

- Vercel: import the repo, set the build command to `npm run build` and the output directory to `dist`.
- Netlify: build command `npm run build`, publish directory `dist`.
