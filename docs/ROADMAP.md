# Range roadmap

## Purpose

This roadmap orders the work as short iterations, so the owner sees progress and every iteration ends with something that runs. Two paths grow together. The learner path starts with one scenario and grows into a full structured program with bots. The AI engineering path starts with one model call and grows into a coach with tools, context, memory and parallel agents.

The product goals live in `docs/PRODUCT.md`, and the design lives in `docs/technical/ARCHITECTURE.md`. This file orders the work and says when each part counts as done.

## Working loop

Every iteration follows the same five steps, so the design grows from evidence and not from guesses.

1. **Question.** The iteration states one thing that the team does not know yet, such as how often a coach errs.
2. **Think.** The owner and the builder write down the options and trade-offs for each open design point. Then the owner decides.
3. **Build.** The builder makes the smallest working version that answers the question, and designs only the interfaces that this version touches.
4. **Measure.** A test, an eval or a trace shows whether the version answers the question. A stage never counts as done on opinion.
5. **Adjust.** The owner and the builder write what they learned, and they change the later iterations and this roadmap.

## Decide early or let it emerge

Some choices are hard to undo because stored data or other code depends on them. Those choices get a careful design before the stage that needs them, and the four decision records already cover them. They are the event store, the visibility model, the direction of dependencies and the single poker engine.

Most other choices are cheap to change, such as tool names, prompts, internal types and the shape of a screen. Those choices emerge while building, and the team refactors them when a later iteration shows a better shape. No iteration freezes interfaces that it does not use.

## Iterations

| Stage | Name | The learner gets | The builder learns | Status |
| --- | --- | --- | --- | --- |
| 0 | Foundation | A landing page | A quality gate, settings, logs and traces | Done |
| 1 | First scenario | One pot odds scenario with a graded answer | Ground truth first, from a deterministic engine | Next |
| 2 | Ask the coach | A question box that works at any moment of a scenario | Gateway, context assembly, streaming and an eval baseline | Not started |
| 3 | Grounded coach | Answers whose numbers cite engine tools | Tool use, the agent loop and output contracts | Sketch |
| 4 | Program | A structured path of lessons with progress | Context across a session and drill generation | Sketch |
| 5 | Memory | A coach that remembers mistakes and pace | Memory, retrieval and consolidation | Sketch |
| 6 | Bots | Full hands against bots with the coach beside the table | Event store, hidden information, replay and review | Sketch |
| 7 | Agents | Model-driven opponents and a view of every run | Parallel agents, budgets and observability | Sketch |
| 8 | Limits | Measured thresholds that CI enforces | Cost and latency as numbers | Sketch |

- The next two stages carry full detail, and the sketches get their detail when they become next.
- The lists of work in the sketches are a first guess, and the earlier iterations will change them.
- Stage 2 deliberately builds a coach without tools, so stage 3 shows the gain from tools as a measured number.
- Parallel lanes, each in its own git worktree, start only after the first stages show where the work divides.
- The roadmap lists no dates, because the real speed of the work is not known yet.

## 0 Foundation

**Question.** Can every later change be checked in seconds, with the layers kept apart by tools?

**Delivered.** The monorepo has Python and TypeScript workspaces and one command that runs every linter, type check, boundary rule and test in parallel. It also has typed settings, JSON logs with OpenTelemetry trace ids, and dependency updates with audits. The design system, the landing page and the product, architecture and decision documents exist too.

**Exit checks.** These checks pass today, and they stay green through every later stage.

- `just check` passes and finishes in a few seconds.
- The import rules reject a planted violation, which proves that the layering holds.

## 1 First scenario

**Question.** Can the engine pose and grade one pot odds scenario, and can the web app show it, with no model involved?

**Why first.** The engine is the ground truth for every later claim of the coach. A coach cannot be measured until something else knows the right answer.

**Think first.** These points need the owner decision before the build starts.

- What a scenario holds, such as the hero hand, the board, the pot, the bet and the decision that the learner makes.
- What a correct answer means at beginner level, which is consistent with pot odds and equity and not solver optimal.
- Which numbers the grade shows, so the later coach cites the same numbers.
- When the poker library spike happens. Pot odds and outs need only arithmetic, so the spike waits until a scenario needs equity.

**Build.**

- The smallest engine, with cards, pot odds, required equity and outs counting, plus golden and property tests.
- A seeded scenario generator, so the same seed gives the same scenario.
- One use case behind a thin API route that serves a scenario and grades an answer.
- The generated API client returns, because the web app now makes its first backend call, as ADR-0004 states.
- A web screen on the design system that shows the scenario and the graded result.

**Demo.** The learner opens a scenario, chooses call or fold, and sees the grade with the pot odds and the equity that the call needs.

**Builder learns.** How one engine serves every layer, how a use case sits behind a thin route, and how the contract pipeline keeps the web app honest.

**Exit checks.**

- The grade comes from the engine alone, and golden vectors and property tests prove the formulas.
- The same seed gives the same scenario on every run.
- `just check` passes with the new route, the generated client and the web screen.

