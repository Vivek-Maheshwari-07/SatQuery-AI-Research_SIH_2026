import React, { useEffect, useRef } from 'react';

/**
 * ChangeOverlay component following spec section 28.
 * Renders bi-temporal change detection masks with a distinct high-contrast highlight color from theme tokens.
 *
 * @param {Object} props
 * @param {string | ImageData} props.changeMask - Base64 PNG string, image URL, or ImageData
 * @param {string} [props.color='var(--color-overlay-change, #DC2626)'] - Distinct highlight color for changed regions
 * @param {number} [props.opacity=0.55] - Overlay opacity (0 to 1)
 * @param {string} [props.className='']
 */
export function ChangeOverlay({
  changeMask,
  color = 'var(--color-overlay-change, #DC2626)',
  opacity = 0.55,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!changeMask || !(changeMask instanceof ImageData) || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.width = changeMask.width;
    canvas.height = changeMask.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.putImageData(changeMask, 0, 0);
    }
  }, [changeMask]);

  if (!changeMask) {
    return null;
  }

  const isImageData = typeof ImageData !== 'undefined' && changeMask instanceof ImageData;

  return (
    <div
      className={`absolute inset-0 pointer-events-none mix-blend-screen ${className}`}
      style={{ opacity }}
    >
      {isImageData ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
        />
      ) : (
        <img
          src={
            typeof changeMask === 'string' &&
            !changeMask.startsWith('data:') &&
            !changeMask.startsWith('http') &&
            !changeMask.startsWith('/')
              ? `data:image/png;base64,${changeMask}`
              : changeMask
          }
          alt="Change Detection Mask"
          className="w-full h-full object-contain"
          style={color ? { filter: `drop-shadow(0px 0px 1px ${color})` } : undefined}
        />
      )}
    </div>
  );
}

export default ChangeOverlay;
