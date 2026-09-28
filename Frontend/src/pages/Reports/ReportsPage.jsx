import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import EmptyState from '../../components/ui/EmptyState';
import ReportPreview from '../../components/reports/ReportPreview';
import ReportActions from '../../components/reports/ReportActions';
import { useAppContext } from '../../context/useAppContext';

/**
 * ReportsPage following spec section 34.
 * Formats full analysis output into an exportable, printable intelligence report.
 */
export function ReportsPage() {
  const navigate = useNavigate();
  const { latestAnalysis } = useAppContext();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    if (!latestAnalysis) return;

    // Sanitize export payload (no binary File objects or blob URLs)
    const exportData = {
      sessionId: latestAnalysis.sessionId || 'satquery-export',
      intent: latestAnalysis.intent,
      inputConfiguration: latestAnalysis.inputConfiguration,
      query: latestAnalysis.query,
      confidence: latestAnalysis.confidence,
      confidenceNote: latestAnalysis.confidenceNote,
      evidence: latestAnalysis.evidence || [],
      measurements: latestAnalysis.measurements || [],
      trace: latestAnalysis.trace || [],
      timestamp: latestAnalysis.timestamp || new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `satquery-report-${exportData.sessionId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Analysis Report"
        subtitle="Complete synthesized geospatial intelligence dossier with printable layout"
        className="no-print"
      />

      {latestAnalysis ? (
        <div className="space-y-6">
          <ReportActions
            onPrint={handlePrint}
            onDownloadJson={handleDownloadJson}
          />
          <ReportPreview analysis={latestAnalysis} />
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title="No report available"
          description="Execute an analysis on the Analyze page to generate and export an intelligence report."
          action={{
            label: 'Go to Analyze Page',
            onClick: () => navigate('/analyze'),
            variant: 'primary',
          }}
          className="my-8"
        />
      )}
    </PageContainer>
  );
}

export default ReportsPage;
