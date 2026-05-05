import { DIMENSIONS } from "./types";
import type {
  Answer,
  Dimension,
  DimensionScores,
  Question,
  QuizResult,
  ResultCode,
  ResultItem,
  ScoredResult
} from "./types";

export const DIM_WEIGHT: Record<Dimension, number> = {
  HW: 1.1,
  CT: 1.1,
  EX: 1.2,
  CH: 1,
  MY: 1,
  SL: 1,
  CA: 1,
  AU: 1.2
};

export function initDims(): DimensionScores {
  return {
    HW: 0,
    CT: 0,
    EX: 0,
    CH: 0,
    MY: 0,
    SL: 0,
    CA: 0,
    AU: 0
  };
}

export function getMaxPossibleByDimension(questions: Question[]): DimensionScores {
  const maxPossible = initDims();

  for (const question of questions) {
    const perQuestionMax = initDims();

    for (const option of question.options) {
      for (const dim of Object.keys(option.delta) as Dimension[]) {
        perQuestionMax[dim] = Math.max(perQuestionMax[dim], option.delta[dim] ?? 0);
      }
    }

    for (const dim of DIMENSIONS) {
      maxPossible[dim] += perQuestionMax[dim];
    }
  }

  return maxPossible;
}

export function normalizeProfile(raw: DimensionScores, maxPossible: DimensionScores): DimensionScores {
  const profile = initDims();

  for (const dim of DIMENSIONS) {
    profile[dim] =
      maxPossible[dim] === 0 ? 0 : Math.min(100, Math.round((raw[dim] / maxPossible[dim]) * 100));
  }

  return profile;
}

export function deterministicChaos(answerIds: string[], alias = "", resultCode = ""): number {
  const source = `${answerIds.join("|")}::${alias.trim()}::${resultCode}`;
  let hash = 0;

  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) >>> 0;
  }

  return (hash % 50) / 100;
}

export function calculateBaseScores(
  profile: DimensionScores,
  boosts: Partial<Record<ResultCode, number>>,
  results: ResultItem[],
  answerIds: string[] = [],
  alias = ""
): ScoredResult[] {
  return results.map((result) => {
    let distance = 0;

    for (const dim of DIMENSIONS) {
      distance += Math.abs(profile[dim] - result.vector[dim]) * DIM_WEIGHT[dim];
    }

    const baseScore = 100 - distance / DIMENSIONS.length;
    const boostScore = boosts[result.code] ?? 0;
    const chaosScore = deterministicChaos(answerIds, alias, result.code);

    return {
      code: result.code,
      name: result.name,
      type: result.type,
      score: baseScore + boostScore + chaosScore,
      baseScore,
      boostScore,
      chaosScore
    };
  });
}

export function isHiddenTriggered(
  code: ResultCode,
  profile: DimensionScores,
  boosts: Partial<Record<ResultCode, number>>
): boolean {
  const { HW, CT, EX, CH, MY, SL, CA, AU } = profile;

  switch (code) {
    case "KAKASHI":
      return SL >= 85 && (boosts.KAKASHI ?? 0) >= 4;

    case "LINGZHU":
      return CA >= 80 && AU >= 20 && AU <= 55 && EX <= 60;

    case "MOWAN":
      return CH >= 80 && AU >= 80 && EX >= 70 && CA <= 35;

    case "NINE_COLORED_DEER":
      return CA >= 90 && HW <= 45 && EX <= 45 && AU <= 35;

    case "SWEEPING_MONK":
      return CA >= 70 && CT >= 40 && CT <= 70 && AU <= 45 && MY <= 55;

    case "FINAL_BOSS":
      return (HW >= 80 && CT >= 80 && EX >= 80 && AU >= 85) || ((boosts.FINAL_BOSS ?? 0) >= 8 && AU >= 75);

    default:
      return false;
  }
}

export function pickFinalResult(
  scoredResults: ScoredResult[],
  profile: DimensionScores,
  boosts: Partial<Record<ResultCode, number>>
): ScoredResult {
  const normalCandidates = scoredResults
    .filter((result) => result.type === "normal")
    .sort((a, b) => b.score - a.score);

  const hiddenCandidates = scoredResults
    .filter((result) => result.type === "hidden")
    .filter((result) => isHiddenTriggered(result.code, profile, boosts))
    .sort((a, b) => b.score - a.score);

  const bestNormal = normalCandidates[0];
  const bestHidden = hiddenCandidates[0];

  if (!bestNormal) {
    throw new Error("No normal result candidates available.");
  }

  if (bestHidden && bestHidden.score >= bestNormal.score - 3) {
    return bestHidden;
  }

  return bestNormal;
}

export function calculateQuizResult(
  answers: Answer[],
  questions: Question[],
  results: ResultItem[],
  alias = ""
): QuizResult {
  const raw = initDims();
  const boosts: Partial<Record<ResultCode, number>> = {};
  const answerIds: string[] = [];

  for (const answer of answers) {
    const question = questions.find((item) => item.id === answer.questionId);
    if (!question) {
      throw new Error(`Question not found: ${answer.questionId}`);
    }

    const option = question.options.find((item) => item.id === answer.optionId);
    if (!option) {
      throw new Error(`Option not found: ${answer.questionId}/${answer.optionId}`);
    }

    answerIds.push(`${answer.questionId}:${answer.optionId}`);

    for (const dim of Object.keys(option.delta) as Dimension[]) {
      raw[dim] += option.delta[dim] ?? 0;
    }

    if (option.boost) {
      for (const code of Object.keys(option.boost) as ResultCode[]) {
        boosts[code] = (boosts[code] ?? 0) + (option.boost[code] ?? 0);
      }
    }
  }

  const maxPossible = getMaxPossibleByDimension(questions);
  const profile = normalizeProfile(raw, maxPossible);
  const scoredResults = calculateBaseScores(profile, boosts, results, answerIds, alias);
  const finalResult = pickFinalResult(scoredResults, profile, boosts);
  const topResults = [...scoredResults].sort((a, b) => b.score - a.score).slice(0, 5);

  return {
    profile,
    raw,
    boosts,
    finalResult,
    topResults
  };
}
