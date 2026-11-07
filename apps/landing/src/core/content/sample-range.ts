import type { Frequencies, Hand } from "@range/ui";

export const FOLD_ONLY: Frequencies = { fold: 1 };

export const SAMPLE_RANGE: Readonly<Record<Hand, Frequencies>> = {
  AA: { raise: 1 },
  KK: { raise: 1 },
  QQ: { raise: 1 },
  JJ: { raise: 0.8, call: 0.2 },
  TT: { raise: 0.5, call: 0.5 },
  "99": { call: 1 },
  "88": { call: 1 },
  AKs: { raise: 1 },
  AQs: { raise: 1 },
  AJs: { raise: 0.6, call: 0.4 },
  ATs: { call: 1 },
  KQs: { raise: 0.5, call: 0.5 },
  KJs: { call: 1 },
  QJs: { call: 1 },
  JTs: { call: 1 },
  AKo: { raise: 1 },
  AQo: { raise: 0.4, call: 0.6 },
  KQo: { call: 0.5, fold: 0.5 },
};
