import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { DIMENSION_LABELS } from "../i18n";
import { DIMENSIONS } from "../types";
import type { DimensionScores, ResultSceneConfig } from "../types";
import type { Language } from "../i18n";

type AnimatedScoreGridProps = {
  profile: DimensionScores;
  language: Language;
  scene: ResultSceneConfig;
  animated?: boolean;
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnimatedScoreGrid({ profile, language, scene, animated = true }: AnimatedScoreGridProps) {
  const [progress, setProgress] = useState(animated && !prefersReducedMotion() ? 0 : 1);
  const labels = DIMENSION_LABELS[language];

  useEffect(() => {
    if (!animated || prefersReducedMotion()) {
      setProgress(1);
      return undefined;
    }

    setProgress(0);
    let frame = 0;
    const start = performance.now();
    const duration = 1150;

    const tick = (now: number) => {
      const linear = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - linear, 3);
      setProgress(eased);

      if (linear < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animated, profile]);

  return (
    <div className="animated-score-grid" aria-label={language === "zh" ? "八维评分" : "Eight dimension scores"}>
      {DIMENSIONS.map((dimension, index) => {
        const target = Math.max(0, Math.min(100, profile[dimension]));
        const visibleScore = Math.round(target * progress);

        return (
          <div
            className="score-tile result-stagger"
            key={dimension}
            style={{
              "--score": `${visibleScore}%`,
              "--score-accent": scene.palette.accent,
              "--delay": `${780 + index * 70}ms`
            } as CSSProperties}
          >
            <div className="score-tile-topline">
              <span>{labels[dimension].short}</span>
              <strong>{visibleScore}</strong>
            </div>
            <small>{labels[dimension].long}</small>
            <div className="score-meter" aria-hidden="true">
              <span />
            </div>
          </div>
        );
      })}
    </div>
  );
}
