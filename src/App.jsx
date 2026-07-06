import { useMemo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ConfigProvider } from "antd";
import ErrorBoundary from "./components/ErrorBoundary";
import PortfolioPage from "./pages/PortfolioPage";
import MePage from "./pages/MePage";
import NotFound from "./pages/NotFound";
import TypographyShowcase from "./pages/TypographyShowcase";
import "./App.css";

function CanonicalLinkManager() {
  const location = useLocation();

  useEffect(() => {
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      const path = location.pathname === "/" ? "" : location.pathname;
      canonicalEl.setAttribute("href", `https://mcecilialuna-dev.netlify.app${path}`);
    }
  }, [location]);

  return null;
}

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
          <CanonicalLinkManager />
          <div className="App">
            <Routes>
              <Route path="/" element={<PortfolioPage />} />
              <Route path="/me" element={<MePage />} />
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
