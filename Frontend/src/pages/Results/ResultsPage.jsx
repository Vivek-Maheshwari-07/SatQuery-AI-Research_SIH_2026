import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';

export function ResultsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Results"
        subtitle="Detailed analysis outputs, overlays, and model evidence"
      />
      <div className="p-6 rounded-xl border border-border bg-white text-left shadow-xs">
        <p className="text-sm text-text-secondary">
          Content coming in a later phase.
        </p>
      </div>
    </PageContainer>
  );
}

export default ResultsPage;
