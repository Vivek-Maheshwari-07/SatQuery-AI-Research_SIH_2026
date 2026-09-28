import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';

export function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        subtitle="Application preferences, model parameters, and platform configuration"
      />
      <div className="p-6 rounded-xl border border-border bg-white text-left shadow-xs">
        <p className="text-sm text-text-secondary">
          Content coming in a later phase.
        </p>
      </div>
    </PageContainer>
  );
}

export default SettingsPage;
