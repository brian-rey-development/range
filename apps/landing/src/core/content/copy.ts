export const HERO = {
  problem: "Charts tell you what to play.",
  answer: "Range tells you why.",
  action: "Try a hand",
  body: "Lost a pot at midnight and not sure why? Range is the coach who is there at that hour. It explains each decision with exact numbers, reviews the hand afterward and remembers the mistakes you repeat.",
} as const;

export const PLAY = {
  title: "Try one decision",
  intro:
    "You have a flush draw, villain is all in, and the call costs 4 bb. Choose, and Range grades it with the numbers behind the grade.",
  street: "Flop",
  hand: "Your hand",
  prompt: "What do you do? Pick one, or press F or C.",
  derivation: "Where the numbers come from",
} as const;

export const NAVIGATION = {
  label: "Primary",
  skip: "Skip to content",
  github: "GitHub",
  openMenu: "Menu",
  closeMenu: "Close",
} as const;

export const HOW_IT_WORKS = {
  title: "How Range coaches you",
  items: [
    {
      title: "During the hand",
      body: "The coach explains each decision with outs, pot odds and equity from a deterministic engine. Every number comes from the engine and shows its working.",
    },
    {
      title: "After the hand",
      body: "The coach reviews the whole hand with every card visible and grades each decision by what it cost. Short drills train one idea at a time.",
    },
    {
      title: "Over time",
      body: "Range remembers your pace, how you like things explained and the mistakes you repeat, and uses them in later advice.",
    },
  ],
  limit:
    "Range teaches the math you can do at the table. It does not teach solver play, so there is no solver jargon to learn.",
} as const;

export const CTA = {
  title: "Follow the build",
  body: "Range is in early development.",
  action: "Follow on GitHub",
} as const;

export const FOOTER = {
  action: "GitHub",
} as const;
