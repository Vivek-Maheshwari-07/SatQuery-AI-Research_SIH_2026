import React from 'react';

/**
 * ReportSection component following spec section 34.
 * Standardizes titled visual sections within exported analytical reports.
 *
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {React.ComponentType<{ className?: string }>} [props.icon] - Optional Lucide icon
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 */
export function ReportSection({
  title,
  icon: Icon,
  children,
  className = '',
}) {
  return (
    <div
      className={`p-5 bg-white rounded-xl border border-border shadow-xs text-left break-inside-avoid space-y-3 ${className}`}
    >
      <div className="flex items-center gap-2 pb-2.5 border-b border-border">
        {Icon && <Icon className="w-4 h-4 text-primary flex-shrink-0" />}
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
          {title}
        </h3>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

export default ReportSection;
