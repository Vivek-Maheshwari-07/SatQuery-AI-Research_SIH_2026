import React, { useState } from 'react';
import { Server, Activity, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { getHealth } from '../../services/systemService';

/**
 * ApiConfigCard component following spec section 36.
 * Displays real environment backend URL configuration and provides connection testing.
 *
 * @param {Object} props
 * @param {string} [props.className='']
 */
export function ApiConfigCard({ className = '' }) {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const rawBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const configuredUrl = rawBaseUrl ? rawBaseUrl : 'Direct / Relative (Same Origin)';

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const response = await getHealth();
      setTestResult({
        status: 'success',
        message: `Connected successfully. System status: ${response.status || 'ok'}.`,
        modelsCount: Array.isArray(response.models) ? response.models.length : 0,
      });
    } catch (err) {
      setTestResult({
        status: 'error',
        message: err.message || 'Unable to connect to backend endpoint.',
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card variant="default" padding="md" className={`text-left space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-text-primary">API Endpoint Configuration</h2>
        </div>
        <Badge variant={rawBaseUrl ? 'primary' : 'neutral'} size="sm">
          {rawBaseUrl ? 'Custom Host' : 'Default Host'}
        </Badge>
      </div>

      {/* Target Base URL Display */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
          Backend Base URL
        </label>
        <div className="p-3 bg-surface rounded-lg border border-border flex items-center justify-between font-mono text-xs text-text-primary">
          <span className="truncate">{configuredUrl}</span>
          <span className="text-[10px] text-text-muted font-sans font-medium uppercase ml-2 flex-shrink-0">
            Read Only
          </span>
        </div>
        <p className="text-[11px] text-text-muted leading-relaxed">
          Configured via <code className="text-text-primary font-semibold">VITE_API_BASE_URL</code> environment variable.
        </p>
      </div>

      {/* Connection Test Action & Result */}
      <div className="pt-2 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Button
          variant="outline"
          size="sm"
          icon={Activity}
          loading={testing}
          onClick={handleTestConnection}
          className="w-full sm:w-auto"
        >
          {testing ? 'Testing Endpoint...' : 'Test Connection'}
        </Button>

        {testResult && (
          <div className="flex items-center gap-2">
            {testResult.status === 'success' ? (
              <div className="flex items-center gap-1.5 text-xs text-success font-medium">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{testResult.message}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-danger font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{testResult.message}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

export default ApiConfigCard;
