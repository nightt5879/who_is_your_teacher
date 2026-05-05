import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ScanLine,
  Sparkles,
  Users
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ResultScene } from "./components/ResultScene";
import { QUESTIONS } from "./data/questions";
import { RESULTS } from "./data/results";
import { RESULT_SCENES } from "./data/resultScenes";
import {
  getQuestions,
  getResultCopy,
  REPO_URL,
  UI_TEXT,
  VISITOR_COUNT_API
} from "./i18n";
import { calculateQuizResult } from "./scoring";
import type { QuizResult } from "./types";
import type { Language } from "./i18n";

type Stage = "home" | "quiz" | "loading" | "result";
let countedThisPageLoad = false;

type VisitorCounterResponse = {
  count?: number;
};

function App() {
  const [stage, setStage] = useState<Stage>("home");
  const [language, setLanguage] = useState<Language>("zh");
  const [visitorCount, setVisitorCount] = useState(0);
  const [alias, setAlias] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const countedVisit = useRef(false);

  const ui = UI_TEXT[language];
  const displayQuestions = getQuestions(language);
  const resultCopy = getResultCopy(language);
  const currentQuestion = displayQuestions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / QUESTIONS.length) * 100);
  const displayAlias = alias.trim() || ui.defaultAlias;
  const formattedVisitorCount = visitorCount.toLocaleString(language === "zh" ? "zh-CN" : "en-US");
  const showTopbarActions = stage === "home";

  const selectedOption = currentQuestion ? answers[currentQuestion.id] : undefined;
  const canGoNext = Boolean(selectedOption);
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;

  useEffect(() => {
    if (countedVisit.current || countedThisPageLoad) return;
    countedVisit.current = true;
    countedThisPageLoad = true;

    fetch(VISITOR_COUNT_API, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Visitor counter request failed.");
        }

        return response.json() as Promise<VisitorCounterResponse>;
      })
      .then((data) => {
        if (typeof data.count !== "number") {
          throw new Error("Visitor counter response is invalid.");
        }

        setVisitorCount(Math.max(0, Math.floor(data.count)));
      })
      .catch(() => {
        setVisitorCount(0);
      });
  }, []);

  useEffect(() => {
    if (stage !== "loading" || !result) return undefined;

    const timer = window.setTimeout(() => {
      setStage("result");
    }, 1350);

    return () => window.clearTimeout(timer);
  }, [result, stage]);

  useEffect(() => {
    if (stage !== "quiz") return;
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0 });
    });
  }, [currentIndex, stage]);

  function startQuiz() {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
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
      setStage("loading");
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
    setStage("home");
  }

  return (
    <main className={`app-shell stage-${stage}`}>
      <div className="background-grid" />
      <section className="app-frame" aria-live="polite">
        {stage !== "result" && (
          <header className="topbar">
            <button className="brand-button" type="button" onClick={restart} aria-label={ui.homeAria}>
              <span className="brand-mark">{ui.brandMark}</span>
              <span>{ui.appName}</span>
            </button>
            {showTopbarActions && (
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
            )}
          </header>
        )}

        {stage === "home" && (
          <section className="home-screen">
            <div className="scene-paper paper-a" aria-hidden="true" />
            <div className="scene-paper paper-b" aria-hidden="true" />
            <div className="scene-paper paper-c" aria-hidden="true" />
            <div className="hero-copy">
              <p className="eyebrow">{ui.eyebrow}</p>
              <h1>{ui.heroTitle}</h1>
            </div>

            <div className="home-dock">
              <div className="visitor-meter" aria-label={language === "zh" ? "参与人数" : "Participant count"}>
                <Users aria-hidden="true" size={18} />
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
            </div>
          </section>
        )}

        {stage === "quiz" && currentQuestion && (
          <section className="quiz-screen">
            <div className="scene-paper paper-a" aria-hidden="true" />
            <div className="scene-paper paper-b" aria-hidden="true" />
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
              <div className="mission-strip">
                <BookOpen aria-hidden="true" size={18} />
                <span>{displayAlias}</span>
              </div>
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

        {stage === "loading" && <LoadingScreen language={language} ui={ui} />}

        {stage === "result" && result && (
          <ResultScene
            alias={displayAlias}
            language={language}
            result={result}
            copy={resultCopy[result.finalResult.code]}
            scene={RESULT_SCENES[result.finalResult.code]}
            ui={ui}
            repoUrl={REPO_URL}
            onRestart={restart}
          />
        )}
      </section>
    </main>
  );
}

type LoadingScreenProps = {
  language: Language;
  ui: (typeof UI_TEXT)[Language];
};

function LoadingScreen({ language, ui }: LoadingScreenProps) {
  return (
    <section className="loading-screen">
      <div className="scene-paper paper-a" aria-hidden="true" />
      <div className="scene-paper paper-b" aria-hidden="true" />
      <div className="scene-paper paper-c" aria-hidden="true" />
      <div className="scanner-card">
        <ScanLine aria-hidden="true" size={34} />
        <p className="eyebrow">{language === "zh" ? "Teacher File Scanner" : "Teacher File Scanner"}</p>
        <h1>{ui.loadingTitle}</h1>
        <p>{ui.loadingSubtitle}</p>
        <div className="scanner-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="loading-track">
          <div />
        </div>
        <strong>{ui.loadingProgress}</strong>
      </div>
    </section>
  );
}

export default App;
