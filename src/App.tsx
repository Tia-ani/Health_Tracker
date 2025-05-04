import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HabitProvider } from './context/HabitContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import HabitsPage from './pages/HabitsPage';
import StatsPage from './pages/StatsPage';
import InsightsPage from './pages/InsightsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <HabitProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="habits" element={<HabitsPage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HabitProvider>
    </Router>
  );
}

export default App;