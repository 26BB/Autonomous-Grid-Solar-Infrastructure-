import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component {
  public declare props: Props;
  public declare setState: (
    state: Partial<State> | ((prevState: State) => Partial<State>),
    callback?: () => void
  ) => void;

  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('AeroDock ErrorBoundary caught exception:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex items-center justify-center p-6 font-mono">
          <div className="max-w-lg w-full bg-[#161F30] border border-red-500/50 rounded-2xl p-8 shadow-2xl space-y-5 text-center">
            <div className="w-14 h-14 rounded-full bg-red-950/80 border border-red-500/60 text-red-400 mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]" aria-hidden="true">warning</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#F59E0B] font-bold block mb-1">
                TELEMETRY ENCLAVE RECOVERY
              </span>
              <h2 className="text-xl font-headline font-bold text-white">
                Application Interruption Detected
              </h2>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                An unexpected client runtime exception occurred. Mission telemetry and model parameters have been safely isolated.
              </p>
            </div>
            {this.state.error && (
              <div className="p-3 bg-[#0B0F19] rounded-lg border border-[#2A374F] text-[11px] text-red-300 text-left overflow-x-auto">
                <code>{this.state.error.message || 'Unknown runtime error'}</code>
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-lg bg-[#00E5FF] text-[#0B0F19] font-headline font-bold text-xs hover:bg-white transition-all cursor-pointer shadow-lg"
            >
              Re-initialize Telemetry Interface
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
