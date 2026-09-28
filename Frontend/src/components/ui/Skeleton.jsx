import React from 'react';

/**
 * Pure pulsing Skeleton placeholder shape (no fake text content).
 *
 * @param {Object} props
 * @param {'text' | 'circular' | 'rectangular' | 'card'} [props.variant='text']
 * @param {string|number} [props.width]
 * @param {string|number} [props.height]
 * @param {string} [props.className='']
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  ...rest
}) {
  const variantStyles = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg w-full h-24',
    card: 'rounded-xl w-full h-48 border border-slate-200/80',
  };

  const style = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-slate-200/90 ${
        variantStyles[variant] || variantStyles.text
      } ${className}`}
      style={style}
      {...rest}
    />
  );
}

export default Skeleton;
