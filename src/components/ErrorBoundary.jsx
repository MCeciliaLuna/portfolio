import React from "react";
import { Result, Button } from "antd";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            backgroundColor: "var(--background-main)",
            padding: "20px",
          }}
        >
          <Result
            status="500"
            title="¡Oops! Algo salió mal"
            subTitle="Lo sentimos, ha ocurrido un error inesperado. Por favor intenta recargar la página."
            extra={[
              <Button
                type="primary"
                key="home"
                onClick={this.handleReset}
                style={{
                  backgroundColor: "var(--primary-purple)",
                  borderColor: "var(--primary-purple)",
                }}
              >
                Volver al inicio
              </Button>,
              <Button key="reload" onClick={() => window.location.reload()}>
                Recargar página
              </Button>,
            ]}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
