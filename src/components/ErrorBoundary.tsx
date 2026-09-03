import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo): void {
    if (typeof console !== 'undefined') {
      console.error('[ErrorBoundary] Caught render error:', error, info.componentStack);
    }
  }

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="min-h-screen flex items-center justify-center bg-[#050505] text-[#F4F4F5] px-6"
        >
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#0A0A0D] border border-white/[0.1] shadow-2xl space-y-4 text-center">
            <div className="font-mono text-xs uppercase tracking-widest text-red-400 font-semibold">
              Render Error
            </div>
            <h1 className="font-display text-2xl font-bold text-white">
              Something broke on this page.
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              An unexpected error occurred while rendering. Your data is safe — reloading will
              restore the portfolio.
            </p>
            {this.state.error?.message && (
              <pre className="text-[11px] font-mono text-zinc-500 bg-black/40 border border-white/[0.06] rounded-xl p-3 overflow-auto max-h-32 text-left">
                {this.state.error.message}
              </pre>
            )}
            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-all shadow-md active:scale-95"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
