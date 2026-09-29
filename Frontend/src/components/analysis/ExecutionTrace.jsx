import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Loader2,
  MinusCircle,
  Workflow,
  Clock,
} from 'lucide-react';
import Badge from '../ui/Badge';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import ErrorState from '../ui/ErrorState';

/**
 * Returns the status icon component and color classes for an execution step.
 * @param {'success' | 'error' | 'pending' | 'skipped'} status
 */
function getStepStatusConfig(status) {
  switch (status) {
    case 'success':
      return {
        icon: CheckCircle2,
        iconClass: 'text-success bg-green-50 border-green-200',
        lineClass: 'bg-success/40',
        badgeVariant: 'success',
      };
    case 'error':
      return {
        icon: XCircle,
        iconClass: 'text-danger bg-red-50 border-red-200',
        lineClass: 'bg-danger/40',
        badgeVariant: 'danger',
      };
    case 'pending':
      return {
        icon: Loader2,
        iconClass: 'text-primary bg-primary-soft border-blue-200 animate-spin',
        lineClass: 'bg-primary/40',
        badgeVariant: 'primary',
      };
    case 'skipped':
    default:
      return {
        icon: MinusCircle,
        iconClass: 'text-text-muted bg-slate-100 border-slate-200',
        lineClass: 'bg-slate-200',
        badgeVariant: 'neutral',
      };
  }
}

/**
 * ExecutionTrace component following spec section 33.
 * Renders the agent execution pipeline timeline from real deterministic step telemetry.
 *
 * Expected Props / Data Contract:
 * @param {Object} props
 * @param {Array<{ layer?: string, name: string, status: 'success' | 'error' | 'pending' | 'skipped', detail?: string }>} [props.steps] - Chronological pipeline execution steps
 * @param {'loading' | 'success' | 'empty' | 'error'} [props.status] - Overall trace status
 * @param {string | object} [props.error] - Pipeline error details
 * @param {string} [props.className='']
 */
export function ExecutionTrace({
  steps,
  status,
  error,
  className = '',
}) {
  const hasSteps = Boolean(steps && Array.isArray(steps) && steps.length > 0);
  const effectiveStatus = status || (hasSteps ? 'success' : 'empty');

  // 1. Loading State
  if (effectiveStatus === 'loading') {
    return (
      <div className={`p-5 bg-surface rounded-xl border border-border space-y-4 ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width="35%" height={18} />
        </div>
        <div className="space-y-4 pl-4 border-l-2 border-border/60">
          <div className="space-y-2">
            <Skeleton variant="text" width="50%" height={14} />
            <Skeleton variant="text" width="80%" height={12} />
          </div>
          <div className="space-y-2">
            <Skeleton variant="text" width="45%" height={14} />
            <Skeleton variant="text" width="70%" height={12} />
          </div>
          <div className="space-y-2">
            <Skeleton variant="text" width="60%" height={14} />
            <Skeleton variant="text" width="65%" height={12} />
          </div>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (effectiveStatus === 'error') {
    return (
      <div className={`rounded-xl border border-red-200 overflow-hidden ${className}`}>
        <ErrorState
          title="Pipeline Trace Unavailable"
          message={error || 'An error interrupted agent pipeline execution.'}
          className="p-6 bg-red-50/30"
        />
      </div>
    );
  }

  // 3. Empty State
  if (effectiveStatus === 'empty') {
    return (
      <div className={`rounded-xl border border-border overflow-hidden ${className}`}>
        <EmptyState
          icon={Clock}
          title="No execution trace available"
          description="Pipeline execution telemetry will be visualized as steps process."
          className="p-6 bg-surface/40"
        />
      </div>
    );
  }

  // 4. Success State: Vertical Timeline
  return (
    <div
      className={`p-5 bg-surface rounded-xl border-2 border-border text-left shadow-2xs ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-5 pb-3 border-b border-border">
        <div className="flex items-center gap-2 font-semibold text-sm text-text-primary">
          <Workflow className="w-4 h-4 text-primary flex-shrink-0" />
          <span>Agent Execution Trace</span>
        </div>
        <span className="text-[11px] font-mono text-text-muted">
          {steps.length} {steps.length === 1 ? 'stage' : 'stages'}
        </span>
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 space-y-6">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          const config = getStepStatusConfig(step.status);
          const Icon = config.icon;

          return (
            <div key={idx} className="relative group">
              {/* Connecting vertical line */}
              {!isLast && (
                <div
                  className={`absolute left-[-17px] top-6 bottom-[-24px] w-0.5 ${config.lineClass}`}
                />
              )}

              {/* Status node icon */}
              <div
                className={`absolute left-[-26px] top-0.5 w-5 h-5 rounded-full border flex items-center justify-center shadow-2xs ${config.iconClass}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Step Content */}
              <div className="flex flex-col gap-1 bg-white p-3 rounded-lg border border-border shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {step.layer && (
                      <span className="text-[10px] font-mono font-semibold uppercase text-text-muted tracking-wider">
                        [{step.layer}]
                      </span>
                    )}
                    <span className="text-xs font-semibold text-text-primary">
                      {step.name}
                    </span>
                  </div>

                  <Badge variant={config.badgeVariant} size="sm">
                    {step.status}
                  </Badge>
                </div>

                {step.detail && (
                  <p className="text-[11px] text-text-secondary leading-relaxed font-mono mt-0.5">
                    {step.detail}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExecutionTrace;
