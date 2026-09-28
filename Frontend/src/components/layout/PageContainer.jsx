import React from 'react';

/**
 * Consistent max-width and padding wrapper for page contents.
 * Ensures consistent grid alignment and prevents horizontal overflow.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 * @param {'sm' | 'md' | 'lg' | 'full'} [props.maxWidth='lg']
 */
export function PageContainer({
  children,
  className = '',
  maxWidth = 'lg',
}) {
  const maxWidthStyles = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <main
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col gap-6 min-w-0 ${
        maxWidthStyles[maxWidth] || maxWidthStyles.lg
      } ${className}`}
    >
      {children}
    </main>
  );
}

export default PageContainer;
