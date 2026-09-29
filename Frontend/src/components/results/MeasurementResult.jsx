import React from 'react';
import { Ruler } from 'lucide-react';
import ResultCard from './ResultCard';

/**
 * MeasurementResult component following spec section 30.
 * Displays deterministic physical measurements, counts, and spatial metrics in neo-brutalist tiles.
 *
 * Expected Props / Data Contract:
 * @param {Object} props
 * @param {Array<{ label: string, value: string | number, unit?: string, description?: string }>} [props.measurements] - Array of exact metrics computed by the backend
 * @param {'loading' | 'success' | 'empty' | 'error'} [props.status] - Data status
 * @param {string | object} [props.error] - Error details when status is 'error'
 * @param {string} [props.className='']
 */
export function MeasurementResult({
  measurements,
  status,
  error,
  className = '',
}) {
  const hasData = Boolean(
    measurements && Array.isArray(measurements) && measurements.length > 0
  );
  const effectiveStatus = status || (hasData ? 'success' : 'empty');

  return (
    <ResultCard
      title="Physical Measurements & Spatial Metrics"
      icon={Ruler}
      status={effectiveStatus}
      error={error}
      emptyTitle="No measurements available"
      emptyDescription="Execute spatial measurement query on imagery to compute dimensions and areas."
      className={className}
    >
      <div className="space-y-4 text-left">
        {measurements && measurements.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {measurements.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-white rounded-xl border border-ink shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex flex-col justify-between gap-1.5 text-left"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  {item.label}
                </span>

                <div className="flex items-baseline gap-1.5 my-0.5">
                  <span className="text-2xl font-semibold font-mono text-text-primary tracking-tight">
                    {item.value}
                  </span>
                  {item.unit && (
                    <span className="text-xs font-semibold text-text-secondary">
                      {item.unit}
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ResultCard>
  );
}

export default MeasurementResult;
