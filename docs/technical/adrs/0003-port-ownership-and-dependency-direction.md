# ADR-0003 Let the domain own its ports and keep dependencies one-way

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-11-07 |
| Origin | Owner decision, refined by the architecture review |
| Related | ADR-0004 |

## Context

The Python code must stay easy to test and easy to replace, because the team expects to change models and storage. If the domain imports the runtime, the domain depends on a model vendor stack, so a port must belong to the code that uses it.

The owner rejected about ten small packages, because each one adds setup cost to every change.

## Decision

- `engine` holds everything poker needs, and `core` holds the product entities, use cases and ports in one folder for each context.
- `ai` holds the agent runtime, the agents and the evals, and `infrastructure` holds the database, Redis and the adapters.
- Dependencies run from the apps to `infrastructure`, then `ai`, then `core`, then `engine`, and they never run upward.
- `core` defines ports such as `Coach` and `PlayerPolicy`, the agents in `ai/agents` implement them and `infrastructure` wires the two sides.
- `core` never imports `ai`, and the code in `ai/runtime` imports nothing else from Range.
- Import-linter enforces the order and the independence of the context folders, so a wrong import fails `just check`.
- A context becomes its own package only when it needs a different deploy target or a different owner.

## Consequences

### Benefits

- Domain tests run without a model, and a change of runtime touches only the adapters.
- The engine and the AI runtime can be read and tested alone, because neither one imports another Range package.

### Costs

- The team maintains more interfaces, and the same context names appear in both `core` and `infrastructure`.
- Moving one context into its own service later needs real work, because the code of the context lives in two packages.

## Alternatives

- One package for each context gives the strongest isolation, but ten packages mean ten sets of configuration.
- A layout where the domain imports the AI package through ports that the AI package defines inverts the dependency, so the review rejected it.
