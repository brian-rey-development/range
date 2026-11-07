export type Action = "fold" | "check" | "call" | "bet" | "raise" | "allin";
export type Slot = "allin" | "raise" | "call" | "fold";
export type Frequencies = Partial<Record<Action, number>>;

export type FrequencySegment = {
  readonly action: Action;
  readonly value: number;
  readonly label?: string;
};

export type ActionOption = {
  readonly action: Action;
  readonly label?: string;
  readonly amount?: string;
  readonly hotkey?: string;
  readonly disabled?: boolean;
  readonly id?: string;
};
