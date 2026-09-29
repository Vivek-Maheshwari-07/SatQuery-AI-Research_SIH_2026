import React, { useState } from 'react';

/**
 * BoundingBoxOverlay component following spec sections 25 & 26.
 * Renders normalized bounding box coordinates (0-1) with labels and confidence tags.
 *
 * @param {Object} props
 * @param {Array<{ x1: number, y1: number, x2: number, y2: number, label?: string, confidence?: number }>} props.boxes
 * @param {(box: object | null, index?: number) => void} [props.onBoxHover]
 * @param {string} [props.color='var(--color-overlay-detection, #155EEF)']
 * @param {string} [props.className='']
 */
export function BoundingBoxOverlay({
  boxes,
  onBoxHover,
  color = 'var(--color-overlay-detection, #155EEF)',
  className = '',
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!boxes || !Array.isArray(boxes) || boxes.length === 0) {
    return null;
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {boxes.map((box, idx) => {
        const { x1, y1, x2, y2, label, confidence } = box;

        // Ensure proper bounding box coordinates normalized 0-1
        const left = Math.min(Math.max(0, x1), 1) * 100;
        const top = Math.min(Math.max(0, y1), 1) * 100;
        const right = Math.min(Math.max(0, x2), 1) * 100;
        const bottom = Math.min(Math.max(0, y2), 1) * 100;

        const width = Math.max(0, right - left);
        const height = Math.max(0, bottom - top);

        const isHovered = hoveredIdx === idx;
        const formattedConfidence =
          confidence !== undefined && confidence !== null
            ? typeof confidence === 'number'
              ? `${Math.round(confidence <= 1 ? confidence * 100 : confidence)}%`
              : `${confidence}`
            : null;

        return (
          <div
            key={idx}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}%`,
              height: `${height}%`,
              borderColor: color,
            }}
            onMouseEnter={() => {
              setHoveredIdx(idx);
              onBoxHover?.(box, idx);
            }}
            onMouseLeave={() => {
              setHoveredIdx(null);
              onBoxHover?.(null);
            }}
            className={`absolute border-2 pointer-events-auto transition-all duration-150 cursor-pointer ${
              isHovered
                ? 'ring-4 ring-primary/30 bg-primary/10 z-20'
                : 'bg-primary/5 hover:bg-primary/10 z-10'
            }`}
          >
            {/* Label and Confidence Tag */}
            {(label || formattedConfidence) && (
              <div
                style={{ backgroundColor: color }}
                className="absolute -top-6 left-0 flex items-center gap-1.5 px-2 py-0.5 text-white text-[11px] font-semibold rounded-t shadow-xs whitespace-nowrap z-30 select-none"
              >
                {label && <span>{label}</span>}
                {formattedConfidence && (
                  <span className="opacity-90 font-mono text-[10px]">
                    {formattedConfidence}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default BoundingBoxOverlay;
