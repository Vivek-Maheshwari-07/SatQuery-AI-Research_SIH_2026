import React from 'react';
import { AppProvider } from '../context/AppContext';

/**
 * Composite Providers wrapper for global context providers.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function AppProviders({ children }) {
  return <AppProvider>{children}</AppProvider>;
}

export default AppProviders;
