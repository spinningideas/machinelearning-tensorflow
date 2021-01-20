import React from 'react';
class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <h3>Something went wrong. Please reload the page to continue</h3>;
    }
    return this.props.children;
  }
}

export default ErrorHandler;
