import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Section crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="py-16 text-center text-gray-400">
          Something went wrong loading this section.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;