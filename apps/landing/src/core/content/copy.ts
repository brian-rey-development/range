export const HERO = {
  title: "Learn to think in poker, from first principles.",
  body: "Range coaches each decision with exact pot odds and equity, then explains the why in one sentence. You see the numbers behind every call, so you can check the advice instead of trusting it.",
  action: "View on GitHub",
  note: "Range is in early development. Follow the build on GitHub.",
} as const;

export const TRAINER = {
  title: "Turn decision",
  badge: "Preview",
} as const;

export const NAVIGATION = {
  label: "Primary",
  skip: "Skip to content",
  github: "GitHub",
  openMenu: "Menu",
  closeMenu: "Close",
} as const;

export const COACH = {
  title: "The coach shows its working",
  intro:
    "After each decision, Range says what it found and shows the numbers behind it. This is an example of the format.",
  feedback:
    "Folding here loses 0.90 bb. Your flush draw completes 35.0% of the time and the call needs 28.6%, so the price is right.",
  method:
    "Pot odds are 4 bb to call into 10 bb, so 4 ÷ 14. Nine hearts remain among 47 unseen cards, counted exactly over the turn and river. These are draw odds only, with no implied odds.",
} as const;

export const STRATEGY = {
  title: "Strategy at a glance",
  intro:
    "The range grid colours each hand by how often it raises, calls or folds. The bar beside it states the same numbers, so colour is never the only signal.",
  note: "These are sample frequencies for layout only, not a recommendation.",
  hint: "Select a hand, or move with the arrow keys.",
} as const;

export const PRINCIPLES = {
  title: "Built to be checked",
  items: [
    {
      title: "The engine does the arithmetic",
      body: "Odds, equity and expected value come from a deterministic poker engine. The model explains, and it never calculates.",
    },
    {
      title: "Claims cite their source",
      body: "Each number in the advice points to the tool result behind it, and anything the engine cannot verify is labeled as a heuristic.",
    },
    {
      title: "Decisions, not people",
      body: "Feedback judges the call you made. A mistake is a price you can learn from, and never a verdict on you.",
    },
  ],
  limit:
    "At beginner level, correct means consistent with pot odds and equity against sensible ranges. Range does not claim to teach solver optimal play.",
} as const;

export const FOOTER = {
  action: "View source on GitHub",
} as const;
