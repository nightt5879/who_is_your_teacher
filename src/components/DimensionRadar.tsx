import { DIMENSION_LABELS } from "../i18n";
import { DIMENSIONS } from "../types";
import type { DimensionScores, ResultSceneConfig, ResultTheme } from "../types";
import type { Language } from "../i18n";

type DimensionRadarProps = {
  profile: DimensionScores;
  language: Language;
  theme: ResultTheme | ResultSceneConfig;
  size?: number;
  animated?: boolean;
};

type RadarPalette = {
  code: string;
  primary: string;
  accent: string;
  surface: string;
  text: string;
};

function polarPoint(center: number, radius: number, index: number, total: number) {
  const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius
  };
}

function pointsToString(points: Array<{ x: number; y: number }>) {
  return points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
}

function getRadarPalette(theme: ResultTheme | ResultSceneConfig): RadarPalette {
  if ("palette" in theme) {
    return {
      code: theme.code,
      primary: theme.palette.primary,
      accent: theme.palette.accent,
      surface: theme.palette.dark,
      text: theme.palette.text
    };
  }

  return {
    code: theme.code,
    primary: theme.colors.primary,
    accent: theme.colors.accent,
    surface: theme.colors.surface,
    text: theme.colors.text
  };
}

export function DimensionRadar({ profile, language, theme, size = 300, animated = false }: DimensionRadarProps) {
  const palette = getRadarPalette(theme);
  const center = size / 2;
  const axisCount = DIMENSIONS.length;
  const radius = size * 0.31;
  const labelRadius = size * 0.43;
  const rings = [0.25, 0.5, 0.75, 1];
  const labels = DIMENSION_LABELS[language];
  const valuePoints = DIMENSIONS.map((dimension, index) =>
    polarPoint(center, radius * Math.max(0, Math.min(100, profile[dimension])) / 100, index, axisCount)
  );

  return (
    <svg
      className={`dimension-radar${animated ? " dimension-radar--animated" : ""}`}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="dimension radar"
    >
      <defs>
        <radialGradient id={`radar-fill-${palette.code}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={palette.accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={palette.primary} stopOpacity="0.58" />
        </radialGradient>
        <filter id={`radar-glow-${palette.code}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {rings.map((ring) => {
        const ringPoints = DIMENSIONS.map((_, index) => polarPoint(center, radius * ring, index, axisCount));
        return (
          <polygon
            key={ring}
            points={pointsToString(ringPoints)}
            className="radar-ring"
            fill="none"
            stroke={palette.text}
            strokeOpacity={ring === 1 ? 0.42 : 0.18}
          />
        );
      })}
      {DIMENSIONS.map((dimension, index) => {
        const outer = polarPoint(center, radius, index, axisCount);
        const label = polarPoint(center, labelRadius, index, axisCount);
        const anchor = label.x < center - 12 ? "end" : label.x > center + 12 ? "start" : "middle";

        return (
          <g key={dimension}>
            <line
              x1={center}
              y1={center}
              x2={outer.x}
              y2={outer.y}
              stroke={palette.text}
              strokeOpacity="0.2"
              strokeWidth="1"
              className="radar-axis"
            />
            <text
              x={label.x}
              y={label.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill={palette.text}
              className="radar-label"
            >
              {labels[dimension].short}
            </text>
            <text
              x={label.x}
              y={label.y + 13}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill={palette.text}
              className="radar-value"
            >
              {profile[dimension]}
            </text>
          </g>
        );
      })}
      <polygon
        points={pointsToString(valuePoints)}
        className="radar-value-shape"
        fill={`url(#radar-fill-${palette.code})`}
        stroke={palette.accent}
        strokeWidth="3"
        filter={`url(#radar-glow-${palette.code})`}
        pathLength={1}
      />
      {valuePoints.map((point, index) => (
        <circle
          key={DIMENSIONS[index]}
          className="radar-dot"
          cx={point.x}
          cy={point.y}
          r="4"
          fill={palette.accent}
          stroke={palette.surface}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
