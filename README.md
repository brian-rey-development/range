# Range

Range teaches a beginner to think about poker from first principles, and it doubles as a platform for learning how production agent systems are built.

The architecture, decisions and roadmap live in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Prerequisites

Node 24, pnpm 12, uv, just and Docker.

## Quick start

```
just setup
cp .env.example .env
just up
just dev-api
just dev-web
just dev-landing
```

`just check` runs every quality gate for both languages in parallel and should finish in a few seconds.

## Layout

```
apps/
  web/        React, Vite, TypeScript 7
  landing/    Astro static site built from the design system
  api/        FastAPI routers and API schemas
  worker/     Taskiq jobs and table runners
packages/
  engine/           everything poker needs, pure
  core/             product entities, use cases and ports
  infrastructure/   database, event store, Redis, telemetry, adapters
  ai/               agent runtime, agents and evals
  ui/               design system, tokens, primitives and poker components
```
