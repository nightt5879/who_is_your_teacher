import { describe, expect, it } from "vitest";
import { QUESTIONS } from "./questions";
import { RESULT_COPY } from "./resultCopy";
import { RESULTS } from "./results";
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
});
