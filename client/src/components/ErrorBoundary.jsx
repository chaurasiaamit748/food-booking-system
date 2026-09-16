import { Component } from 'react';
import '../error-boundary.css';

export default class ErrorBoundary extends Component {
  state = { hasError: false, message: '' };
  static getDerivedStateFromError(error) { return { hasError: true, message: error.message }; }
  render() {
    if (!this.state.hasError) return this.props.children;
    return <main className="route-error"><div><p className="eyebrow">FASTWAY workspace</p><h1>This page could not load</h1><p>{this.state.message || 'Something went wrong while opening this page.'}</p><button className="primary-btn" onClick={() => window.location.reload()}>Reload page</button></div></main>;
  }
}
