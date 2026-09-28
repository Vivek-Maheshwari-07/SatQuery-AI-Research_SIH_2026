import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import EmptyState from '../../components/ui/EmptyState';
import AnalysisOutput from '../../components/analysis/AnalysisOutput';
import AnalysisActions from '../../components/analysis/AnalysisActions';
import { useAppContext } from '../../context/useAppContext';

/**
 * ResultsPage following spec sections 23-33 and 54.
 * Reads the latest executed analysis from global context and renders
 * the unified AnalysisOutput and navigation actions.
 */
export function ResultsPage() {
  const navigate = useNavigate();
  const { latestAnalysis, clearLatestAnalysis } = useAppContext();

  const handleNewAnalysis = () => {
    clearLatestAnalysis();
    navigate('/analyze');
  };

  const handleViewReport = () => {
    navigate('/reports');
  };

  return (
    <PageContainer>
      <PageHeader
        title="Analysis Results"
        subtitle="Detailed vision-language inference, localization overlays, and telemetry records"
      />

      {latestAnalysis ? (
        <div className="space-y-6">
          <AnalysisOutput analysis={latestAnalysis} />
          <AnalysisActions
            onNewAnalysis={handleNewAnalysis}
            onViewReport={handleViewReport}
          />
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No analysis results available"
          description="Upload satellite imagery and execute a query on the Analyze page to inspect results."
          action={{
            label: 'Start New Analysis',
            onClick: () => navigate('/analyze'),
            variant: 'primary',
          }}
          className="my-8"
        />
      )}
    </PageContainer>
  );
}

export default ResultsPage;
