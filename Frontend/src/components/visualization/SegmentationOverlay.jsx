import React, { useEffect, useRef } from 'react';

/**
 * SegmentationOverlay component following spec section 27.
 * Renders semantic segmentation mask overlays from base64 PNG data, URL, or ImageData.
 *
 * @param {Object} props
 * @param {string | ImageData} props.mask - Base64 PNG string, image URL, or ImageData
 * @param {string} [props.color='#155EEF'] - Mask tint color
 * @param {number} [props.opacity=0.4] - Mask opacity (0 to 1)
 * @param {string} [props.className='']
 */
export function SegmentationOverlay({
  mask,
  color = '#155EEF',
  opacity = 0.4,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!mask || !(mask instanceof ImageData) || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.width = mask.width;
    canvas.height = mask.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.putImageData(mask, 0, 0);
    }
  }, [mask]);

  if (!mask) {
    return null;
  }

  const isImageData = typeof ImageData !== 'undefined' && mask instanceof ImageData;

  return (
    <div
      className={`absolute inset-0 pointer-events-none mix-blend-multiply ${className}`}
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
            typeof mask === 'string' && !mask.startsWith('data:') && !mask.startsWith('http') && !mask.startsWith('/')
              ? `data:image/png;base64,${mask}`
              : mask
          }
          alt="Segmentation Mask"
          className="w-full h-full object-contain"
          style={color ? { filter: `drop-shadow(0px 0px 0px ${color})` } : undefined}
        />
      )}
    </div>
  );
}

export default SegmentationOverlay;
