import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import EmptyState from '../../components/ui/EmptyState';

/**
 * 404 Not Found fallback page.
 */
export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageContainer className="flex items-center justify-center min-h-[60vh]">
      <EmptyState
        icon={FileQuestion}
        title="Page Not Found"
        description="The requested page route could not be found or has been moved."
        action={{
          label: 'Return to Dashboard',
          onClick: () => navigate('/'),
          variant: 'primary',
        }}
        className="max-w-md w-full bg-white p-8 rounded-xl border border-border shadow-soft"
      />
    </PageContainer>
  );
}

export default NotFoundPage;
