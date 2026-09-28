import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';

export function ReportsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Reports"
        subtitle="Exportable analytical dossiers and executive summaries"
      />
      <div className="p-6 rounded-xl border border-border bg-white text-left shadow-xs">
        <p className="text-sm text-text-secondary">
          Content coming in a later phase.
        </p>
      </div>
    </PageContainer>
  );
}

export default ReportsPage;
