import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import StartAnalysisCard from '../../components/dashboard/StartAnalysisCard';
import SupportedInputCard from '../../components/dashboard/SupportedInputCard';
import SystemStatusCard from '../../components/dashboard/SystemStatusCard';
import RecentAnalysesCard from '../../components/dashboard/RecentAnalysesCard';
import { useSystemStatus } from '../../hooks/useSystemStatus';
import { useHistory } from '../../hooks/useHistory';
import { useOpenAnalysis } from '../../hooks/useOpenAnalysis';

/**
 * DashboardPage following spec section 17.
 * Composes quick-start actions, system health monitoring, supported inputs, and recent analysis runs.
 */
export function DashboardPage() {
  const navigate = useNavigate();
  const { data: healthData, status: healthStatus, error: healthError, reload: reloadHealth } = useSystemStatus();
  const { items: historyItems, status: historyStatus, error: historyError, reload: reloadHistory } = useHistory();
  const { loading: opening, openAnalysis } = useOpenAnalysis();

  const handleSelectHistory = (item) => {
    if (item?.session_id && !opening) {
      openAnalysis(item.session_id);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        subtitle="Operational overview, vision-language model status, and recent intelligence runs"
      />

      <div className="space-y-6">
        {/* Top Grid: Action & System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <StartAnalysisCard />
            <SupportedInputCard />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <SystemStatusCard
              data={healthData}
              loading={healthStatus === 'loading'}
              error={healthError}
              onRetry={reloadHealth}
            />

            <RecentAnalysesCard
              items={historyItems}
              loading={historyStatus === 'loading' || opening}
              error={historyError}
              onSelect={handleSelectHistory}
              onRetry={reloadHistory}
              onViewAll={() => navigate('/history')}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default DashboardPage;
