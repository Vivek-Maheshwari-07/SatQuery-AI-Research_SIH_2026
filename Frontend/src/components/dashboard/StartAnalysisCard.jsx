import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

/**
 * StartAnalysisCard component following spec section 17.
 * Primary call to action to launch an imagery analysis session.
 *
 * @param {Object} props
 * @param {string} [props.className='']
 */
export function StartAnalysisCard({ className = '' }) {
  const navigate = useNavigate();

  return (
    <Card
      variant="brutalist"
      padding="md"
      className={`bg-gradient-to-br from-white to-primary-soft/20 text-left flex flex-col justify-between gap-4 ${className}`}
    >
      <div className="space-y-2">
        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-xs">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-text-primary tracking-tight">
            Launch New Analysis
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed mt-1">
            Upload optical, SAR, or multispectral rasters to run natural language questions, visual grounding, or change detection.
          </p>
        </div>
      </div>

      <div>
        <Button
          variant="primary"
          size="md"
          icon={ArrowRight}
          onClick={() => navigate('/analyze')}
          className="w-full sm:w-auto shadow-xs"
        >
          Begin Analysis
        </Button>
      </div>
    </Card>
  );
}

export default StartAnalysisCard;
