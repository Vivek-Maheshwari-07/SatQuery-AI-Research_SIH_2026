import React, { useState, useRef } from 'react';

/**
 * Tooltip component with position presets and accessible trigger.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.content
 * @param {React.ReactNode} props.children
 * @param {'top' | 'bottom' | 'left' | 'right'} [props.position='top']
 * @param {number} [props.delay=150]
 * @param {string} [props.className='']
 */
export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 150,
  className = '',
}) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  if (!content) return <>{children}</>;

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(false);
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={`absolute z-50 pointer-events-none whitespace-nowrap bg-slate-900 text-white text-xs font-medium px-2.5 py-1.5 rounded shadow-lg border border-slate-700/50 animate-in fade-in-0 duration-100 ${
            positionStyles[position] || positionStyles.top
          } ${className}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
