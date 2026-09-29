import React, { useState, useRef } from 'react';
import { UploadCloud, AlertCircle, Loader2 } from 'lucide-react';

const DEFAULT_ACCEPTED_EXTENSIONS = ['.tif', '.tiff', '.png', '.jpg', '.jpeg'];

/**
 * ImageUploader component following spec section 19.
 * Handles drag-and-drop and manual file selection with strict format validation.
 * Features the signature Mission Control graticule backdrop.
 *
 * @param {Object} props
 * @param {Array<File>} [props.files=[]]
 * @param {Array<string>} [props.acceptedTypes=DEFAULT_ACCEPTED_EXTENSIONS]
 * @param {boolean} [props.multiple=true]
 * @param {(files: FileList | Array<File>) => void} props.onFilesSelected
 * @param {(indexOrFile: number | File) => void} [props.onRemove]
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.loading=false]
 * @param {string} [props.error]
 * @param {string} [props.className='']
 */
export function ImageUploader({
  files = [],
  acceptedTypes = DEFAULT_ACCEPTED_EXTENSIONS,
  multiple = true,
  onFilesSelected,
  onRemove: _onRemove,
  disabled = false,
  loading = false,
  error,
  className = '',
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState(null);
  const inputRef = useRef(null);

  const displayError = error || localError;

  const validateFiles = (incomingFiles) => {
    const fileArray = Array.from(incomingFiles || []);
    if (fileArray.length === 0) return [];

    const valid = [];
    const invalid = [];

    fileArray.forEach((file) => {
      const fileName = file.name.toLowerCase();
      const isValid = acceptedTypes.some((ext) => fileName.endsWith(ext.toLowerCase()));
      if (isValid) {
        valid.push(file);
      } else {
        invalid.push(file.name);
      }
    });

    if (invalid.length > 0) {
      setLocalError(
        `Unsupported file type: ${invalid.join(', ')}. Please upload ${acceptedTypes.join(', ')} files.`
      );
    } else {
      setLocalError(null);
    }

    return valid;
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !loading) {
      setIsDragging(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled || loading) return;

    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      const valid = validateFiles(e.dataTransfer.files);
      if (valid.length > 0 && onFilesSelected) {
        onFilesSelected(valid);
      }
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const valid = validateFiles(e.target.files);
      if (valid.length > 0 && onFilesSelected) {
        onFilesSelected(valid);
      }
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const triggerBrowse = () => {
    if (!disabled && !loading && inputRef.current) {
      inputRef.current.click();
    }
  };

  let stateStyles = 'border-border bg-graticule bg-surface hover:border-primary/50';

  if (disabled) {
    stateStyles = 'border-border/60 bg-slate-100 opacity-60 cursor-not-allowed';
  } else if (displayError) {
    stateStyles = 'border-danger/60 bg-red-50/20';
  } else if (isDragging) {
    stateStyles = 'border-primary bg-primary-soft/40 scale-[1.005] ring-2 ring-primary/20';
  }

  return (
    <div className={`w-full flex flex-col gap-2 text-left ${className}`}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload satellite imagery"
        onClick={triggerBrowse}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerBrowse();
          }
        }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center p-6 md:p-8 border-2 border-dashed rounded-xl transition-all duration-150 cursor-pointer text-center select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${stateStyles}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(',')}
          disabled={disabled || loading}
          onChange={handleFileInputChange}
          className="hidden"
          aria-hidden="true"
        />

        <div className="w-10 h-10 rounded-lg bg-white border border-border text-primary shadow-raised flex items-center justify-center mb-2.5">
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <UploadCloud className="w-5 h-5" />
          )}
        </div>

        <div className="space-y-0.5">
          <p className="text-xs md:text-sm font-semibold text-text-primary">
            <span className="text-primary hover:underline">Click to upload</span> or drag and drop raster
          </p>
          <p className="text-[11px] text-text-muted">
            GeoTIFF (.tif, .tiff), PNG, or JPEG
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-2.5 text-[11px] font-medium text-primary-dark bg-primary-soft px-2.5 py-0.5 rounded-full border border-blue-200">
            {files.length} {files.length === 1 ? 'image' : 'images'} staged
          </div>
        )}
      </div>

      {displayError && (
        <div role="alert" className="flex items-center gap-1.5 text-xs text-danger-strong font-medium px-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{displayError}</span>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
