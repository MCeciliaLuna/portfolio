import { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import ErrorBoundary from "./components/ErrorBoundary";
import PortfolioPage from "./pages/PortfolioPage";
import MePage from "./pages/MePage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import TypographyShowcase from "./pages/TypographyShowcase";
import "./App.css";

function App() {
  const antTheme = useMemo(
    () => ({
      token: {
        colorPrimary: "#6f2dbd",
        borderRadius: 10,
        fontFamily: "'Wix Madefor Text', sans-serif",
      },
    }),
    []
  );

  return (
    <ErrorBoundary>
      <ConfigProvider theme={antTheme}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<PortfolioPage />} />
              <Route path="/me" element={<MePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/typography" element={<TypographyShowcase />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
