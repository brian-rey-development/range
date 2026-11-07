# ADR-0002 Enforce hidden information with event visibility and scoped readers

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-11-07 |
| Origin | Architecture review, approved by the owner |
| Related | ADR-0001 |

## Context

Poker hides cards, so an agent that sees the cards of another seat plays unfairly and a coach that reveals them teaches nothing. A prompt that tells an agent to ignore the cards is only a request, so it gives no guarantee.

## Decision

- The engine builds the view of each seat with `observation_for(seat)`, and an agent receives game state only through that function.
- Each event carries a `visibility` value, which is `public`, `seat`, `review` or `system`, and the value decides who can read it.
- `infrastructure` offers a separate reader type for each viewer, and a test proves that a seat reader never returns the hole cards of another seat.
- A memory inherits the most restrictive visibility of its source events, and LLM players use a memory namespace that is separate from the coach namespace.

## Consequences

### Benefits

- Storage enforces the rule, so a router cannot forget a filter and a prompt cannot leak a card.
- During a hand the coach reads only what the learner sees, and after the hand it reads everything.

### Costs

- Every new read path needs its own scoped reader, which adds work each time the system reads events in a new way.
