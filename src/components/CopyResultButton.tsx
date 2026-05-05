import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

type CopyStatus = "idle" | "copied" | "failed";

type CopyResultButtonProps = {
  ui: Record<string, string>;
  copyText: string;
};

async function writeClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Some in-app browsers expose the Clipboard API but reject writes.
      // Fall through to the selection-based copy path.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const didCopy = document.execCommand("copy");
  textarea.remove();

  if (!didCopy) {
    throw new Error("Copy command failed.");
  }
}

export function CopyResultButton({ ui, copyText }: CopyResultButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  async function copyResult() {
    try {
      await writeClipboard(copyText);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  const label = status === "copied" ? ui.copied : status === "failed" ? ui.copyFailed : ui.copyResult;

  return (
    <button className="primary-action copy-result-button" type="button" onClick={copyResult}>
      {status === "copied" ? <Check aria-hidden="true" size={18} /> : <Clipboard aria-hidden="true" size={18} />}
      {label}
    </button>
  );
}
