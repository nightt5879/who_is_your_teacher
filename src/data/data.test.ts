import { describe, expect, it } from "vitest";
import { QUESTIONS } from "./questions";
import { RESULT_COPY } from "./resultCopy";
import { RESULTS } from "./results";
import { RESULT_SCENES } from "./resultScenes";
import { getQuestions, getResultCopy } from "../i18n";
import { DIMENSIONS, RESULT_CODES } from "../types";

describe("quiz data", () => {
  it("contains the planned question and result counts", () => {
    expect(QUESTIONS).toHaveLength(24);
    expect(RESULTS).toHaveLength(23);
    expect(RESULTS.filter((result) => result.type === "normal")).toHaveLength(17);
    expect(RESULTS.filter((result) => result.type === "hidden")).toHaveLength(6);
  });

  it("keeps every question as a five-option single choice", () => {
    for (const question of QUESTIONS) {
      expect(question.options).toHaveLength(5);
      expect(new Set(question.options.map((option) => option.id)).size).toBe(5);
    }
  });

  it("uses only known dimension and result codes", () => {
    const dimensions = new Set(DIMENSIONS);
    const resultCodes = new Set(RESULT_CODES);

    for (const question of QUESTIONS) {
      for (const option of question.options) {
        expect(Object.keys(option.delta).every((dim) => dimensions.has(dim as never))).toBe(true);
        expect(Object.values(option.delta).every((value) => typeof value === "number" && value > 0)).toBe(true);

        if (option.boost) {
          expect(Object.keys(option.boost).every((code) => resultCodes.has(code as never))).toBe(true);
          expect(Object.values(option.boost).every((value) => typeof value === "number" && value > 0)).toBe(true);
        }
      }
    }
  });

  it("has result vectors and copy for every valid result code", () => {
    const seen = new Set<string>();

    for (const result of RESULTS) {
      expect(seen.has(result.code)).toBe(false);
      seen.add(result.code);
      expect(RESULT_COPY[result.code].name).toBe(result.name);

      for (const dim of DIMENSIONS) {
        expect(result.vector[dim]).toBeGreaterThanOrEqual(0);
        expect(result.vector[dim]).toBeLessThanOrEqual(100);
      }
    }

    expect(Object.keys(RESULT_COPY).sort()).toEqual([...RESULT_CODES].sort());
  });

  it("keeps extreme low result vectors exclusive to hidden results", () => {
    for (const result of RESULTS) {
      if (result.type !== "normal") continue;

      for (const dim of DIMENSIONS) {
        expect(result.vector[dim]).toBeGreaterThanOrEqual(25);
      }
    }
  });

  it("covers every question, option, and result in both languages", () => {
    for (const language of ["zh", "en"] as const) {
      const localizedQuestions = getQuestions(language);
      const localizedCopy = getResultCopy(language);

      expect(localizedQuestions).toHaveLength(QUESTIONS.length);
      expect(Object.keys(localizedCopy).sort()).toEqual([...RESULT_CODES].sort());

      for (const question of localizedQuestions) {
        expect(question.text.length).toBeGreaterThan(0);
        expect(question.options).toHaveLength(5);

        for (const option of question.options) {
          expect(option.text.length).toBeGreaterThan(0);
        }
      }

      for (const code of RESULT_CODES) {
        expect(localizedCopy[code].oneLiner.length).toBeGreaterThan(0);
        expect(localizedCopy[code].survivalGuide.length).toBeGreaterThan(0);
      }
    }
  });

  it("has an immersive scene asset and palette for every result", () => {
    expect(Object.keys(RESULT_SCENES).sort()).toEqual([...RESULT_CODES].sort());

    for (const code of RESULT_CODES) {
      const scene = RESULT_SCENES[code];
      const result = RESULTS.find((item) => item.code === code);

      expect(scene.code).toBe(code);
      expect(scene.fullAsset).toMatch(/^\/who_is_your_teacher\/assets\/result-scenes\/.+\.webp$/);
      expect(scene.desktopFocus.x).toMatch(/%$/);
      expect(scene.desktopFocus.y).toMatch(/%$/);
      expect(scene.mobileFocus.x).toMatch(/%$/);
      expect(scene.mobileFocus.y).toMatch(/%$/);
      expect(scene.desktopFocus.scale).toBeGreaterThan(0);
      expect(scene.mobileFocus.scale).toBeGreaterThan(0);
      expect(["left", "right", "bottom"]).toContain(scene.panelPlacement);
      expect(["calm", "spark", "pressure", "mystic", "hidden"]).toContain(scene.motionVariant);
      expect(["light", "dark", "dramatic"]).toContain(scene.posterLayout.shade);

      for (const color of Object.values(scene.palette)) {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      }

      for (const spot of Object.values(scene.hud)) {
        expect(spot.x.length).toBeGreaterThan(0);
        expect(spot.y.length).toBeGreaterThan(0);
        expect(spot.width.length).toBeGreaterThan(0);
        expect(["left", "center", "right"]).toContain(spot.align);
      }

      if (result?.type === "hidden") {
        expect(scene.motionVariant).toBe("hidden");
      }
    }
  });
});
