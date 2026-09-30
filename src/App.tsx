import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './lib/theme';
import { LandingPage } from './pages/Landing';
import { StudioPage } from './pages/Studio';
import { TemplatesPage } from './pages/Templates';
import { HistoryPage } from './pages/History';
import { SettingsPage } from './pages/Settings';
import { Layout } from './components/Layout';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
