import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeftRight, AlertCircle } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ErrorState from '../../components/ui/ErrorState';
import ImageUploader from '../../components/imagery/ImageUploader';
import ImagePreview from '../../components/imagery/ImagePreview';
import QueryInput from '../../components/query/QueryInput';
import AnalysisModeSelector from '../../components/analysis/AnalysisModeSelector';
import AnalysisStatus from '../../components/analysis/AnalysisStatus';
import AnalysisHeader from '../../components/analysis/AnalysisHeader';
import QuerySummary from '../../components/query/QuerySummary';
import ExecutionTrace from '../../components/analysis/ExecutionTrace';
import AnalysisActions from '../../components/analysis/AnalysisActions';
import MeasurementResult from '../../components/results/MeasurementResult';
import { useImageUpload } from '../../hooks/useImageUpload';
import { useAnalysis } from '../../hooks/useAnalysis';
import {
  ANALYSIS_CONFIGURATIONS,
  DEFAULT_ANALYSIS_CONFIGURATION,
  getConfigurationById,
} from '../../app/analysisConfig';
import { validateAnalysisInput } from '../../utils/validators';
import { RESULT_COMPONENTS } from '../../utils/resultRenderer';

/**
 * AnalyzePage following spec sections 18, 44, 45, 47, and 54.
 * Composes input configuration, imagery staging, natural language querying,
 * pipeline status tracking, and dynamic result rendering.
 */
export function AnalyzePage() {
  const navigate = useNavigate();
  const [inputConfig, setInputConfig] = useState(DEFAULT_ANALYSIS_CONFIGURATION);
  const [query, setQuery] = useState('');
  const [validationMsg, setValidationMsg] = useState(null);

  const { files, validationError, addFiles, removeFile, swapFiles, clearFiles } =
    useImageUpload();
  const { status, data, error, runAnalysis, reset } = useAnalysis();

  const currentConfig = getConfigurationById(inputConfig);

  const handleConfigChange = (newConfigId) => {
    setInputConfig(newConfigId);
    setValidationMsg(null);
  };

  const handleAnalyze = async () => {
    const validation = validateAnalysisInput({
      files,
      query,
      inputConfiguration: inputConfig,
    });

    if (!validation.valid) {
      setValidationMsg(validation.error);
      return;
    }

    setValidationMsg(null);

    try {
      await runAnalysis({
        images: files,
        query: query.trim(),
        inputConfiguration: inputConfig,
        imageRoles: currentConfig.roles,
      });
    } catch {
      // Error handled by useAnalysis state
    }
  };

  const handleNewAnalysis = () => {
    reset();
    setQuery('');
    clearFiles();
    setValidationMsg(null);
  };

  const handleViewReport = () => {
    navigate('/reports');
  };

  const ResultComponent = data?.intent ? RESULT_COMPONENTS[data.intent] : null;

  return (
    <PageContainer>
      <PageHeader
        title="Analyze Imagery"
        subtitle="Formulate vision-language queries across single, bi-temporal, or multi-modal satellite datasets"
        actions={
          files.length > 0 && status !== 'loading' && (
            <Button variant="outline" size="sm" onClick={clearFiles}>
              Clear Files ({files.length})
            </Button>
          )
        }
      />

      <div className="space-y-6">
        {/* Step 1: Input Mode Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white rounded-xl border border-border shadow-xs text-left">
          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">
              Analysis Mode
            </span>
            <p className="text-xs text-text-secondary mt-0.5">{currentConfig.description}</p>
          </div>
          <AnalysisModeSelector
            options={ANALYSIS_CONFIGURATIONS}
            value={inputConfig}
            onChange={handleConfigChange}
            disabled={status === 'loading'}
          />
        </div>

        {/* Step 2: Main Input Section (Hidden during results view to focus on analysis) */}
        {status !== 'success' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Imagery Input Column */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <Card variant="default" padding="md" className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="text-left">
                    <h2 className="text-sm font-semibold text-text-primary">1. Satellite Imagery</h2>
                    <p className="text-xs text-text-secondary">
                      Requires {currentConfig.requiredImages}{' '}
                      {currentConfig.requiredImages === 1 ? 'image' : 'images'} for {currentConfig.label}
                    </p>
                  </div>
                  {files.length === 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={ArrowLeftRight}
                      onClick={swapFiles}
                      className="text-primary hover:bg-primary-soft text-xs"
                    >
                      Swap Images
                    </Button>
                  )}
                </div>

                <ImageUploader
                  files={files}
                  multiple={currentConfig.requiredImages > 1}
                  onFilesSelected={(newFiles) => {
                    addFiles(newFiles);
                    setValidationMsg(null);
                  }}
                  error={validationError}
                  disabled={status === 'loading'}
                />

                {files.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {files.map((file, idx) => (
                      <ImagePreview
                        key={`${file.name}-${idx}`}
                        file={file}
                        roleLabel={currentConfig.roleLabels[idx] || `Image ${idx + 1}`}
                        onRemove={() => removeFile(idx)}
                      />
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* Query & Submission Column */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <Card variant="default" padding="md" className="space-y-4">
                <div className="border-b border-border pb-3 text-left">
                  <h2 className="text-sm font-semibold text-text-primary">2. Natural Language Query</h2>
                  <p className="text-xs text-text-secondary">
                    Pose questions, request visual grounding, or run change detection
                  </p>
                </div>

                <QueryInput
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setValidationMsg(null);
                  }}
                  onSubmit={handleAnalyze}
                  disabled={status === 'loading'}
                  placeholder="e.g., Identify solar installations, detect flooded regions, or locate aircraft..."
                />

                {validationMsg && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 rounded-lg text-left"
                  >
                    <AlertCircle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
                    <p className="text-xs font-medium text-danger">{validationMsg}</p>
                  </div>
                )}

                <Button
                  variant="primary"
                  size="md"
                  disabled={status === 'loading'}
                  onClick={handleAnalyze}
                  icon={Sparkles}
                  className="w-full shadow-xs"
                >
                  {status === 'loading' ? 'Analyzing...' : 'Execute Analysis'}
                </Button>
              </Card>

              <AnalysisStatus status={status} error={error} onRetry={handleAnalyze} />
            </div>
          </div>
        )}

        {/* Step 3: Analysis Results Stream (Rendered on success) */}
        {status === 'success' && data && (
          <div className="space-y-6">
            <AnalysisHeader
              intent={data.intent}
              sessionId={data.sessionId}
              inputConfiguration={inputConfig}
            />

            <QuerySummary
              query={query}
              inputConfiguration={inputConfig}
              filesCount={files.length}
            />

            {/* Primary Analysis Result Display */}
            {ResultComponent ? (
              <ResultComponent {...data.componentProps} />
            ) : (
              <ErrorState
                title="Unsupported Result Type"
                message={`The backend returned intent "${data.intent}", which has no matching presentation component.`}
              />
            )}

            {/* Extra deterministic physical measurements */}
            {data.measurements && data.measurements.length > 0 && data.intent !== 'measurement' && (
              <MeasurementResult measurements={data.measurements} />
            )}

            {/* Execution Trace Timeline */}
            {data.trace && data.trace.length > 0 && (
              <ExecutionTrace steps={data.trace} />
            )}

            {/* Post-execution workflow actions */}
            <AnalysisActions onNewAnalysis={handleNewAnalysis} onViewReport={handleViewReport} />
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default AnalyzePage;
