import React, { useState } from 'react';
import { Columns2, Layers } from 'lucide-react';
import ImageViewer from './ImageViewer';
import Button from '../ui/Button';

/**
 * MapViewer component following spec section 28 & 29.
 * Provides lightweight multi-raster inspection (side-by-side or blend overlay)
 * without external heavy GIS map dependencies.
 *
 * @param {Object} props
 * @param {Array<{ src: string, label?: string, alt?: string, overlays?: React.ReactNode }>} props.images - Array of imagery objects
 * @param {'side-by-side' | 'overlay'} [props.layout='side-by-side']
 * @param {string} [props.className='']
 */
export function MapViewer({
  images = [],
  layout = 'side-by-side',
  className = '',
}) {
  const [activeLayout, setActiveLayout] = useState(layout);
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);

  if (!images || !Array.isArray(images) || images.length === 0) {
    return null;
  }

  const primaryImage = images[0];
  const secondaryImage = images.length > 1 ? images[1] : null;

  return (
    <div className={`w-full flex flex-col gap-3 ${className}`}>
      {/* Viewer View Mode Toolbar */}
      {secondaryImage && (
        <div className="flex items-center justify-between px-3 py-2 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Button
              variant={activeLayout === 'side-by-side' ? 'primary' : 'ghost'}
              size="sm"
              icon={Columns2}
              onClick={() => setActiveLayout('side-by-side')}
              className={activeLayout === 'ghost' ? 'text-slate-300 hover:text-white' : ''}
            >
              Side-by-Side
            </Button>
            <Button
              variant={activeLayout === 'overlay' ? 'primary' : 'ghost'}
              size="sm"
              icon={Layers}
              onClick={() => setActiveLayout('overlay')}
              className={activeLayout === 'ghost' ? 'text-slate-300 hover:text-white' : ''}
            >
              Swipe / Blend
            </Button>
          </div>

          {activeLayout === 'overlay' && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">
                {secondaryImage.label || 'Overlay'} Opacity:
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                className="w-24 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="font-mono text-[10px] w-8">
                {Math.round(overlayOpacity * 100)}%
              </span>
            </div>
          )}
        </div>
      )}

      {/* Viewport Rendering */}
      {activeLayout === 'side-by-side' && secondaryImage ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primary View */}
          <div className="flex flex-col gap-1.5 text-left">
            {primaryImage.label && (
              <div className="flex items-center justify-between text-xs font-semibold text-text-primary px-1">
                <span>{primaryImage.label}</span>
              </div>
            )}
            <ImageViewer
              src={primaryImage.src}
              alt={primaryImage.alt || primaryImage.label}
            >
              {primaryImage.overlays}
            </ImageViewer>
          </div>

          {/* Secondary View */}
          <div className="flex flex-col gap-1.5 text-left">
            {secondaryImage.label && (
              <div className="flex items-center justify-between text-xs font-semibold text-text-primary px-1">
                <span>{secondaryImage.label}</span>
              </div>
            )}
            <ImageViewer
              src={secondaryImage.src}
              alt={secondaryImage.alt || secondaryImage.label}
            >
              {secondaryImage.overlays}
            </ImageViewer>
          </div>
        </div>
      ) : (
        /* Overlay / Blend View */
        <ImageViewer
          src={primaryImage.src}
          alt={primaryImage.alt || primaryImage.label}
        >
          {primaryImage.overlays}
          {secondaryImage && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-150"
              style={{ opacity: overlayOpacity }}
            >
              <img
                src={secondaryImage.src}
                alt={secondaryImage.alt || secondaryImage.label}
                className="w-full h-full object-contain"
              />
              {secondaryImage.overlays}
            </div>
          )}
        </ImageViewer>
      )}
    </div>
  );
}

export default MapViewer;
