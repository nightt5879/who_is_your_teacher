import { Github, Quote, RotateCcw, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { AnimatedScoreGrid } from "./AnimatedScoreGrid";
import { CopyResultButton } from "./CopyResultButton";
import { DimensionRadar } from "./DimensionRadar";
import type { QuizResult, ResultCopy, ResultSceneConfig, ResultSceneHudSpot } from "../types";
import type { Language } from "../i18n";

type ResultSceneProps = {
  alias: string;
  language: Language;
  result: QuizResult;
  copy: ResultCopy;
  scene: ResultSceneConfig;
  ui: Record<string, string>;
  repoUrl: string;
  onRestart: () => void;
};

function buildCopyText(alias: string, copy: ResultCopy, language: Language, ui: Record<string, string>) {
  if (language === "zh") {
    return `${alias} 测出来是：${copy.name}\n${copy.oneLiner}\n${copy.damageIndex}\n${ui.entertainmentLine}\nhttps://nightt5879.github.io/who_is_your_teacher/`;
  }

  return `${alias} got: ${copy.name}\n${copy.oneLiner}\n${copy.damageIndex}\n${ui.entertainmentLine}\nhttps://nightt5879.github.io/who_is_your_teacher/`;
}

function hudStyle(spot: ResultSceneHudSpot, delay: number): CSSProperties {
  return {
    "--hud-x": spot.x,
    "--hud-y": spot.y,
    "--hud-width": spot.width,
    "--hud-align": spot.align,
    "--delay": `${delay}ms`
  } as CSSProperties;
}

export function ResultScene({ alias, language, result, copy, scene, ui, repoUrl, onRestart }: ResultSceneProps) {
  const isHidden = result.finalResult.type === "hidden";
  const copyText = buildCopyText(alias, copy, language, ui);
  const sceneStyle = {
    "--scene-primary": scene.palette.primary,
    "--scene-dark": scene.palette.dark,
    "--scene-accent": scene.palette.accent,
    "--scene-glow": scene.palette.glow,
    "--scene-text": scene.palette.text,
    "--desktop-focus-x": scene.desktopFocus.x,
    "--desktop-focus-y": scene.desktopFocus.y,
    "--desktop-scale": scene.desktopFocus.scale,
    "--mobile-focus-x": scene.mobileFocus.x,
    "--mobile-focus-y": scene.mobileFocus.y,
    "--mobile-scale": scene.mobileFocus.scale,
    "--scene-image": `url("${scene.fullAsset}")`
  } as CSSProperties;

  return (
    <section
      className={`result-scene result-scene--${scene.panelPlacement} result-scene--${scene.motionVariant}${
        isHidden ? " is-hidden-result" : ""
      }`}
      style={sceneStyle}
    >
      <div className="result-scene-backdrop" aria-hidden="true" />
      <div className="result-scene-main-art" aria-hidden="true">
        <img src={scene.fullAsset} alt="" />
      </div>
      <div className="result-scene-vignette" aria-hidden="true" />
      {isHidden && (
        <div className="hidden-unlock-banner" aria-label={ui.hiddenUnlocked}>
          <Sparkles aria-hidden="true" size={18} />
          <span>{ui.hiddenUnlocked}</span>
          <strong>{ui.hiddenBadge}</strong>
        </div>
      )}

      <div className="result-hud" aria-label={language === "zh" ? "测试结果" : "Quiz result"}>
        <section className="result-hud-node result-title-float result-stagger" style={hudStyle(scene.hud.title, 460)}>
          <div className="result-scene-header">
            <p className="result-scene-eyebrow">
              {language === "zh" ? `${alias} 的老师类型是` : `${alias}'s teacher type is`}
            </p>
            <div className="result-title-row">
              <h1 className={isHidden ? "hidden-result-name" : undefined}>{copy.name}</h1>
              {isHidden && <span className="hidden-seal">{ui.hiddenBadge}</span>}
            </div>
            <p className="result-scene-subtitle">{copy.subtitle}</p>
            <p className="result-scene-line">{copy.oneLiner}</p>
            <div className="result-scene-tags" aria-label={language === "zh" ? "结果标签" : "Result tags"}>
              {copy.tags.slice(0, 4).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="result-hud-node result-radar-float result-stagger" style={hudStyle(scene.hud.radar, 780)}>
          <div className="radar-float-label">{ui.radarTitle}</div>
          <DimensionRadar profile={result.profile} language={language} theme={scene} animated />
        </section>

        <section className="result-hud-node result-scores-float result-stagger" style={hudStyle(scene.hud.scores, 980)}>
          <AnimatedScoreGrid profile={result.profile} language={language} scene={scene} />
        </section>

        <section className="result-hud-node result-detail-float result-stagger" style={hudStyle(scene.hud.details, 1160)}>
          <div className="result-scene-detail-grid">
            <article className="damage-bubble">
              <span>{ui.damageTitle}</span>
              <p>{copy.damageIndex}</p>
            </article>
            <article className="quote-bubble">
              <span>{ui.quoteTitle}</span>
              <p>
                <Quote aria-hidden="true" size={14} />
                {copy.teacherQuote}
              </p>
            </article>
            <article className="guide-bubble">
              <span>{ui.guideTitle}</span>
              <p>{copy.survivalGuide}</p>
            </article>
          </div>
        </section>

        <section className="result-hud-node result-actions-float result-stagger" style={hudStyle(scene.hud.actions, 1360)}>
          <div className="result-scene-actions">
            <CopyResultButton ui={ui} copyText={copyText} />
            <a className="github-scene-link" href={repoUrl} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" size={20} />
              <span>
                <strong>{ui.githubTitle}</strong>
                <small>{ui.githubAction}</small>
              </span>
            </a>
            <button className="secondary-action result-restart-button" type="button" onClick={onRestart}>
              <RotateCcw aria-hidden="true" size={18} />
              {ui.restart}
            </button>
          </div>
          <small className="result-scene-disclaimer">{ui.disclaimer}</small>
        </section>
      </div>
    </section>
  );
}
