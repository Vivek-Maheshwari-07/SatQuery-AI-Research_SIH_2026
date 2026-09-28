import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import HistoryTable from '../../components/history/HistoryTable';
import { useHistory } from '../../hooks/useHistory';
import { useOpenAnalysis } from '../../hooks/useOpenAnalysis';

/**
 * HistoryPage following spec section 35.
 * Displays persistent analysis records, query parameters, intent classifications,
 * and allows reopening past analysis sessions.
 */
export function HistoryPage() {
  const { status, items, error, reload } = useHistory();
  const { loading: opening, openAnalysis } = useOpenAnalysis();

  const handleSelect = (item) => {
    if (item?.session_id && !opening) {
      openAnalysis(item.session_id);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Analysis History"
        subtitle="Chronological log of executed vision-language and spatial analysis runs"
      />

      <HistoryTable
        items={items}
        loading={status === 'loading' || opening}
        error={error}
        onSelect={handleSelect}
        onRetry={reload}
      />
    </PageContainer>
  );
}

export default HistoryPage;
