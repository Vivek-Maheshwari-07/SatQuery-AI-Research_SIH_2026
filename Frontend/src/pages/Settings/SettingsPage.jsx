import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import ApiConfigCard from '../../components/settings/ApiConfigCard';
import SupportedInputSettingsCard from '../../components/settings/SupportedInputSettingsCard';

/**
 * SettingsPage following spec section 36.
 * Displays read-only system configurations and live backend connection verification.
 */
export function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Settings & System Configuration"
        subtitle="Operational endpoint configuration and supported raster sensor specifications"
      />

      <div className="space-y-6 max-w-4xl">
        <ApiConfigCard />
        <SupportedInputSettingsCard />
      </div>
    </PageContainer>
  );
}

export default SettingsPage;
