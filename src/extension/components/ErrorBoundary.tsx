import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Extension error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-red-500 mx-auto" />
            <h2 className="mt-2 text-lg font-medium">Something went wrong</h2>
            <p className="mt-1 text-sm text-gray-600">
              Please try reloading the extension
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
