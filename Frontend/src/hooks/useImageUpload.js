import { useState, useCallback } from 'react';

const ACCEPTED_EXTENSIONS = ['.tif', '.tiff', '.png', '.jpg', '.jpeg'];

/**
 * Checks if a given file has an accepted extension.
 * @param {File} file
 * @returns {boolean}
 */
function isValidFileType(file) {
  if (!file || !file.name) return false;
  const fileName = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
}

/**
 * Custom hook to manage uploaded image files with validation.
 * Supports .tif, .tiff, .png, and .jpg/.jpeg formats.
 */
export function useImageUpload() {
  const [files, setFiles] = useState([]);
  const [validationError, setValidationError] = useState(null);

  /**
   * Adds new files to state if valid. Sets validationError if any file fails validation.
   * @param {FileList|Array<File>|File} newFiles
   */
  const addFiles = useCallback((newFiles) => {
    const fileArray = Array.isArray(newFiles)
      ? newFiles
      : newFiles instanceof FileList || (newFiles && typeof newFiles[Symbol.iterator] === 'function')
      ? Array.from(newFiles)
      : newFiles ? [newFiles] : [];

    const valid = [];
    const invalid = [];

    fileArray.forEach((file) => {
      if (isValidFileType(file)) {
        valid.push(file);
      } else {
        invalid.push(file);
      }
    });

    if (invalid.length > 0) {
      setValidationError(
        `Invalid file type: ${invalid.map((f) => f.name).join(', ')}. Accepted formats: .tif, .tiff, .png, .jpg`
      );
    } else {
      setValidationError(null);
    }

    if (valid.length > 0) {
      setFiles((prev) => [...prev, ...valid]);
    }
  }, []);

  /**
   * Removes a file by index or File reference.
   * @param {number|File} indexOrFile
   */
  const removeFile = useCallback((indexOrFile) => {
    setFiles((prev) => {
      if (typeof indexOrFile === 'number') {
        return prev.filter((_, idx) => idx !== indexOrFile);
      }
      return prev.filter((f) => f !== indexOrFile);
    });
  }, []);

  /**
   * Swaps the positions of the first two files.
   */
  const swapFiles = useCallback(() => {
    setFiles((prev) => {
      if (prev.length >= 2) {
        const next = [...prev];
        const temp = next[0];
        next[0] = next[1];
        next[1] = temp;
        return next;
      }
      return prev;
    });
  }, []);

  /**
   * Clears all uploaded files and errors.
   */
  const clearFiles = useCallback(() => {
    setFiles([]);
    setValidationError(null);
  }, []);

  return {
    files,
    validationError,
    addFiles,
    removeFile,
    swapFiles,
    clearFiles,
  };
}
