import React from 'react';
import { Ruler } from 'lucide-react';
import ResultCard from './ResultCard';

/**
 * MeasurementResult component following spec section 30.
 * Displays deterministic physical measurements, counts, and spatial metrics.
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
      title="Physical Measurements & Metrics"
      icon={Ruler}
      status={effectiveStatus}
      error={error}
      emptyTitle="No measurements available"
      emptyDescription="Execute spatial measurement query on imagery to compute dimensions and areas."
      className={className}
    >
      <div className="space-y-4 text-left">
        {measurements && measurements.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {measurements.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-surface rounded-lg border border-border flex flex-col justify-between gap-1 shadow-2xs"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                  {item.label}
                </span>

                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl font-bold font-mono text-text-primary">
                    {item.value}
                  </span>
                  {item.unit && (
                    <span className="text-xs font-semibold text-text-secondary">
                      {item.unit}
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="text-[11px] text-text-muted mt-1 leading-normal">
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
