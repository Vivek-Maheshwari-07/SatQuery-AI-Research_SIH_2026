import React from 'react';
import { Printer, Download } from 'lucide-react';
import Button from '../ui/Button';

/**
 * ReportActions component following spec section 34.
 * Controls document exporting and formatted printing.
 *
 * @param {Object} props
 * @param {() => void} props.onPrint - Print/Save PDF callback
 * @param {() => void} props.onDownloadJson - JSON export callback
 * @param {string} [props.className='']
 */
export function ReportActions({
  onPrint,
  onDownloadJson,
  className = '',
}) {
  return (
    <div
      className={`no-print flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-xl border border-border shadow-xs ${className}`}
    >
      <div className="text-xs text-text-secondary text-left">
        <span className="font-semibold text-text-primary">Export Options:</span>{' '}
        Generate clean printable PDF summaries or export raw telemetry JSON.
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onClick={onDownloadJson}
        >
          Download JSON
        </Button>

        <Button
          variant="primary"
          size="sm"
          icon={Printer}
          onClick={onPrint}
          className="shadow-xs"
        >
          Print / Save as PDF
        </Button>
      </div>
    </div>
  );
}

export default ReportActions;
