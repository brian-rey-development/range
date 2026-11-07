# Range

A poker thinking coach and a platform for learning how agent systems work. Read `docs/technical/ARCHITECTURE.md` before changing structure.

## Commands

- `just setup` installs JavaScript and Python dependencies.
- `just check` runs lint, types, boundaries, naming, dead code and tests for both languages in parallel. It must pass before work counts as done.
- `just fix` applies safe autofixes.
- `just up` and `just down` start and stop Postgres and Redis.
- `just audit` checks both lockfiles for known vulnerabilities. CI runs it apart from `just check`, because it needs the network.
- Settings live in `range_infrastructure.config` and read `RANGE_*` variables. `.env.example` lists them all, so add every new variable there. Log through `range_infrastructure.telemetry.get_logger` so each line carries the request `trace_id`.
- Use `pnpm` for JavaScript and `uv` for Python, never npm, yarn or pip.

## Structure rules, all enforced by tooling

- Dependencies run `apps` to `infrastructure` to `ai` to `core` to `engine`, never upward.
- `packages/engine` holds everything poker needs, is deterministic, does no I/O and uses the standard library only.
- `packages/core` holds entities, use cases and ports in one folder per context, each with `domain` and `application`. Contexts never import each other, and core never imports `ai`, `infrastructure` or `apps`. Its only third-party library is `pydantic`, used to validate entities, so no database, cache, HTTP or model-provider library ever enters core.
- `packages/infrastructure` implements the ports and owns every ORM model, repository, Redis client and telemetry exporter.
- `ai/runtime` imports nothing of ours. `ai/agents` and `ai/evals` may import `core` and `engine`.
- Routers and jobs contain no logic. They validate input, call one use case and return its result. API schemas live in `apps/api` and stay separate from core entities.
- `packages/ui` is the design system, imported as `@range/ui` by `apps/web` and `apps/landing` and never through its source paths. Its `primitives` know nothing about poker, and its `poker` components keep their own logic.
- `apps/landing` imports only `@range/ui`. `apps/web` and `apps/landing` never import each other.
- `apps/web` does no poker math and gets every result from the API. Its layers are `app`, `core`, `shared` and `modules`, and modules are used from outside only through their `index.ts`.

## Tooling notes

- TypeScript 7 runs `tsc`. Tools that need the old compiler API, which are dependency-cruiser and knip, use a tooling-only TypeScript 6.0.3 pinned at the repo root and in a pnpm package extension. Do not upgrade that copy to 7. `apps/landing` skips `astro check` for the same reason and is checked with `tsc`.
- Python is pinned to 3.13 in `.python-version` because the likely poker libraries ship C extensions.

## Conventions

- Strict typing with no `any`. Functions stay within 20 lines, constants are named, and comments appear only when the reason is non-obvious.
- Conventional commits. Commit only when asked.
- Parallel work uses one git worktree per lane, and each lane edits its own context folders.
