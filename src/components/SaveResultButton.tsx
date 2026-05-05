import { Check, Clipboard, Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { generateResultPoster } from "../utils/generateResultPoster";
import type { DimensionScores, ResultCopy, ResultSceneConfig } from "../types";
import type { Language } from "../i18n";

type SaveStatus = "idle" | "saving" | "saved" | "copied" | "failed";

type SaveResultButtonProps = {
  alias: string;
  copy: ResultCopy;
  language: Language;
  profile: DimensionScores;
  scene: ResultSceneConfig;
  isHidden: boolean;
  ui: Record<string, string>;
  copyText: string;
};

function fileNameFor(scene: ResultSceneConfig) {
  return `who-is-your-teacher-${scene.code.toLowerCase()}.png`;
}

export function SaveResultButton({
  alias,
  copy,
  language,
  profile,
  scene,
  isHidden,
  ui,
  copyText
}: SaveResultButtonProps) {
  const [status, setStatus] = useState<SaveStatus>("idle");

  async function copyFallback(nextStatus: SaveStatus = "copied") {
    await navigator.clipboard.writeText(copyText);
    setStatus(nextStatus);
  }

  async function savePoster() {
    try {
      setStatus("saving");
      const blob = await generateResultPoster({ alias, copy, language, profile, scene, isHidden });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = fileNameFor(scene);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus("saved");
    } catch {
      try {
        await copyFallback();
      } catch {
        setStatus("failed");
      }
    }
  }

  async function copyResult() {
    try {
      await copyFallback();
    } catch {
      setStatus("failed");
    }
  }

  const label =
    status === "saving"
      ? ui.savingResult
      : status === "saved"
        ? ui.savedResult
        : status === "copied"
          ? ui.copied
          : status === "failed"
            ? ui.copyFailed
            : ui.saveResult;

  return (
    <div className="save-result-actions">
      <button className="primary-action save-result-button" type="button" onClick={savePoster} disabled={status === "saving"}>
        {status === "saving" && <Loader2 aria-hidden="true" size={18} className="spin-icon" />}
        {status === "saved" && <Check aria-hidden="true" size={18} />}
        {status !== "saving" && status !== "saved" && <Download aria-hidden="true" size={18} />}
        {label}
      </button>
      <button className="secondary-action copy-result-button" type="button" onClick={copyResult}>
        <Clipboard aria-hidden="true" size={17} />
        {ui.copyResult}
      </button>
    </div>
  );
}
