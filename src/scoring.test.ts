import { describe, expect, it } from "vitest";
import { QUESTIONS } from "./data/questions";
import { RESULTS } from "./data/results";
import {
  calculateQuizResult,
  getMaxPossibleByDimension,
  initDims,
  isHiddenTriggered,
  normalizeProfile,
  pickFinalResult
} from "./scoring";
import type { DimensionScores, ScoredResult } from "./types";

function profile(overrides: Partial<DimensionScores>): DimensionScores {
  return {
    ...initDims(),
    ...overrides
  };
}

function scored(code: ScoredResult["code"], type: ScoredResult["type"], score: number): ScoredResult {
  return {
    code,
    name: code,
    type,
    score,
    baseScore: score,
    boostScore: 0,
    chaosScore: 0
  };
}

describe("scoring", () => {
  it("normalizes raw dimension scores with auto-calculated maximums", () => {
    const maxPossible = getMaxPossibleByDimension(QUESTIONS);
    const normalized = normalizeProfile(
      profile({
        HW: Math.round(maxPossible.HW / 2),
        CA: maxPossible.CA
      }),
      maxPossible
    );

    expect(normalized.HW).toBeGreaterThanOrEqual(49);
    expect(normalized.HW).toBeLessThanOrEqual(51);
    expect(normalized.CA).toBe(100);
    expect(normalized.SL).toBe(0);
  });

  it("accumulates answer boosts without exposing them to the UI contract", () => {
    const result = calculateQuizResult([{ questionId: "q15", optionId: "e" }], QUESTIONS, RESULTS, "迟到王");

    expect(result.raw.SL).toBe(3);
    expect(result.boosts.KAKASHI).toBe(7);
    expect(result.topResults).toHaveLength(5);
  });

  it("matches every hidden trigger rule from the design doc", () => {
    expect(isHiddenTriggered("KAKASHI", profile({ SL: 85 }), { KAKASHI: 4 })).toBe(true);
    expect(isHiddenTriggered("LINGZHU", profile({ CA: 80, AU: 35, EX: 60 }), {})).toBe(true);
    expect(isHiddenTriggered("MOWAN", profile({ CH: 80, AU: 80, EX: 70, CA: 35 }), {})).toBe(true);
    expect(isHiddenTriggered("NINE_COLORED_DEER", profile({ CA: 90, HW: 45, EX: 45, AU: 35 }), {})).toBe(true);
    expect(isHiddenTriggered("SWEEPING_MONK", profile({ CA: 70, CT: 55, AU: 45, MY: 55 }), {})).toBe(true);
    expect(isHiddenTriggered("FINAL_BOSS", profile({ HW: 80, CT: 80, EX: 80, AU: 85 }), {})).toBe(true);
    expect(isHiddenTriggered("FINAL_BOSS", profile({ AU: 75 }), { FINAL_BOSS: 8 })).toBe(true);
  });

  it("prevents hidden results from overriding when their score is too far away", () => {
    const triggeredProfile = profile({ CH: 90, AU: 90, EX: 90, CA: 10 });
    const winner = pickFinalResult(
      [scored("PRESSURE_MONSTER", "normal", 90), scored("MOWAN", "hidden", 80)],
      triggeredProfile,
      {}
    );

    expect(winner.code).toBe("PRESSURE_MONSTER");
  });

  it("allows a triggered hidden result when it is close to the best normal result", () => {
    const triggeredProfile = profile({ CH: 90, AU: 90, EX: 90, CA: 10 });
    const winner = pickFinalResult(
      [scored("PRESSURE_MONSTER", "normal", 90), scored("MOWAN", "hidden", 87)],
      triggeredProfile,
      {}
    );

    expect(winner.code).toBe("MOWAN");
  });
});
