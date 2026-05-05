import { ArrowLeft, ArrowRight, Clipboard, Github, RotateCcw, Share2, Sparkles, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { QUESTIONS } from "./data/questions";
import { RESULTS } from "./data/results";
import {
  getQuestions,
  getResultCopy,
  REPO_URL,
  UI_TEXT,
  VISITOR_COUNT_BASE,
  VISITOR_COUNT_KEY
} from "./i18n";
import { calculateQuizResult } from "./scoring";
import type { QuizResult, ResultCopy } from "./types";
import type { Language } from "./i18n";

type Stage = "home" | "quiz" | "result";
type ShareStatus = "idle" | "shared" | "copied" | "failed";

function App() {
  const [stage, setStage] = useState<Stage>("home");
  const [language, setLanguage] = useState<Language>("zh");
  const [visitorCount, setVisitorCount] = useState(VISITOR_COUNT_BASE);
  const [alias, setAlias] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [shareStatus, setShareStatus] = useState<ShareStatus>("idle");
  const countedVisit = useRef(false);

  const ui = UI_TEXT[language];
  const displayQuestions = getQuestions(language);
  const resultCopy = getResultCopy(language);
  const currentQuestion = displayQuestions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / QUESTIONS.length) * 100);
  const displayAlias = alias.trim() || ui.defaultAlias;
  const formattedVisitorCount = visitorCount.toLocaleString(language === "zh" ? "zh-CN" : "en-US");

  const selectedOption = currentQuestion ? answers[currentQuestion.id] : undefined;
  const canGoNext = Boolean(selectedOption);
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;

  useEffect(() => {
    if (countedVisit.current) return;
    countedVisit.current = true;

    try {
      const stored = Number.parseInt(window.localStorage.getItem(VISITOR_COUNT_KEY) ?? "", 10);
      const current = Number.isFinite(stored) ? Math.max(stored, VISITOR_COUNT_BASE) : VISITOR_COUNT_BASE;
      const next = current + 1;
      window.localStorage.setItem(VISITOR_COUNT_KEY, String(next));
      setVisitorCount(next);
    } catch {
      setVisitorCount(VISITOR_COUNT_BASE + 1);
    }
  }, []);

  function startQuiz() {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setShareStatus("idle");
    setStage("quiz");
  }

  function chooseOption(optionId: string) {
    if (!currentQuestion) return;
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: optionId
    }));
  }

  function goNext() {
    if (!currentQuestion || !selectedOption) return;

    if (isLastQuestion) {
      const finalAnswers = QUESTIONS.map((question) => {
        const optionId = answers[question.id];
        if (!optionId) {
          throw new Error(`Missing answer for ${question.id}`);
        }

        return {
          questionId: question.id,
          optionId
        };
      });
      setResult(calculateQuizResult(finalAnswers, QUESTIONS, RESULTS, displayAlias));
      setShareStatus("idle");
      setStage("result");
      return;
    }

    setCurrentIndex((index) => Math.min(index + 1, QUESTIONS.length - 1));
  }

  function goBack() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function restart() {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setShareStatus("idle");
    setStage("home");
  }

  async function shareResult() {
    if (!result) return;

    const copy = resultCopy[result.finalResult.code];
    const shareText =
      language === "zh"
        ? `${displayAlias} 最像：${copy.name}\n${copy.oneLiner}\n${copy.damageIndex}\n${ui.entertainmentLine}`
        : `${displayAlias} is most like: ${copy.name}\n${copy.oneLiner}\n${copy.damageIndex}\n${ui.entertainmentLine}`;
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: ui.shareTitle,
          text: shareText,
          url: shareUrl
        });
        setShareStatus("shared");
        return;
      }

      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setShareStatus("copied");
    } catch {
      setShareStatus("failed");
    }
  }

  return (
    <main className="app-shell">
      <div className="background-grid" />
      <section className="app-frame" aria-live="polite">
        <header className="topbar">
          <button className="brand-button" type="button" onClick={restart} aria-label={ui.homeAria}>
            <span className="brand-mark">{ui.brandMark}</span>
            <span>{ui.appName}</span>
          </button>
          <div className="topbar-actions">
            <div className="language-toggle" aria-label="Language">
              <button className={language === "zh" ? "active" : ""} type="button" onClick={() => setLanguage("zh")}>
                {ui.languageZh}
              </button>
              <button className={language === "en" ? "active" : ""} type="button" onClick={() => setLanguage("en")}>
                {ui.languageEn}
              </button>
            </div>
            <span className="topbar-note">{ui.topbarNote}</span>
          </div>
        </header>

        {stage === "home" && (
          <section className="home-screen">
            <div className="hero-copy">
              <p className="eyebrow">{ui.eyebrow}</p>
              <h1>{ui.heroTitle}</h1>
              <div className="visitor-meter" aria-label={language === "zh" ? "参与人数" : "Participant count"}>
                <Users aria-hidden="true" size={19} />
                <span>
                  {ui.playedPrefix && `${ui.playedPrefix} `}
                  <strong>{formattedVisitorCount}</strong>
                  {` ${ui.playedSuffix}`}
                </span>
              </div>
              <div className="hero-tags" aria-label="测试信息">
                <span>{ui.tagQuestions}</span>
                <span>{ui.tagResults}</span>
                <span>{ui.tagLocal}</span>
              </div>
            </div>

            <div className="alias-panel">
              <label htmlFor="teacher-alias">{ui.aliasLabel}</label>
              <input
                id="teacher-alias"
                type="text"
                value={alias}
                maxLength={18}
                placeholder={ui.aliasPlaceholder}
                onChange={(event) => setAlias(event.target.value)}
              />
              <button className="primary-action" type="button" onClick={startQuiz}>
                <Sparkles aria-hidden="true" size={18} />
                {ui.start}
              </button>
            </div>
          </section>
        )}

        {stage === "quiz" && currentQuestion && (
          <section className="quiz-screen">
            <div className="progress-block">
              <div className="progress-meta">
                <span>
                  {currentIndex + 1} / {QUESTIONS.length}
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="progress-track" aria-hidden="true">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <div className="question-panel">
              <p className="question-kicker">{displayAlias}</p>
              <h2>{currentQuestion.text}</h2>
              <div className="options-list">
                {currentQuestion.options.map((option, optionIndex) => {
                  const isSelected = selectedOption === option.id;
                  return (
                    <button
                      key={option.id}
                      className={`option-button${isSelected ? " selected" : ""}`}
                      type="button"
                      onClick={() => chooseOption(option.id)}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                      <span>{option.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="quiz-actions">
              <button className="secondary-action" type="button" onClick={goBack} disabled={currentIndex === 0}>
                <ArrowLeft aria-hidden="true" size={18} />
                {ui.previous}
              </button>
              <button className="primary-action" type="button" onClick={goNext} disabled={!canGoNext}>
                {isLastQuestion ? ui.resultButton : ui.next}
                <ArrowRight aria-hidden="true" size={18} />
              </button>
            </div>
          </section>
        )}

        {stage === "result" && result && (
          <ResultScreen
            alias={displayAlias}
            language={language}
            copy={resultCopy[result.finalResult.code]}
            ui={ui}
            shareStatus={shareStatus}
            onShare={shareResult}
            onRestart={restart}
          />
        )}
      </section>
    </main>
  );
}

type ResultScreenProps = {
  alias: string;
  language: Language;
  copy: ResultCopy;
  ui: (typeof UI_TEXT)[Language];
  shareStatus: ShareStatus;
  onShare: () => void;
  onRestart: () => void;
};

function ResultScreen({ alias, language, copy, ui, shareStatus, onShare, onRestart }: ResultScreenProps) {
  return (
    <section className="result-screen">
      <div className="result-card">
        <div className="result-visual" aria-hidden="true">
          {copy.visual}
        </div>
        <div className="result-copy">
          <p className="eyebrow">
            {language === "zh" ? `${alias} ${ui.resultPrefix}` : `${alias} ${ui.resultPrefix}`}
          </p>
          <h1>{copy.name}</h1>
          <p className="subtitle">{copy.subtitle}</p>
          <p className="one-liner">{copy.oneLiner}</p>
        </div>
      </div>

      <div className="result-details">
        <article>
          <span>{ui.damageTitle}</span>
          <p>{copy.damageIndex}</p>
        </article>
        <article>
          <span>{ui.quoteTitle}</span>
          <p>“{copy.teacherQuote}”</p>
        </article>
        <article>
          <span>{ui.guideTitle}</span>
          <p>{copy.survivalGuide}</p>
        </article>
      </div>

      <div className="tag-row" aria-label="结果标签">
        {copy.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="share-card">
        <div>
          <span>{ui.sharePreview}</span>
          <strong>
            {language === "zh" ? `${alias} 最像：${copy.name}` : `${alias} is most like: ${copy.name}`}
          </strong>
          <p>{copy.damageIndex}</p>
        </div>
        <button className="secondary-action" type="button" onClick={onShare}>
          {shareStatus === "copied" ? <Clipboard aria-hidden="true" size={18} /> : <Share2 aria-hidden="true" size={18} />}
          {shareStatus === "shared" && ui.shared}
          {shareStatus === "copied" && ui.copied}
          {shareStatus === "failed" && ui.copyFailed}
          {shareStatus === "idle" && ui.share}
        </button>
      </div>

      <a className="github-card" href={REPO_URL} target="_blank" rel="noreferrer">
        <Github aria-hidden="true" size={28} />
        <span>
          <strong>{ui.githubTitle}</strong>
          <small>{ui.githubText}</small>
        </span>
        <em>{ui.githubAction}</em>
      </a>

      <p className="disclaimer">{ui.disclaimer}</p>

      <button className="primary-action restart-button" type="button" onClick={onRestart}>
        <RotateCcw aria-hidden="true" size={18} />
        {ui.restart}
      </button>
    </section>
  );
}

export default App;
