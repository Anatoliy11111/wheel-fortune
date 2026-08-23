import { useCallback, useMemo, useRef, useState } from 'react';
import type { WheelSegment } from '../types';

interface FortuneWheelProps {
  segments: WheelSegment[];
  onSpinComplete: (segment: WheelSegment) => void;
  disabled?: boolean;
}

interface SegmentLayout {
  segment: WheelSegment;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  sliceAngle: number;
}

const WHEEL_SIZE = 340;
const CENTER = WHEEL_SIZE / 2;
const RADIUS = CENTER - 10;
const LABEL_RADIUS = RADIUS * 0.72;
const ANGLE_PADDING = 3;

function buildLayout(segments: WheelSegment[]): SegmentLayout[] {
  const totalWeight = segments.reduce((sum, s) => sum + (s.weight ?? 1), 0);
  let currentAngle = 0;

  return segments.map((segment) => {
    const sliceAngle = ((segment.weight ?? 1) / totalWeight) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    const midAngle = startAngle + sliceAngle / 2;
    currentAngle = endAngle;

    return { segment, startAngle, endAngle, midAngle, sliceAngle };
  });
}

function polarToCartesian(angleDeg: number, radius: number): { x: number; y: number } {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  };
}

function describeArc(startAngle: number, endAngle: number, radius = RADIUS): string {
  const start = polarToCartesian(startAngle, radius);
  const end = polarToCartesian(endAngle, radius);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${CENTER} ${CENTER}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
}

function describeTextArc(startAngle: number, endAngle: number, radius: number): string {
  const start = polarToCartesian(startAngle, radius);
  const end = polarToCartesian(endAngle, radius);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

function arcLength(sliceAngle: number, radius: number): number {
  return ((sliceAngle - ANGLE_PADDING * 2) * Math.PI / 180) * radius;
}

function textWidth(label: string, fontSize: number): number {
  return label.length * fontSize * 0.58;
}

function fitLabel(label: string, sliceAngle: number, radius: number): { lines: string[]; fontSize: number } {
  const available = arcLength(sliceAngle, radius);
  const minFont = 7;
  const maxFont = 12;

  for (let fontSize = maxFont; fontSize >= minFont; fontSize--) {
    if (textWidth(label, fontSize) <= available) {
      return { lines: [label], fontSize };
    }
  }

  const words = label.split(/\s+/);
  if (words.length >= 2) {
    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid).join(' ');
    const line2 = words.slice(mid).join(' ');
    const longest = Math.max(line1.length, line2.length);

    for (let fontSize = maxFont; fontSize >= minFont; fontSize--) {
      if (textWidth(String(longest), fontSize) <= available) {
        return { lines: [line1, line2], fontSize };
      }
    }
  }

  const fontSize = minFont;
  const maxChars = Math.max(1, Math.floor(available / (fontSize * 0.58)));
  const truncated =
    label.length > maxChars ? `${label.slice(0, Math.max(1, maxChars - 1))}…` : label;

  return { lines: [truncated], fontSize };
}

function SegmentLabel({
  segment,
  startAngle,
  endAngle,
  sliceAngle,
}: {
  segment: WheelSegment;
  startAngle: number;
  endAngle: number;
  sliceAngle: number;
}) {
  const textStart = startAngle + ANGLE_PADDING;
  const textEnd = endAngle - ANGLE_PADDING;
  const { lines, fontSize } = fitLabel(segment.label, sliceAngle, LABEL_RADIUS);
  const lineOffset = fontSize * 0.85;

  return (
    <>
      {lines.map((line, index) => {
        const radius =
          lines.length === 1
            ? LABEL_RADIUS
            : LABEL_RADIUS - lineOffset / 2 + index * lineOffset;
        const pathId = `arc-${segment.id}-${index}`;

        return (
          <g key={pathId}>
            <path id={pathId} d={describeTextArc(textStart, textEnd, radius)} fill="none" />
            <text
              fill="#4a2040"
              fontSize={fontSize}
              fontWeight="600"
              className="wheel-label"
            >
              <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
                {line}
              </textPath>
            </text>
          </g>
        );
      })}
    </>
  );
}

export function FortuneWheel({ segments, onSpinComplete, disabled }: FortuneWheelProps) {
  const layout = useMemo(() => buildLayout(segments), [segments]);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef<SVGGElement>(null);

  const spin = useCallback(() => {
    if (spinning || disabled) return;

    const totalWeight = segments.reduce((sum, s) => sum + (s.weight ?? 1), 0);
    let random = Math.random() * totalWeight;
    let winner = segments[segments.length - 1];

    for (const segment of segments) {
      random -= segment.weight ?? 1;
      if (random <= 0) {
        winner = segment;
        break;
      }
    }

    const winnerLayout = layout.find((l) => l.segment.id === winner.id)!;
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const targetRotation = extraSpins * 360 + (360 - winnerLayout.midAngle);

    setSpinning(true);
    setRotation((prev) => {
      const normalized = prev % 360;
      return prev - normalized + targetRotation;
    });

    setTimeout(() => {
      setSpinning(false);
      onSpinComplete(winner);
    }, 4500);
  }, [spinning, disabled, segments, layout, onSpinComplete]);

  return (
    <div className="wheel-container">
      <div className="wheel-pointer" aria-hidden="true" />
      <svg
        className="wheel-svg"
        viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
        width={WHEEL_SIZE}
        height={WHEEL_SIZE}
        aria-label="Колесо фортуны"
      >
        <g
          ref={wheelRef}
          className="wheel-rotating"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: `${CENTER}px ${CENTER}px`,
            transition: spinning
              ? 'transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
              : 'none',
          }}
        >
          {layout.map(({ segment, startAngle, endAngle, sliceAngle }) => (
            <g key={segment.id}>
              <path
                d={describeArc(startAngle, endAngle)}
                fill={segment.color}
                stroke="#fff"
                strokeWidth="2"
              />
              <SegmentLabel
                segment={segment}
                startAngle={startAngle}
                endAngle={endAngle}
                sliceAngle={sliceAngle}
              />
            </g>
          ))}
          <circle cx={CENTER} cy={CENTER} r="30" fill="#fff" stroke="#e8a4c4" strokeWidth="3" />
          <circle cx={CENTER} cy={CENTER} r="9" fill="#d484a8" />
        </g>
      </svg>

      <button
        className="spin-button"
        onClick={spin}
        disabled={spinning || disabled}
        type="button"
      >
        {spinning ? 'Крутится…' : 'Крутить!'}
      </button>
    </div>
  );
}
