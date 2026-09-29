import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeftRight, AlertCircle, Trash2 } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import ImageUploader from '../../components/imagery/ImageUploader';
import ImagePreview from '../../components/imagery/ImagePreview';
import QueryInput from '../../components/query/QueryInput';
import QuerySuggestions from '../../components/query/QuerySuggestions';
import AnalysisModeSelector from '../../components/analysis/AnalysisModeSelector';
import AnalysisStatus from '../../components/analysis/AnalysisStatus';
import AnalysisOutput from '../../components/analysis/AnalysisOutput';
import AnalysisActions from '../../components/analysis/AnalysisActions';
import { useImageUpload } from '../../hooks/useImageUpload';
import { useAnalysis } from '../../hooks/useAnalysis';
import {
  ANALYSIS_CONFIGURATIONS,
  DEFAULT_ANALYSIS_CONFIGURATION,
  getConfigurationById,
} from '../../app/analysisConfig';
import { validateAnalysisInput } from '../../utils/validators';

/**
 * StepHeader helper for numbered step indicators (plain text number in small circle).
 */
function StepHeader({ number, title, subtitle }) {
  return (
    <div className="flex items-start gap-2.5 pb-2 text-left">
      <div className="w-5 h-5 rounded-full bg-primary text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
        {number}
      </div>
      <div>
        <h2 className="text-sm font-semibold text-text-primary leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[11px] text-text-muted mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

/**
 * AnalyzePage component following Mission Control 2-column desktop architecture.
 * Left column (5/12, sticky): 1. Input Mode -> 2. Imagery -> 3. Question -> Analyze CTA.
 * Right column (7/12): Live Pipeline Status & Dynamic Output Stream.
 */
export function AnalyzePage() {
  const navigate = useNavigate();
  const [inputConfig, setInputConfig] = useState(DEFAULT_ANALYSIS_CONFIGURATION);
  const [query, setQuery] = useState('');
  const [validationMsg, setValidationMsg] = useState(null);
  const resultsRef = useRef(null);

  const { files, validationError, addFiles, removeFile, swapFiles, clearFiles } =
    useImageUpload();
  const { status, data, error, runAnalysis, reset } = useAnalysis();

  const currentConfig = getConfigurationById(inputConfig);

  // Auto-scroll to results on mobile/tablet when analysis succeeds
  useEffect(() => {
    if (status === 'success' && resultsRef.current) {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [status]);

  const handleConfigChange = (newConfigId) => {
    setInputConfig(newConfigId);
    setValidationMsg(null);
  };

  const handleSelectSuggestion = (suggestedText) => {
    setQuery(suggestedText);
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
      // Handled in useAnalysis error state
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

  return (
    <PageContainer>
      <PageHeader
        title="Analyze Imagery"
        subtitle="Formulate vision-language queries across single, bi-temporal, or multi-modal satellite datasets"
        actions={
          files.length > 0 && status !== 'loading' && (
            <Button
              variant="outline"
              size="sm"
              icon={Trash2}
              onClick={clearFiles}
            >
              Clear Imagery ({files.length})
            </Button>
          )
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN: STICKY WORKFLOW CONTROLS (5/12) ================= */}
        <div className="lg:col-span-5 flex flex-col gap-5 lg:sticky lg:top-20">
          <Card variant="default" padding="md" className="space-y-5">
            {/* STEP 1: INPUT MODE */}
            <div className="space-y-2.5">
              <StepHeader
                number="1"
                title="Input mode"
                subtitle="Select temporal and sensor configuration"
              />
              <AnalysisModeSelector
                options={ANALYSIS_CONFIGURATIONS}
                value={inputConfig}
                onChange={handleConfigChange}
                disabled={status === 'loading'}
              />
            </div>

            <hr className="border-border" />

            {/* STEP 2: SATELLITE IMAGERY */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <StepHeader
                  number="2"
                  title="Imagery"
                  subtitle={`Requires ${currentConfig.requiredImages} ${
                    currentConfig.requiredImages === 1 ? 'raster scene' : 'raster scenes'
                  }`}
                />
                {files.length === 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={ArrowLeftRight}
                    onClick={swapFiles}
                    className="text-xs text-primary hover:bg-primary-soft -mt-2"
                  >
                    Swap
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
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
            </div>

            <hr className="border-border" />

            {/* STEP 3: QUESTION & SUBMIT */}
            <div className="space-y-3">
              <StepHeader
                number="3"
                title="Question"
                subtitle="Pose questions, localize features, or specify change targets"
              />

              <QueryInput
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setValidationMsg(null);
                }}
                onSubmit={handleAnalyze}
                loading={status === 'loading'}
                disabled={status === 'loading'}
                placeholder="Ask about land cover, detect structures, or assess environmental changes..."
              />

              {/* Real query suggestions based on input mode */}
              <QuerySuggestions
                suggestions={currentConfig.suggestions}
                onSelectSuggestion={handleSelectSuggestion}
              />

              {validationMsg && (
                <div
                  role="alert"
                  className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-left"
                >
                  <AlertCircle className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-danger-strong">
                    {validationMsg}
                  </p>
                </div>
              )}

              <Button
                variant="primary"
                size="lg"
                disabled={status === 'loading'}
                loading={status === 'loading'}
                onClick={handleAnalyze}
                icon={Sparkles}
                className="w-full"
              >
                {status === 'loading' ? 'Analyzing Scene...' : 'Analyze'}
              </Button>
            </div>
          </Card>
        </div>

        {/* ================= RIGHT COLUMN: STATUS & OUTPUT RESULTS (7/12) ================= */}
        <div ref={resultsRef} className="lg:col-span-7 flex flex-col gap-6">
          {/* Initial State before any run */}
          {status === 'idle' && (
            <EmptyState
              graticule={true}
              title="No analysis yet"
              description="Choose an input mode, add imagery and ask a question."
              className="min-h-[460px]"
            />
          )}

          {/* Loading or Error Pipeline Status */}
          {status !== 'idle' && status !== 'success' && (
            <AnalysisStatus
              status={status}
              error={error}
              onRetry={handleAnalyze}
            />
          )}

          {/* Successful Analysis Results Stream */}
          {status === 'success' && data && (
            <div className="space-y-6">
              <AnalysisOutput
                analysis={{
                  ...data,
                  query,
                  inputConfiguration: inputConfig,
                  uploadedFiles: files,
                }}
              />
              <AnalysisActions
                onNewAnalysis={handleNewAnalysis}
                onViewReport={handleViewReport}
              />
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default AnalyzePage;
