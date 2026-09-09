import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldCheck } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('NEXUS Application Caught Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-slate-900 font-sans"
        >
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h1 className="text-xl font-bold font-display text-slate-900 mb-2">
              Application State Resilient Recovery
            </h1>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              NEXUS recovered gracefully from an unexpected interface state. Your session data and ideas are safe.
            </p>

            {this.state.error && (
              <div className="text-left bg-slate-50 border border-slate-200 rounded-xl p-3 mb-6 font-mono text-[11px] text-slate-600 overflow-x-auto max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex items-center gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Platform</span>
              </button>
              <button
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.href = '/';
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] font-mono text-emerald-600">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Fault-Tolerant React 18 Resiliency Layer</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
