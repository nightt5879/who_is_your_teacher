import type { ResultCode, ResultSceneConfig } from "../types";

const sceneAsset = (code: string) => `/who_is_your_teacher/assets/result-scenes/${code.toLowerCase()}.webp`;

const leftHud: ResultSceneConfig["hud"] = {
  title: { x: "7%", y: "8%", width: "min(36vw, 520px)", align: "left" },
  radar: { x: "7%", y: "38%", width: "min(24vw, 330px)", align: "center" },
  scores: { x: "32%", y: "59%", width: "min(30vw, 430px)", align: "left" },
  details: { x: "7%", y: "74%", width: "min(42vw, 620px)", align: "left" },
  actions: { x: "7%", y: "88%", width: "min(43vw, 620px)", align: "left" }
};

const rightHud: ResultSceneConfig["hud"] = {
  title: { x: "58%", y: "8%", width: "min(35vw, 520px)", align: "right" },
  radar: { x: "65%", y: "37%", width: "min(24vw, 330px)", align: "center" },
  scores: { x: "47%", y: "58%", width: "min(30vw, 430px)", align: "left" },
  details: { x: "52%", y: "74%", width: "min(41vw, 620px)", align: "left" },
  actions: { x: "52%", y: "88%", width: "min(41vw, 620px)", align: "left" }
};

const bottomHud: ResultSceneConfig["hud"] = {
  title: { x: "7%", y: "7%", width: "min(40vw, 580px)", align: "left" },
  radar: { x: "66%", y: "16%", width: "min(23vw, 320px)", align: "center" },
  scores: { x: "7%", y: "62%", width: "min(42vw, 620px)", align: "left" },
  details: { x: "50%", y: "68%", width: "min(42vw, 620px)", align: "left" },
  actions: { x: "50%", y: "87%", width: "min(42vw, 620px)", align: "left" }
};

const defaultHud = (panelPlacement: ResultSceneConfig["panelPlacement"]) => {
  if (panelPlacement === "right") return rightHud;
  if (panelPlacement === "bottom") return bottomHud;
  return leftHud;
};

const mergeHud = (
  panelPlacement: ResultSceneConfig["panelPlacement"],
  hud: Partial<ResultSceneConfig["hud"]> = {}
): ResultSceneConfig["hud"] => {
  const preset = defaultHud(panelPlacement);

  return {
    title: { ...preset.title, ...hud.title },
    radar: { ...preset.radar, ...hud.radar },
    scores: { ...preset.scores, ...hud.scores },
    details: { ...preset.details, ...hud.details },
    actions: { ...preset.actions, ...hud.actions }
  };
};

const base = (
  code: ResultCode,
  palette: ResultSceneConfig["palette"],
  panelPlacement: ResultSceneConfig["panelPlacement"],
  motionVariant: ResultSceneConfig["motionVariant"],
  focus: Partial<Pick<ResultSceneConfig, "desktopFocus" | "mobileFocus" | "posterLayout">> & {
    hud?: Partial<ResultSceneConfig["hud"]>;
  } = {}
): ResultSceneConfig => ({
  code,
  fullAsset: sceneAsset(code),
  palette,
  desktopFocus: focus.desktopFocus ?? { x: "50%", y: "50%", scale: 1 },
  mobileFocus: focus.mobileFocus ?? { x: "50%", y: "50%", scale: 1 },
  panelPlacement,
  motionVariant,
  hud: mergeHud(panelPlacement, focus.hud),
  posterLayout: focus.posterLayout ?? { focusX: 0.5, focusY: 0.5, shade: "dramatic" }
});

