import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { DimensionRadar } from "./DimensionRadar";
import { RESULT_SCENES } from "../data/resultScenes";
import { DIMENSIONS } from "../types";
import type { DimensionScores } from "../types";

describe("DimensionRadar", () => {
  it("renders all eight scoring dimensions", () => {
    const profile = DIMENSIONS.reduce((scores, dimension, index) => {
      scores[dimension] = (index + 1) * 10;
      return scores;
    }, {} as DimensionScores);

    render(<DimensionRadar profile={profile} language="zh" theme={RESULT_SCENES.FINAL_BOSS} />);

    expect(screen.getByRole("img", { name: "dimension radar" })).toBeInTheDocument();
    for (const label of ["作业", "纪律", "考试", "混沌", "谜语", "失联", "关怀", "压迫"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });
});
