# ADR-0004 Keep all poker logic in one Python engine and generate the web contract

| Field | Value |
| --- | --- |
| Status | Accepted, with the generated contract suspended on 2026-11-07 |
| Date | 2026-11-07 |
| Origin | Owner decision |
| Related | ADR-0003 |

## Context

Range needs poker math in several places, because the API grades drills, the agents call odds tools and the web app can show odds. Two implementations in two languages drift apart, and one wrong formula teaches a wrong lesson.

The web app and the API also use two languages, so a hand-written client drifts from the server without a warning.

## Decision

- Put every poker rule and formula in the Python package `packages/engine` so the web app does no poker math and gets results from the API.
- The Pydantic models in `apps/api` produce the OpenAPI schema, and `openapi-typescript` turns the schema into `packages/api-client`.
- The web app calls the backend only through the generated package, and CI regenerates the client and fails on any difference.

Suspension. The owner removed `packages/api-client`, `openapi-typescript`, `openapi-fetch`, the `contracts` recipes and the CI drift check, because no web code called the backend yet and the generated package held only a stub. The first decision about one engine still holds. The generated contract returns, as originally decided, when the web app makes its first backend call.

## Consequences

### Benefits

- Each formula exists once, so one test suite proves it and drills and agents cannot disagree.
- A server change breaks the web type check at once, so the team sees a contract error before run time.

### Costs

- The web app needs an API call for every odds figure, even for a simple slider, which adds a network delay.
- Equity math is CPU bound in Python, so callers must use a process pool and exact enumeration on the turn and river.
- The generated files stay in the repository, and nobody edits them by hand, because the next generation overwrites the edit.

## Alternatives

- One Rust core compiled for Python and the browser gives one source of truth, but it adds a third language and more build tools.
- Two implementations with shared golden test vectors make the interface feel instant, but the logic then exists twice.

## Open points

- A spike picks the poker library that the engine wraps, and the candidates are PokerKit for rules and hand evaluation and eval7 for equity.
- The engine wraps the chosen library behind its own types, so a later change touches one package.
- The drift check compares nothing until the first commit exists, because Git has no earlier version of the generated files to compare.
