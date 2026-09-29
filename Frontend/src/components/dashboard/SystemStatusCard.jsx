import React from 'react';
import { Activity, RefreshCw, Cpu } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Skeleton from '../ui/Skeleton';
import ErrorState from '../ui/ErrorState';

/**
 * Maps system status string to friendly Badge variant.
 * @param {'ok' | 'degraded' | 'down' | string} status
 */
function getHealthBadgeConfig(status) {
  switch (status) {
    case 'ok':
    case 'ready':
      return { variant: 'success', label: 'Operational' };
    case 'degraded':
      return { variant: 'warning', label: 'Degraded' };
    case 'down':
    case 'unavailable':
      return { variant: 'danger', label: 'Offline' };
    default:
      return { variant: 'neutral', label: status || 'Unknown' };
  }
}

/**
 * SystemStatusCard component following spec section 17.
 * Visualizes model serving pipelines and server health indicators.
 *
 * @param {Object} props
 * @param {Object|null} props.data - Health telemetry payload
 * @param {boolean} [props.loading=false]
 * @param {string|null} [props.error=null]
 * @param {() => void} [props.onRetry]
 * @param {string} [props.className='']
 */
export function SystemStatusCard({
  data,
  loading = false,
  error = null,
  onRetry,
  className = '',
}) {
  if (error) {
    return (
      <Card variant="default" padding="none" className={`overflow-hidden ${className}`}>
        <div className="flex items-center justify-between p-4 border-b border-border bg-slate-50 text-left">
          <div className="flex items-center gap-2 font-semibold text-sm text-text-primary">
            <Activity className="w-4 h-4 text-primary" />
            <span>Inference System Health</span>
          </div>
        </div>
        <ErrorState
          title="Health Check Failed"
          message={error}
          onRetry={onRetry}
          retryLabel="Check Again"
          className="border-0 rounded-none bg-transparent"
        />
      </Card>
    );
  }

  if (loading) {
    return (
      <Card variant="default" padding="md" className={`space-y-4 text-left ${className}`}>
        <div className="flex items-center justify-between border-b border-border pb-3">
          <Skeleton variant="text" width="40%" height={18} />
          <Skeleton variant="text" width="20%" height={18} />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((idx) => (
            <div key={idx} className="flex items-center justify-between py-2">
              <Skeleton variant="text" width="60%" height={14} />
              <Skeleton variant="text" width="20%" height={14} />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const overall = getHealthBadgeConfig(data?.status || 'ok');
  const models = Array.isArray(data?.models) ? data.models : [];

  return (
    <Card variant="default" padding="md" className={`space-y-4 text-left ${className}`}>
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-text-primary">
            Inference System Health
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={overall.variant} size="sm" dot>
            {overall.label}
          </Badge>
          {onRetry && (
            <Button
              variant="ghost"
              size="sm"
              icon={RefreshCw}
              ariaLabel="Refresh Status"
              onClick={onRetry}
              className="p-1 h-7 w-7 text-text-muted hover:text-text-primary"
            />
          )}
        </div>
      </div>

      {/* Model Pipelines List */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
          Model Readiness
        </span>

        {models.length > 0 ? (
          <div className="divide-y divide-border rounded-lg border border-border overflow-hidden bg-surface">
            {models.map((m, idx) => {
              const modelStatus = getHealthBadgeConfig(m.status);
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-white text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <Cpu className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                    <span className="font-medium text-text-primary truncate">
                      {m.name}
                    </span>
                  </div>
                  <Badge variant={modelStatus.variant} size="sm">
                    {m.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-text-muted py-2">
            All vision-language and spatial models operational.
          </p>
        )}
      </div>
    </Card>
  );
}

export default SystemStatusCard;
