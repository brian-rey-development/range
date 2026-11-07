# Range

A poker thinking coach and a platform for learning how agent systems work. Read `docs/ARCHITECTURE.md` before changing structure.

## Commands

- `just setup` installs JavaScript and Python dependencies.
- `just check` runs lint, types, boundaries, naming, dead code and tests for both languages in parallel. It must pass before work counts as done.
- `just fix` applies safe autofixes.
- `just contracts` regenerates `packages/api-client/openapi.json` and `src/schema.d.ts`. Never edit those files by hand.
- `just up` and `just down` start and stop Postgres and Redis.
- Use `pnpm` for JavaScript and `uv` for Python, never npm, yarn or pip.

## Structure rules, all enforced by tooling

- Dependencies run `apps` to `infrastructure` to `ai` to `core` to `engine`, never upward.
- `packages/engine` holds everything poker needs, is deterministic, does no I/O and uses the standard library only.
- `packages/core` holds entities, use cases and ports in one folder per context, each with `domain` and `application`. Contexts never import each other, and core never imports `ai`, `infrastructure`, `apps` or any vendor library.
- `packages/infrastructure` implements the ports and owns every ORM model, repository, Redis client and telemetry exporter.
- `ai/runtime` imports nothing of ours. `ai/agents` and `ai/evals` may import `core` and `engine`.
- Routers and jobs contain no logic. They validate input, call one use case and return its result. API schemas live in `apps/api` and stay separate from core entities.
- `packages/ui` is the design system, imported as `@range/ui` by `apps/web` and `apps/landing` and never through its source paths. Its `primitives` know nothing about poker, and its `poker` components keep their own logic.
- `apps/landing` imports only `@range/ui`. `apps/web` and `apps/landing` never import each other.
- `apps/web` does no poker math and reaches the backend only through `packages/api-client`. Its layers are `app`, `core`, `shared` and `modules`, and modules are used from outside only through their `index.ts`.

## Tooling notes

- TypeScript 7 runs `tsc`. Tools that need the old compiler API, which are dependency-cruiser and openapi-typescript, use a tooling-only TypeScript 6.0.3 pinned at the repo root and in a pnpm package extension. Do not upgrade that copy to 7. `apps/landing` skips `astro check` for the same reason and is checked with `tsc`.
- Python is pinned to 3.13 in `.python-version` because the likely poker libraries ship C extensions.

## Conventions

- Strict typing with no `any`. Functions stay within 20 lines, constants are named, and comments appear only when the reason is non-obvious.
- Conventional commits. Commit only when asked.
- Parallel work uses one git worktree per lane, and each lane edits its own context folders.