## 2 Ask the coach

**Question.** How good is a coach that knows only the scenario and the question, with no tools?

**Why before tools.** A coach without tools gets numbers wrong, and the eval shows by how much. That baseline makes the gain from tools in stage 3 a measured number.

**Think first.** These points need the owner decision before the build starts.

- What the coach sees at each moment, which is the context, such as the scenario, the answer of the learner and the question.
- Whether the coach reveals the answer before the learner commits, because a hint teaches more than a result.
- The shape of the model gateway port, which a spike checks against LiteLLM for current model ids, prompt caching, thinking blocks and structured outputs.
- How the answer streams to the web app.

**Build.**

- The gateway port, the LiteLLM adapter and a scripted fake gateway, so every agent test runs offline.
- A context builder that turns the state of the scenario and the question into a prompt.
- A coach that streams its answer to a question box on the scenario screen.
- A trace that follows one question through the layers, with the same trace id as the logs.
- An eval set built from engine scenarios, and a scorer that checks each number in an answer against the engine.

**Demo.** At any moment of a scenario, the learner types a question such as why a call is correct, and the coach streams an answer.

**Builder learns.** How to assemble context, how a gateway hides the provider, how streaming works, and how an eval turns quality into a number.

**Exit checks.**

- The eval records a baseline score for the coach without tools, and the owner expects the score to be imperfect.
- Every agent test runs offline with the fake gateway.
- A test proves that the context never holds the answer before the learner commits, if the owner chooses that rule.
- One trace shows the whole question, with the same trace id as the logs.

## 3 Grounded coach

**Status.** Sketch. The detail comes when stage 3 becomes next.

**Question.** Do engine tools make the numbers of the coach correct and citable?

**Rough scope.**

- A tool registry with typed tools for pot odds, outs, equity and hand strength, and the agent loop that calls them.
- The poker library spike, because equity needs an evaluator.
- An output contract where every number cites a tool result, and a label for claims that no tool can check.
- The scorer from stage 2, run again to compare the result with the baseline.

**Exit checks.** The share of correct and cited numbers beats the stage 2 baseline, and the trace shows each tool call.

## 4 Program

**Status.** Sketch. The detail comes when stage 4 becomes next.

**Question.** Does a structured path make the coach more useful across a whole session?

**Rough scope.**

- The lessons on hand rankings, outs and equity, and pot odds, each with scenario generators and graded drills.
- Progress tracking, so the learner sees what is done and what comes next.
- Coach context that includes the lesson and the recent attempts of the learner.

**Exit checks.** A learner finishes the first three lessons with graded results, and the coach never disagrees with a drill.

## 5 Memory

**Status.** Sketch. The detail comes when stage 5 becomes next.

**Question.** Does the coach improve when it remembers the learner?

**Rough scope.**

- Memory stores, retrieval and a consolidation job, where every memory records its source.
- The owner picks the embeddings provider, because Anthropic has no embeddings endpoint.
- Pattern detection for repeated mistakes, and learner preferences for pace and style.
- The lessons on expected value and on thinking in ranges.

**Exit checks.** An eval with a recorded learner history shows that the coach cites a repeated mistake.

## 6 Bots

**Status.** Sketch. The detail comes when stage 6 becomes next.

**Question.** Can the learner play full hands against bots while the coach advises without seeing hidden cards?

**Rough scope.**

- The game state machine, side pots, showdown and rule bots with different styles.
- The event store, the outbox and scoped readers, applied from the existing decision records on the event store and the visibility model.
- A table runner, a replay that rebuilds a hand exactly, and a stream of events to the web app.
- The post-hand review, where the coach sees every card after the hand ends.

**Exit checks.** A replay rebuilds the same state, and the leak test proves that the reader of one seat never returns the hole cards of another seat.

## 7 Agents

**Status.** Sketch. The detail comes when stage 7 becomes next.

**Question.** Can many model-driven agents run in parallel within a cost and latency budget?

**Rough scope.**

- Model-driven opponents with personas, mixed with bots at the same table.
- Rate limits per model tier, a budget per run, an action timeout that falls back to bot policy, and a kill switch.
- Taskiq on Redis for many tables, and the agent lab that shows traces, tool calls, cost and latency.

**Exit checks.** Several tables run in parallel without breaking a budget, and a run with only bots reproduces exactly from its seed.

## 8 Limits

**Status.** Sketch. The detail comes when stage 8 becomes next.

**Question.** Which measured numbers define a good enough Range?

**Rough scope.**

- A load test that measures the cost of one hand and the p95 time for a model seat to act.
- Thresholds for the share of cited claims and for the leak test, written into the product measures.
- Answers or clear deferrals for the open questions in the product document.

**Exit checks.** The product measures list real thresholds, and each threshold has an automated check in CI.

## After the first version

The items in the non-goals of the product document wait for a later release, and this roadmap does not order them. They are position strategy, other poker variants, several accounts and hosted deployment.
