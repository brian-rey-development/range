# Decision records

An architecture decision record, or ADR, explains one decision that is expensive to reverse, which means what the team decided and why. The repository holds only decisions that the owner discussed and approved, so a default that nobody discussed is not a record.

## Records

| Record | Decision |
| --- | --- |
| [ADR-0001](0001-event-store-design.md) | Store domain events in an append-only event store |
| [ADR-0002](0002-visibility-model.md) | Enforce hidden information with event visibility and scoped readers |
| [ADR-0003](0003-port-ownership-and-dependency-direction.md) | Let the domain own its ports and keep dependencies one-way |
| [ADR-0004](0004-single-poker-engine-and-contract-pipeline.md) | Keep all poker logic in one Python engine and generate the web contract |

## Format

Each record is one file named `NNNN-short-title.md`, with a table for the status, the date, the origin and the related records. The sections follow this order.

- Context states the facts that force the decision, so a reader who joins later understands the problem.
- Decision states what the team does, in a list of steps that each hold one action.
- Consequences list the benefits and the costs of the decision, because every decision gives up something.
- Alternatives name the options that the team rejected and the reason, and the section exists only when the team discussed options.
- Open points name what is still unknown, and the section exists only when something is unknown.

## Rules

- One record holds one decision, so a reader can replace or retire it without touching the others.
- A status is Proposed, Accepted or Superseded, which tells the reader if the decision still holds.
- A new record replaces an old record, and the old record then changes its status and links to the new one.
- Write a record only after the owner decides, because a default that nobody discussed is a guess and not a decision.
- Write each record in ASD-STE100 simple technical English at 80%, with sentences of 25 words or fewer.
