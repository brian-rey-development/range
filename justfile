set shell := ["bash", "-euo", "pipefail", "-c"]

default:
    @just --list

setup:
    pnpm install
    uv sync

dev-api:
    uv run uvicorn range_api.main:app --reload --port 8000

dev-web:
    pnpm --filter @range/web dev

dev-landing:
    pnpm --filter @range/landing dev

build-landing:
    pnpm --filter @range/landing build

up:
    docker compose -f infra/docker-compose.yml up -d

down:
    docker compose -f infra/docker-compose.yml down

[parallel]
check: lint-web lint-py typecheck-web typecheck-py boundaries-web boundaries-py naming knip test-web test-py build-landing

lint-web:
    pnpm exec oxlint apps/web apps/landing packages/api-client packages/ui
    pnpm exec oxfmt --check apps/web apps/landing packages/api-client packages/ui

lint-py:
    uv run ruff check
    uv run ruff format --check

typecheck-web:
    pnpm --filter @range/web typecheck
    pnpm --filter @range/api-client typecheck
    pnpm --filter @range/ui typecheck
    pnpm --filter @range/landing typecheck

typecheck-py:
    uv run ty check

boundaries-web:
    pnpm --filter @range/web boundaries
    pnpm --filter @range/ui boundaries
    pnpm --filter @range/landing boundaries

boundaries-py:
    uv run lint-imports

naming:
    pnpm exec ls-lint

knip:
    pnpm --filter @range/web knip
    pnpm --filter @range/ui knip
    pnpm --filter @range/landing knip

test-web:
    pnpm --filter @range/web test
    pnpm --filter @range/ui test
    pnpm --filter @range/landing test

test-py:
    uv run pytest

fix:
    pnpm exec oxlint --fix apps/web apps/landing packages/api-client packages/ui
    pnpm exec oxfmt apps/web apps/landing packages/api-client packages/ui
    uv run ruff check --fix
    uv run ruff format

contracts:
    uv run python -m range_api.openapi > packages/api-client/openapi.json
    pnpm exec openapi-typescript packages/api-client/openapi.json -o packages/api-client/src/schema.d.ts

contracts-check: contracts
    git diff --exit-code -- packages/api-client
