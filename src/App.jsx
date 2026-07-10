import { useMemo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ConfigProvider } from "antd";
import ErrorBoundary from "./components/ErrorBoundary";
import React, { Suspense, lazy } from 'react';
import PortfolioPage from "./pages/PortfolioPage";

const MePage = lazy(() => import("./pages/MePage"));
const TypographyShowcase = lazy(() => import("./pages/TypographyShowcase"));
const NotFound = lazy(() => import("./pages/NotFound"));
import "./App.css";



const antTheme = {
  token: {
    colorPrimary: "#6f2dbd",
    borderRadius: 10,
    fontFamily: "'Wix Madefor Text', sans-serif",
  },
};

function App() {
  return (
    <ErrorBoundary>
      <ConfigProvider theme={antTheme}>
        <Router>

          <div className="App">
            <Suspense fallback={<div style={{height: '100vh', backgroundColor: 'var(--bg-main)'}} />}>
              <Routes>
                <Route path="/" element={<PortfolioPage />} />
                <Route path="/me" element={<MePage />} />
                <Route path="/typography" element={<TypographyShowcase />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
