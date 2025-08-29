import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ContributionsPage from './pages/contributions';
import LoansPage from './pages/loans';
import Reports from './pages/reports';
import ProfileSettings from './pages/profile-settings';
import MemberDashboard from './pages/member-dashboard';
import AdminDashboard from './pages/admin-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ContributionsPage />} />
        <Route path="/contributions" element={<ContributionsPage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;