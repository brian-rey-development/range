# ADR-0001 Store domain events in an append-only event store

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-11-07 |
| Origin | Architecture review, approved by the owner |
| Related | ADR-0002 |

## Context

The system records two kinds of data, and each kind needs a different store because the volume and the lifetime differ.

Domain events are actions, hands, lesson answers and memory commits, which are small, rarely change schema and stay forever. Agent traces are model calls, prompts, tool payloads, tokens and cost, which are large, change shape often, can hold personal data and expire.

Live views must also show events without a gap, even after a crash or a browser reconnect.

## Decision

- Store domain events in a Postgres event store, where a unique constraint on `(stream_id, seq)` makes two writers on one stream fail instead of corrupting it.
- Send agent traces through OpenTelemetry to a separate store, and link them to the domain events that they caused with a `trace_id`.
- Write each event and an outbox row in one transaction, and let a relay publish the outbox rows to Redis afterward.
- A browser reconnects with `Last-Event-ID` set to the stream `seq`, and the API replays the missed events from Postgres before it follows Redis.

## Consequences

### Benefits

- A crash loses no event and a reconnect shows no gap, because the outbox and the replay close both holes.
- A replay of a hand re-applies recorded events, so the replay is exact and a test can prove it.
- Each store fits the volume and the retention time of its data, so traces can expire while events stay.

### Costs

- A debugging session reads two places that a `trace_id` joins, which is more work than one log.
- Delivery is at least once, so every consumer must handle a duplicate event without a second effect.
- A re-run of LLM agents is not reproducible, so only a bot-only run can replay from its seed.

## Alternatives

The review rejected one log for every fact, because one hot table mixed different volumes, retention rules and schema stability.
