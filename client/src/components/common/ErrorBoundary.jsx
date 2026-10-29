import React from 'react'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
          <Card className="max-w-md p-8 text-center border-rose-200 dark:border-rose-900/60 shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 mb-4">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Something went wrong loading this view
            </h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              {this.state.error?.message || 'An unexpected rendering error occurred. Please refresh or return to dashboard.'}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button variant="gradient" size="sm" onClick={this.handleReset} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
                Reload View
              </Button>
              <a href="/dashboard">
                <Button variant="outline" size="sm" leftIcon={<Home className="w-3.5 h-3.5" />}>
                  Dashboard
                </Button>
              </a>
            </div>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
