import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';
import IconButton from '../ui/IconButton';
import CoordinateDisplay from './CoordinateDisplay';

/**
 * ImageViewer base component following spec section 25-29.
 * Provides pan-and-zoom inspection canvas supporting layered overlay children.
 *
 * @param {Object} props
 * @param {string} props.src - Image URL or data source
 * @param {string} [props.alt='Satellite raster imagery']
 * @param {React.ReactNode} [props.children] - Overlay layers (BoundingBox, Segmentation, etc.)
 * @param {number} [props.initialZoom=1]
 * @param {number} [props.minZoom=0.5]
 * @param {number} [props.maxZoom=10]
 * @param {(coords: { x: number, y: number } | null) => void} [props.onCoordinateHover]
 * @param {string} [props.className='']
 */
export function ImageViewer({
  src,
  alt = 'Satellite raster imagery',
  children,
  initialZoom = 1,
  minZoom = 0.5,
  maxZoom = 10,
  onCoordinateHover,
  className = '',
}) {
  const [zoom, setZoom] = useState(initialZoom);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cursorCoords, setCursorCoords] = useState(null);

  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // Reset viewport state
  const resetTransform = useCallback(() => {
    setZoom(initialZoom);
    setPan({ x: 0, y: 0 });
  }, [initialZoom]);

  const zoomIn = () => {
    setZoom((prev) => Math.min(maxZoom, Number((prev * 1.25).toFixed(2))));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(minZoom, Number((prev / 1.25).toFixed(2))));
  };

  // Wheel zoom handler
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
    setZoom((prev) => {
      const next = prev * zoomFactor;
      return Math.min(maxZoom, Math.max(minZoom, Number(next.toFixed(2))));
    });
  };

  // Pan interaction handlers
  const handleMouseDown = (e) => {
    // Only drag on primary left click
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }

    // Calculate pixel coordinates relative to the natural image
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width;
      const relativeY = (e.clientY - rect.top) / rect.height;

      if (relativeX >= 0 && relativeX <= 1 && relativeY >= 0 && relativeY <= 1) {
        const naturalWidth = imageRef.current.naturalWidth || rect.width;
        const naturalHeight = imageRef.current.naturalHeight || rect.height;
        const coords = {
          x: relativeX * naturalWidth,
          y: relativeY * naturalHeight,
        };
        setCursorCoords(coords);
        onCoordinateHover?.(coords);
      } else {
        setCursorCoords(null);
        onCoordinateHover?.(null);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setCursorCoords(null);
    onCoordinateHover?.(null);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventDefaultWheel = (e) => e.preventDefault();
    container.addEventListener('wheel', preventDefaultWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', preventDefaultWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      className={`relative w-full h-full min-h-[360px] bg-slate-950 rounded-xl overflow-hidden select-none border border-slate-800 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
    >
      {/* Zoom / Pan Transformed Viewport */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      >
        <div className="relative inline-block max-w-full max-h-full">
          {src ? (
            <img
              ref={imageRef}
              src={src}
              alt={alt}
              draggable={false}
              className="max-w-full max-h-[70vh] object-contain pointer-events-none block"
            />
          ) : (
            <div className="w-96 h-64 bg-slate-900 flex items-center justify-center text-slate-500 text-xs">
              No imagery loaded
            </div>
          )}

          {/* Layered overlays container: exactly aligned with image dimensions */}
          {children && (
            <div className="absolute inset-0 pointer-events-auto">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Floating Toolbar Controls */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-700/80 shadow-md backdrop-blur-xs">
        <IconButton
          icon={ZoomIn}
          size="sm"
          variant="ghost"
          ariaLabel="Zoom In"
          onClick={zoomIn}
          className="text-slate-200 hover:text-white hover:bg-slate-800"
        />
        <IconButton
          icon={ZoomOut}
          size="sm"
          variant="ghost"
          ariaLabel="Zoom Out"
          onClick={zoomOut}
          className="text-slate-200 hover:text-white hover:bg-slate-800"
        />
        <IconButton
          icon={RotateCcw}
          size="sm"
          variant="ghost"
          ariaLabel="Reset View"
          onClick={resetTransform}
          className="text-slate-200 hover:text-white hover:bg-slate-800"
        />
        <div className="px-2 py-0.5 text-[11px] font-mono font-medium text-slate-300 border-l border-slate-700">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Floating Status / Mode Hint */}
      <div className="absolute top-3 left-3 z-30 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/80 text-slate-300 text-[11px] rounded-md border border-slate-800 backdrop-blur-xs">
          <Move className="w-3 h-3 text-slate-400" />
          <span>Drag to pan · Scroll to zoom</span>
        </div>
      </div>

      {/* Coordinate Readout */}
      {cursorCoords && (
        <div className="absolute bottom-3 right-3 z-30 pointer-events-none">
          <CoordinateDisplay coordinates={cursorCoords} />
        </div>
      )}
    </div>
  );
}

export default ImageViewer;
