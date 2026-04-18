import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ToastProvider } from './components/ui/Toast';

// Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';
import PricingPage from './pages/public/PricingPage';

import Dashboard from './pages/app/Dashboard';
import AppsListPage from './pages/app/AppsListPage';
import CreateAppFlow from './pages/app/CreateAppFlow';
import AppDetailsPage from './pages/app/AppDetailsPage';
import DeploymentsPage from './pages/app/DeploymentsPage';
import DomainsPage from './pages/app/DomainsPage';
import LogsPage from './pages/app/LogsPage';
import StoragePage from './pages/app/StoragePage';
import BackupsPage from './pages/app/BackupsPage';
import MonitoringPage from './pages/app/MonitoringPage';
import BillingPage from './pages/app/BillingPage';
import UsagePage from './pages/app/UsagePage';
import TeamPage from './pages/app/TeamPage';
import NotificationsPage from './pages/app/NotificationsPage';
import SettingsPage from './pages/app/SettingsPage';
import SupportPage from './pages/app/SupportPage';
import NotFoundPage from './pages/NotFoundPage';

// Layouts
import AppLayout from './components/layout/AppLayout';

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="h-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        {/* Public Routes */}
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><ForgotPasswordPage /></PageTransition>} />

        {/* Dashboard Routes with Layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="/apps" element={<PageTransition><AppsListPage /></PageTransition>} />
          <Route path="/apps/new" element={<PageTransition><CreateAppFlow /></PageTransition>} />
          <Route path="/apps/:id/*" element={<PageTransition><AppDetailsPage /></PageTransition>} />
          <Route path="/deployments" element={<PageTransition><DeploymentsPage /></PageTransition>} />
          <Route path="/domains" element={<PageTransition><DomainsPage /></PageTransition>} />
          <Route path="/logs" element={<PageTransition><LogsPage /></PageTransition>} />
          <Route path="/storage" element={<PageTransition><StoragePage /></PageTransition>} />
          <Route path="/backups" element={<PageTransition><BackupsPage /></PageTransition>} />
          <Route path="/monitoring" element={<PageTransition><MonitoringPage /></PageTransition>} />
          <Route path="/billing" element={<PageTransition><BillingPage /></PageTransition>} />
          <Route path="/usage" element={<PageTransition><UsagePage /></PageTransition>} />
          <Route path="/team" element={<PageTransition><TeamPage /></PageTransition>} />
          <Route path="/notifications" element={<PageTransition><NotificationsPage /></PageTransition>} />
          <Route path="/settings" element={<PageTransition><SettingsPage /></PageTransition>} />
          <Route path="/support" element={<PageTransition><SupportPage /></PageTransition>} />
        </Route>

        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      <ToastProvider>
        <div className="min-h-screen transition-colors duration-300">
          <AnimatedRoutes />
        </div>
      </ToastProvider>
    </Router>
  );
}
