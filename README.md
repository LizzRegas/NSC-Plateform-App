# NSC Platform App (Lumina Church Platform)

Premium church management admin UI demo built with React, TypeScript, and Vite. Frontend-only: mock data with optional `localStorage` persistence — no backend or authentication.

## Requirements

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 9+

## Setup

```bash
pnpm install
```

Copy the example environment file for local development:

```bash
cp artifacts/church-app/.env.example artifacts/church-app/.env
```

## Development

From the repository root:

```bash
pnpm dev
```

Or from the app package:

```bash
pnpm --filter @workspace/church-app dev
```

The Vite dev server reads `PORT` and `BASE_PATH` from `artifacts/church-app/.env`.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build → `artifacts/church-app/dist/public` |
| `pnpm typecheck` | TypeScript check |

## Project structure

```
artifacts/church-app/     Main Lumina admin SPA
  src/features/           Domain modules (People, Giving, Events, …)
  src/lib/demo-store/     In-memory demo state + localStorage
  src/components/         Layout and shared UI
```

## Stack

- React 19, TypeScript, Vite 7, Tailwind CSS 4
- Wouter (routing), Framer Motion, TanStack Query (configured)
- shadcn/ui (Radix), cmdk, next-themes, @dnd-kit

## License

MIT
