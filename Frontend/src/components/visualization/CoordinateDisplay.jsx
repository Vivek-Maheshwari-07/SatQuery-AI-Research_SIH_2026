import React from 'react';
import { Crosshair } from 'lucide-react';

/**
 * CoordinateDisplay readout for ImageViewer inspection.
 * Displays pixel {x, y} coordinates and/or geospatial {lat, lng} on cursor hover.
 *
 * @param {Object} props
 * @param {{ x?: number, y?: number, lat?: number, lng?: number }} [props.coordinates]
 * @param {string} [props.crs] - Optional coordinate reference system (e.g. 'EPSG:4326')
 * @param {string} [props.className='']
 */
export function CoordinateDisplay({ coordinates, crs, className = '' }) {
  if (!coordinates || (coordinates.x === undefined && coordinates.lat === undefined)) {
    return null;
  }

  const hasPixels = coordinates.x !== undefined && coordinates.y !== undefined;
  const hasGeo = coordinates.lat !== undefined && coordinates.lng !== undefined;

  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 bg-slate-900/90 text-white text-[11px] font-mono rounded-md shadow-md backdrop-blur-xs border border-slate-700/60 pointer-events-none select-none ${className}`}
    >
      <Crosshair className="w-3.5 h-3.5 text-primary-soft flex-shrink-0" />

      <div className="flex items-center gap-2">
        {hasPixels && (
          <span>
            X: <strong className="text-slate-100">{Math.round(coordinates.x)}</strong> Y:{' '}
            <strong className="text-slate-100">{Math.round(coordinates.y)}</strong>
          </span>
        )}

        {hasGeo && (
          <span>
            Lat:{' '}
            <strong className="text-slate-100">{coordinates.lat.toFixed(5)}°</strong> Lng:{' '}
            <strong className="text-slate-100">{coordinates.lng.toFixed(5)}°</strong>
          </span>
        )}

        {crs && (
          <span className="text-[10px] text-slate-400 border-l border-slate-700 pl-2">
            {crs}
          </span>
        )}
      </div>
    </div>
  );
}

export default CoordinateDisplay;
