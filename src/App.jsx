import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./VendorDashboard/Layout/MainLayout";
import Dashboard from "./Dashboard";
import Estimation from "./VendorDashboard/Estimation/Estimation";
import Portfolio from "./VendorDashboard/Portfolio/Portfolio";
import Documentation from "./VendorDashboard/Documents/Documentataion";
import VendorProfile from "./VendorDashboard/VendorProfile/Profile";
import HelpSupport from "./VendorDashboard/HelpSupport/HelpSupport";
import VendorPortal from "./VendorPortal";
import RegistrationForm from "./components/RegistrationForm";
import VendorLogin from "./components/Login";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("vendorToken");
  if (!token) {
    // Redirect to vendor portal (login page)
    return <Navigate to="/portal" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes – no authentication needed */}
      <Route path="/portal" element={<VendorPortal />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/login" element={<VendorLogin />} />

      {/* Protected Routes – require vendor to be logged in */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="estimation" element={<Estimation />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="documents" element={<Documentation />} />
        <Route path="profile" element={<VendorProfile />} />
        <Route path="help" element={<HelpSupport />} />
      </Route>

      {/* Catch-all – redirect to dashboard if logged in, else to portal */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;