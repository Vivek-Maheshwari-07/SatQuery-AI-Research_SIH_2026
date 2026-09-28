import React from 'react';
import ErrorState from './ErrorState';

/**
 * ErrorBoundary component that catches runtime render errors in subtree
 * and displays a clean, user-friendly ErrorState without blanking the application.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console for diagnostic tracing
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <ErrorState
            title="Application Error"
            message={
              this.state.error?.message ||
              'A critical rendering error occurred in this view. Please try reloading or returning to the dashboard.'
            }
            onRetry={this.handleReset}
            className="max-w-md w-full bg-white p-8 rounded-xl border border-border shadow-soft"
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
