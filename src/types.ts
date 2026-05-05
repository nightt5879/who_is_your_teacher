export const DIMENSIONS = ["HW", "CT", "EX", "CH", "MY", "SL", "CA", "AU"] as const;

export type Dimension = (typeof DIMENSIONS)[number];

export const RESULT_CODES = [
  "KHRUSHCHEV",
  "ART_STUDENT",
  "TRUMP",
  "PATRICK",
  "THANOS",
  "BUU",
  "GOTHAM_RIDDLER",
  "RONG",
  "HOLMES",
  "KONGMING",
  "SPONGEBOB",
  "SQUIDWARD",
  "CAPYBARA",
  "NPC_AI",
  "TAILOR",
  "QIN",
  "PRESSURE_MONSTER",
  "KAKASHI",
  "LINGZHU",
  "MOWAN",
  "NINE_COLORED_DEER",
  "SWEEPING_MONK",
  "FINAL_BOSS"
] as const;

export type ResultCode = (typeof RESULT_CODES)[number];

export type DimensionScores = Record<Dimension, number>;

export type Option = {
  id: string;
  text: string;
  delta: Partial<Record<Dimension, number>>;
  boost?: Partial<Record<ResultCode, number>>;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
};

export type ResultItem = {
  code: ResultCode;
  name: string;
  type: "normal" | "hidden";
  vector: DimensionScores;
};

export type ResultTheme = {
  code: ResultCode;
  asset: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    surface: string;
    text: string;
  };
  decorations: string[];
  mood: string;
};

export type ResultSceneHudSpot = {
  x: string;
  y: string;
  width: string;
  align: "left" | "center" | "right";
};

export type ResultSceneConfig = {
  code: ResultCode;
  fullAsset: string;
  palette: {
    primary: string;
    dark: string;
    accent: string;
    glow: string;
    text: string;
  };
  desktopFocus: {
    x: string;
    y: string;
    scale: number;
  };
  mobileFocus: {
    x: string;
    y: string;
    scale: number;
  };
  panelPlacement: "left" | "right" | "bottom";
  motionVariant: "calm" | "spark" | "pressure" | "mystic" | "hidden";
  hud: {
    title: ResultSceneHudSpot;
    radar: ResultSceneHudSpot;
    scores: ResultSceneHudSpot;
    details: ResultSceneHudSpot;
    actions: ResultSceneHudSpot;
  };
  posterLayout: {
    focusX: number;
    focusY: number;
    shade: "light" | "dark" | "dramatic";
  };
};

export type ResultCopy = {
  code: ResultCode;
  name: string;
  subtitle: string;
  oneLiner: string;
  damageIndex: string;
  teacherQuote: string;
  survivalGuide: string;
  tags: string[];
  visual: string;
};

export type Answer = {
  questionId: string;
  optionId: string;
};

export type ScoredResult = {
  code: ResultCode;
  name: string;
  type: "normal" | "hidden";
  score: number;
  baseScore: number;
  boostScore: number;
  chaosScore: number;
};

export type QuizResult = {
  profile: DimensionScores;
  raw: DimensionScores;
  boosts: Partial<Record<ResultCode, number>>;
  finalResult: ScoredResult;
  topResults: ScoredResult[];
};
