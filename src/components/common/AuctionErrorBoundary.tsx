import React from "react";
import "./AuctionErrorBoundary.css";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary for individual auction cards
 * Catches rendering errors and displays a placeholder instead of crashing the whole list
 * Wraps each auction card to ensure one failed card doesn't break the entire grid
 */
export class AuctionErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[AuctionCard Error]", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="auction-card-error">
            <div className="auction-card-error__icon">⚠️</div>
            <div className="auction-card-error__text">Failed to load lot</div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