export const RESULT_SCENES: Record<ResultCode, ResultSceneConfig> = {
  KHRUSHCHEV: base(
    "KHRUSHCHEV",
    { primary: "#9b2b22", dark: "#1f0d0b", accent: "#ffd76a", glow: "#ef4444", text: "#fff1d5" },
    "right",
    "pressure",
    { desktopFocus: { x: "48%", y: "50%", scale: 1 }, posterLayout: { focusX: 0.48, focusY: 0.48, shade: "dramatic" } }
  ),
  ART_STUDENT: base(
    "ART_STUDENT",
    { primary: "#1f1714", dark: "#080605", accent: "#ffd15a", glow: "#dc2626", text: "#fff4dc" },
    "right",
    "pressure",
    { desktopFocus: { x: "50%", y: "48%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.48, shade: "dark" } }
  ),
  TRUMP: base(
    "TRUMP",
    { primary: "#1e3f8f", dark: "#08112b", accent: "#ffd166", glow: "#60a5fa", text: "#f8fbff" },
    "left",
    "spark",
    { desktopFocus: { x: "50%", y: "50%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.48, shade: "dramatic" } }
  ),
  PATRICK: base(
    "PATRICK",
    { primary: "#ef8fbd", dark: "#1b3145", accent: "#fff1a8", glow: "#85d9f2", text: "#fff9fd" },
    "right",
    "calm",
    { desktopFocus: { x: "50%", y: "50%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.5, shade: "light" } }
  ),
  THANOS: base(
    "THANOS",
    { primary: "#32216f", dark: "#090614", accent: "#f7b955", glow: "#8b5cf6", text: "#f5edff" },
    "left",
    "mystic",
    { desktopFocus: { x: "50%", y: "48%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.48, shade: "dark" } }
  ),
  BUU: base(
    "BUU",
    { primary: "#ef7aaa", dark: "#351326", accent: "#f4d35e", glow: "#fb7185", text: "#fff6fb" },
    "right",
    "spark",
    { desktopFocus: { x: "50%", y: "50%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.5, shade: "dramatic" } }
  ),
  GOTHAM_RIDDLER: base(
    "GOTHAM_RIDDLER",
    { primary: "#4b1d95", dark: "#07030f", accent: "#c7ff5f", glow: "#8b5cf6", text: "#efffde" },
    "right",
    "mystic",
    { desktopFocus: { x: "50%", y: "48%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.48, shade: "dark" } }
  ),
  RONG: base(
    "RONG",
    { primary: "#6a1919", dark: "#160809", accent: "#ff7468", glow: "#ef4444", text: "#ffe5df" },
    "left",
    "pressure",
    { desktopFocus: { x: "50%", y: "50%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.5, shade: "dramatic" } }
  ),
  HOLMES: base(
    "HOLMES",
    { primary: "#4f3a1b", dark: "#150f08", accent: "#e0b15d", glow: "#f59e0b", text: "#fff3d6" },
    "right",
    "mystic",
    { desktopFocus: { x: "48%", y: "50%", scale: 1 }, posterLayout: { focusX: 0.48, focusY: 0.5, shade: "dark" } }
  ),
  KONGMING: base(
    "KONGMING",
    { primary: "#12605f", dark: "#052325", accent: "#ffe08a", glow: "#2dd4bf", text: "#ebfffb" },
    "left",
    "calm",
    { desktopFocus: { x: "50%", y: "50%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.5, shade: "dramatic" } }
  ),
  SPONGEBOB: base(
    "SPONGEBOB",
    { primary: "#e9b82f", dark: "#332608", accent: "#ff6b6b", glow: "#fde047", text: "#fff7cf" },
    "right",
    "spark",
    { desktopFocus: { x: "52%", y: "48%", scale: 1 }, posterLayout: { focusX: 0.52, focusY: 0.48, shade: "light" } }
  ),
  SQUIDWARD: base(
    "SQUIDWARD",
    { primary: "#213a58", dark: "#07111e", accent: "#b8d1e0", glow: "#38bdf8", text: "#eef7ff" },
    "right",
    "calm",
    { desktopFocus: { x: "50%", y: "50%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.5, shade: "dark" } }
  ),
  CAPYBARA: base(
    "CAPYBARA",
    { primary: "#9a703d", dark: "#241606", accent: "#f9e6a0", glow: "#fbbf24", text: "#fff4d6" },
    "left",
    "calm",
    { desktopFocus: { x: "50%", y: "50%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.5, shade: "light" } }
  ),
  NPC_AI: base(
    "NPC_AI",
    { primary: "#1b5b86", dark: "#06121f", accent: "#78f6ff", glow: "#22d3ee", text: "#e9fbff" },
    "right",
    "mystic",
    { desktopFocus: { x: "50%", y: "48%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.48, shade: "dark" } }
  ),
  TAILOR: base(
    "TAILOR",
    { primary: "#61518f", dark: "#171126", accent: "#f8d27b", glow: "#c084fc", text: "#fff1df" },
    "left",
    "spark",
    { desktopFocus: { x: "50%", y: "50%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.5, shade: "dramatic" } }
  ),
  QIN: base(
    "QIN",
    { primary: "#b98b45", dark: "#211205", accent: "#f3c55d", glow: "#f59e0b", text: "#fff0cd" },
    "right",
    "pressure",
    { desktopFocus: { x: "50%", y: "50%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.5, shade: "dramatic" } }
  ),
  PRESSURE_MONSTER: base(
    "PRESSURE_MONSTER",
    { primary: "#30343d", dark: "#050609", accent: "#94a3b8", glow: "#64748b", text: "#eef2f7" },
    "left",
    "pressure",
    { desktopFocus: { x: "50%", y: "49%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.49, shade: "dark" } }
  ),
  KAKASHI: base(
    "KAKASHI",
    { primary: "#172c35", dark: "#04090d", accent: "#9bd1d9", glow: "#38bdf8", text: "#e8fbff" },
    "right",
    "hidden",
    { desktopFocus: { x: "50%", y: "48%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.48, shade: "dark" } }
  ),
  LINGZHU: base(
    "LINGZHU",
    { primary: "#3d9aa2", dark: "#08252c", accent: "#ffe8a3", glow: "#67e8f9", text: "#f1fffb" },
    "left",
    "hidden",
    { desktopFocus: { x: "50%", y: "48%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.48, shade: "light" } }
  ),
  MOWAN: base(
    "MOWAN",
    { primary: "#7c1f14", dark: "#120302", accent: "#ff6a3d", glow: "#ef4444", text: "#ffe9dd" },
    "right",
    "hidden",
    { desktopFocus: { x: "50%", y: "48%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.48, shade: "dark" } }
  ),
  NINE_COLORED_DEER: base(
    "NINE_COLORED_DEER",
    { primary: "#476d35", dark: "#0f180c", accent: "#f6e8a2", glow: "#bef264", text: "#fbffe6" },
    "left",
    "hidden",
    { desktopFocus: { x: "50%", y: "48%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.48, shade: "light" } }
  ),
  SWEEPING_MONK: base(
    "SWEEPING_MONK",
    { primary: "#6c5a36", dark: "#171307", accent: "#ead59a", glow: "#facc15", text: "#fff3d3" },
    "right",
    "hidden",
    { desktopFocus: { x: "50%", y: "48%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.48, shade: "dramatic" } }
  ),
  FINAL_BOSS: base(
    "FINAL_BOSS",
    { primary: "#27123e", dark: "#08020d", accent: "#ff4d6d", glow: "#e879f9", text: "#fff0ff" },
    "left",
    "hidden",
    { desktopFocus: { x: "50%", y: "48%", scale: 1 }, posterLayout: { focusX: 0.5, focusY: 0.48, shade: "dark" } }
  )
};
