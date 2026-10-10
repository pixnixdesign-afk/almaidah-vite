# Al-Maidah Café — React + Vite

Online ordering site for Al-Maidah Café (Peshawar), converted from TanStack Start to a
plain client-side **React 19 + Vite + React Router** app.

## Scripts

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # typecheck + production build into dist/
npm run preview   # serve the production build locally
```

## Stack

React 19 · Vite · React Router v7 · Tailwind CSS v4 · shadcn/ui (Radix) · Motion · Sonner

## Structure

- `src/pages/*` — one file per route (previously `src/routes/*`)
- `src/App.tsx` — layout (header, footer, cart drawer) and the route table
- `src/lib/use-head.ts` — per-page title / meta / canonical / JSON-LD (replaces TanStack `head()`)
- `src/lib/store.tsx` — cart & order state (unchanged)

## Deployment

It is a static SPA — deploy the `dist/` folder anywhere. SPA fallbacks are included for
Netlify (`public/_redirects`) and Vercel (`vercel.json`). On other hosts, route all
unknown paths to `index.html`.

## Logo

`src/assets/logo.png` is currently the 64×64 favicon. Replace it with your full-size logo
(same filename) — the original export only referenced the logo by a Lovable-hosted URL.
