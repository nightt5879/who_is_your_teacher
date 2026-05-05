import { ArrowLeft, ArrowRight, Clipboard, RotateCcw, Share2, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { QUESTIONS } from "./data/questions";
import { RESULT_COPY } from "./data/resultCopy";
import { RESULTS } from "./data/results";
import { calculateQuizResult } from "./scoring";
import type { Answer, QuizResult } from "./types";

type Stage = "home" | "quiz" | "result";
type ShareStatus = "idle" | "shared" | "copied" | "failed";

const DEFAULT_ALIAS = "这位老师";

function App() {
  const [stage, setStage] = useState<Stage>("home");
  const [alias, setAlias] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [shareStatus, setShareStatus] = useState<ShareStatus>("idle");

  const currentQuestion = QUESTIONS[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / QUESTIONS.length) * 100);
  const displayAlias = alias.trim() || DEFAULT_ALIAS;

  const answerList = useMemo<Answer[]>(
    () =>
      QUESTIONS.map((question) => ({
        questionId: question.id,
        optionId: answers[question.id]
      })).filter((answer): answer is Answer => Boolean(answer.optionId)),
    [answers]
  );

  const selectedOption = currentQuestion ? answers[currentQuestion.id] : undefined;
  const canGoNext = Boolean(selectedOption);
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;

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

    const copy = RESULT_COPY[result.finalResult.code];
    const shareText = `${displayAlias} 最像：${copy.name}\n${copy.oneLiner}\n${copy.damageIndex}\n本测试纯属娱乐。`;
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "你老师最像谁？",
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
          <button className="brand-button" type="button" onClick={restart} aria-label="返回首页">
            <span className="brand-mark">师</span>
            <span>你老师最像谁？</span>
          </button>
          <span className="topbar-note">纯娱乐测试</span>
        </header>

        {stage === "home" && (
          <section className="home-screen">
            <div className="hero-copy">
              <p className="eyebrow">Who Is Your Teacher</p>
              <h1>把老师代号放进来，看看 TA 会刷出哪张角色卡。</h1>
              <div className="hero-tags" aria-label="测试信息">
                <span>24 题</span>
                <span>23 结果</span>
                <span>本地计算</span>
              </div>
            </div>

            <div className="alias-panel">
              <label htmlFor="teacher-alias">老师代号 / 外号</label>
              <input
                id="teacher-alias"
                type="text"
                value={alias}
                maxLength={18}
                placeholder="例如：高数王者"
                onChange={(event) => setAlias(event.target.value)}
              />
              <button className="primary-action" type="button" onClick={startQuiz}>
                <Sparkles aria-hidden="true" size={18} />
                开始测试
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
                上一题
              </button>
              <button className="primary-action" type="button" onClick={goNext} disabled={!canGoNext}>
                {isLastQuestion ? "看结果" : "下一题"}
                <ArrowRight aria-hidden="true" size={18} />
              </button>
            </div>
          </section>
        )}

        {stage === "result" && result && (
          <ResultScreen
            alias={displayAlias}
            result={result}
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
  result: QuizResult;
  shareStatus: ShareStatus;
  onShare: () => void;
  onRestart: () => void;
};

function ResultScreen({ alias, result, shareStatus, onShare, onRestart }: ResultScreenProps) {
  const copy = RESULT_COPY[result.finalResult.code];

  return (
    <section className="result-screen">
      <div className="result-card">
        <div className="result-visual" aria-hidden="true">
          {copy.visual}
        </div>
        <div className="result-copy">
          <p className="eyebrow">{alias} 最像</p>
          <h1>{copy.name}</h1>
          <p className="subtitle">{copy.subtitle}</p>
          <p className="one-liner">{copy.oneLiner}</p>
        </div>
      </div>

      <div className="result-details">
        <article>
          <span>精神损伤指数</span>
          <p>{copy.damageIndex}</p>
        </article>
        <article>
          <span>老师名言</span>
          <p>“{copy.teacherQuote}”</p>
        </article>
        <article>
          <span>生存攻略</span>
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
          <span>分享卡预览</span>
          <strong>
            {alias} 最像：{copy.name}
          </strong>
          <p>{copy.damageIndex}</p>
        </div>
        <button className="secondary-action" type="button" onClick={onShare}>
          {shareStatus === "copied" ? <Clipboard aria-hidden="true" size={18} /> : <Share2 aria-hidden="true" size={18} />}
          {shareStatus === "shared" && "已分享"}
          {shareStatus === "copied" && "已复制"}
          {shareStatus === "failed" && "复制失败"}
          {shareStatus === "idle" && "分享"}
        </button>
      </div>

      <p className="disclaimer">本测试纯属娱乐，不构成对任何现实人物的评价。不要输入真实姓名，不上传照片或个人数据。</p>

      <button className="primary-action restart-button" type="button" onClick={onRestart}>
        <RotateCcw aria-hidden="true" size={18} />
        再测一次
      </button>
    </section>
  );
}

export default App;
