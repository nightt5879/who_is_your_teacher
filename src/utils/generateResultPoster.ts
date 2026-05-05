import { DIMENSION_LABELS } from "../i18n";
import { DIMENSIONS } from "../types";
import type { DimensionScores, ResultCopy, ResultSceneConfig } from "../types";
import type { Language } from "../i18n";

type GenerateResultPosterInput = {
  alias: string;
  copy: ResultCopy;
  language: Language;
  profile: DimensionScores;
  scene: ResultSceneConfig;
  isHidden: boolean;
};

const POSTER_WIDTH = 1080;
const POSTER_HEIGHT = 1920;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load image: ${src}`));
    image.src = src;
  });
}

function drawCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  focusX: number,
  focusY: number
) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sourceWidth = width / scale;
  const sourceHeight = height / scale;
  const sourceX = Math.min(
    Math.max(0, image.naturalWidth * focusX - sourceWidth / 2),
    image.naturalWidth - sourceWidth
  );
  const sourceY = Math.min(
    Math.max(0, image.naturalHeight * focusY - sourceHeight / 2),
    image.naturalHeight - sourceHeight
  );

  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function roundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = /[\u4e00-\u9fff]/.test(text) ? [...text] : text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = /[\u4e00-\u9fff]/.test(text) ? `${current}${word}` : current ? `${current} ${word}` : word;
    if (context.measureText(next).width <= maxWidth || !current) {
      current = next;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function drawMultiline(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 3
) {
  const allLines = wrapText(context, text, maxWidth);
  const lines = allLines.slice(0, maxLines);
  lines.forEach((line, index) => {
    context.fillText(index === maxLines - 1 && allLines.length > maxLines ? `${line}...` : line, x, y + index * lineHeight);
  });
  return y + lines.length * lineHeight;
}

function drawRadar(
  context: CanvasRenderingContext2D,
  profile: DimensionScores,
  language: Language,
  scene: ResultSceneConfig,
  centerX: number,
  centerY: number,
  radius: number
) {
  const axisCount = DIMENSIONS.length;
  const labels = DIMENSION_LABELS[language];

  function point(value: number, index: number) {
    const angle = -Math.PI / 2 + (index / axisCount) * Math.PI * 2;
    return {
      x: centerX + Math.cos(angle) * radius * value,
      y: centerY + Math.sin(angle) * radius * value
    };
  }

  context.save();
  context.strokeStyle = "rgba(255,255,255,0.22)";
  context.lineWidth = 2;

  [0.25, 0.5, 0.75, 1].forEach((ring) => {
    context.beginPath();
    DIMENSIONS.forEach((_, index) => {
      const p = point(ring, index);
      if (index === 0) context.moveTo(p.x, p.y);
      else context.lineTo(p.x, p.y);
    });
    context.closePath();
    context.stroke();
  });

  DIMENSIONS.forEach((dimension, index) => {
    const edge = point(1, index);
    const label = point(1.2, index);
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(edge.x, edge.y);
    context.stroke();
    context.fillStyle = "rgba(255,255,255,0.82)";
    context.font = '700 24px "Microsoft YaHei", sans-serif';
    context.textAlign = label.x < centerX - 12 ? "right" : label.x > centerX + 12 ? "left" : "center";
    context.fillText(labels[dimension].short, label.x, label.y);
  });

  context.beginPath();
  DIMENSIONS.forEach((dimension, index) => {
    const p = point(Math.max(0, Math.min(100, profile[dimension])) / 100, index);
    if (index === 0) context.moveTo(p.x, p.y);
    else context.lineTo(p.x, p.y);
  });
  context.closePath();
  context.fillStyle = `${scene.palette.accent}99`;
  context.strokeStyle = scene.palette.accent;
  context.lineWidth = 5;
  context.shadowColor = scene.palette.glow;
  context.shadowBlur = 24;
  context.fill();
  context.stroke();
  context.restore();
}

export async function generateResultPoster({
  alias,
  copy,
  language,
  profile,
  scene,
  isHidden
}: GenerateResultPosterInput): Promise<Blob> {
  const image = await loadImage(scene.fullAsset);
  const canvas = document.createElement("canvas");
  canvas.width = POSTER_WIDTH;
  canvas.height = POSTER_HEIGHT;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas is not available.");
  }

  drawCover(context, image, 0, 0, POSTER_WIDTH, POSTER_HEIGHT, scene.posterLayout.focusX, scene.posterLayout.focusY);

  const vignette = context.createLinearGradient(0, 0, 0, POSTER_HEIGHT);
  vignette.addColorStop(0, isHidden ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.04)");
  vignette.addColorStop(0.48, "rgba(0,0,0,0.2)");
  vignette.addColorStop(1, scene.posterLayout.shade === "light" ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0.86)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT);

  roundedRect(context, 72, 1084, POSTER_WIDTH - 144, 700, 42);
  context.fillStyle = "rgba(8, 12, 18, 0.82)";
  context.fill();
  context.strokeStyle = `${scene.palette.accent}88`;
  context.lineWidth = 2;
  context.stroke();

  context.fillStyle = scene.palette.accent;
  context.font = '900 30px "Microsoft YaHei", sans-serif';
  context.textAlign = "left";
  context.fillText(isHidden ? (language === "zh" ? "隐藏款解锁" : "Hidden Result Unlocked") : "WHO IS YOUR TEACHER", 108, 1156);

  context.fillStyle = scene.palette.text;
  context.font = '900 92px "Microsoft YaHei", sans-serif';
  context.fillText(copy.name, 108, 1260);

  context.fillStyle = scene.palette.accent;
  context.font = '900 36px "Microsoft YaHei", sans-serif';
  context.fillText(copy.subtitle, 108, 1315);

  context.fillStyle = "rgba(255,255,255,0.88)";
  context.font = '800 34px "Microsoft YaHei", sans-serif';
  drawMultiline(context, copy.oneLiner, 108, 1375, 520, 46, 3);

  drawRadar(context, profile, language, scene, 792, 1360, 138);

  const labels = DIMENSION_LABELS[language];
  context.font = '800 23px "Microsoft YaHei", sans-serif';
  DIMENSIONS.forEach((dimension, index) => {
    const column = index % 4;
    const row = Math.floor(index / 4);
    const x = 108 + column * 210;
    const y = 1510 + row * 92;
    context.fillStyle = "rgba(255,255,255,0.68)";
    context.fillText(labels[dimension].long, x, y);
    context.fillStyle = scene.palette.accent;
    context.font = '900 34px "Microsoft YaHei", sans-serif';
    context.fillText(String(profile[dimension]), x, y + 42);
    context.font = '800 23px "Microsoft YaHei", sans-serif';
  });

  context.fillStyle = "rgba(255,255,255,0.74)";
  context.font = '800 27px "Microsoft YaHei", sans-serif';
  drawMultiline(context, `${alias} ${language === "zh" ? "测出了" : "got"} ${copy.name}`, 108, 1720, 610, 36, 1);

  context.textAlign = "right";
  context.fillStyle = "rgba(255,255,255,0.62)";
  context.font = '800 24px "Microsoft YaHei", sans-serif';
  context.fillText(language === "zh" ? "你老师最像谁？" : "Who Is Your Teacher?", 972, 1732);

  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Unable to export poster."));
    }, "image/png");
  });
}
