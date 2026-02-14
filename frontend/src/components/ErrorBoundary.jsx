import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="p-4 bg-red-50 text-red-500 rounded-xl border border-red-100 flex items-center justify-center text-sm font-medium">
                    Component failed to load
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
