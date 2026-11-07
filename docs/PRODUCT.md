# Range product

## Purpose

Range teaches a beginner to think about poker from first principles, so the learner understands why a play wins before memorizing which play to make. The learner plays hands against bots and gets advice that cites exact numbers from a poker engine, which makes every claim checkable.

Range has a second purpose, which is to teach its builder how production agent systems work in practice.

## Problem

A beginner often learns poker as a list of rules and charts to memorize, so the learner cannot explain why a call is correct. The rule then fails in every new situation, because the chart does not show the reasoning behind it.

Range teaches that reasoning, which is how likely the hand is to win, what the call costs and which hands the opponent can hold.

## Usage

- The learner plays hands at a table against rule bots and a few model-driven players, and the engine runs every rule of the game.
- The coach explains each decision with numbers from the engine, such as outs, pot odds and equity, so the learner sees the reason.
- Short drills train one idea at a time, and the engine generates and grades every drill so the lesson and the coach never disagree.
- After a hand ends, the coach reviews it with the full view of every card, which a player never has during the hand.
- Range remembers the pace, the explanation style and the repeated mistakes of the learner, and it uses them in later advice.

## Coach

The coach gives advice during a hand, and every claim that contains a number cites a result from an engine tool. A claim that the engine cannot check carries the label heuristic, so the learner knows how much to trust it.

During a hand, the coach sees only what the learner sees, so it never reads the hidden cards of another seat. After the hand ends, the coach reads every event of the hand, because the review needs the full picture.

## Limits

Range does not claim to teach game theory optimal play, because that play needs a solver and a model of every opponent. At the beginner level, a correct decision agrees with pot odds and with equity against sensible ranges, and the coach does not give solver output.

## Lessons

The first lessons build on each other, and each one adds one idea to the decision.

- Hand rankings teach the learner to find the best five cards from seven, which is the base of every other lesson.
- Outs and equity teach the learner to count the cards that improve the hand and to turn that count into a chance.
- Pot odds teach the learner to find the equity that a call needs in order to break even.
- Expected value combines equity and pot odds into the number of chips that a decision wins or loses on average.
- Thinking in ranges teaches the learner to reason about the set of hands an opponent can hold instead of one hand.

## Goals

- Every number in the advice of the coach comes from an engine tool, so the learner or a test can check it.
- The engine generates and grades every drill, so the lessons and the agents never disagree about a result.
- The coach never reveals a hidden card that the learner did not see during the hand.
- The builder can watch several agents play in parallel and read each run in a view called the agent lab.

## Non-goals

The first version leaves out the items below, because each one adds work without helping the main goal.

- Solver-style analysis and game theory optimal strategy, which need a model that Range does not build.
- Position strategy, which the first version leaves for a later release when the basic lessons work.
- Poker variants other than no-limit hold'em, because the engine and the lessons target one game.
- Real-money play, because Range teaches thinking and does not handle money or payments of any kind.
- Several user accounts and sign-in, because the first version has one local learner and runs on one machine.
- Deployment to a hosted environment, because the first version runs on the machine of the builder.

## Measures

Three measures decide whether Range works, and the first load test and the first eval run will set the thresholds.

- The share of coach claims with a number that cite an engine result, which the eval suite measures.
- The result of the leak test, which must show that a seat reader never returns the hole cards of another seat.
- The cost of one hand and the p95 time for an LLM seat to act, which the load test measures.

## Questions

These questions are still open, and each one needs an owner decision or real learner data.

- The entry level, which means whether the learner already knows the hand rankings before the first lesson.
- The visual identity of the web app, which the owner has not chosen and which affects every screen.
- The provider of text embeddings for memory, because Anthropic has no embeddings endpoint and the choice stays open.
- The way to measure what the learner actually learns, which needs real learner data from real sessions.
