import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import ProjectDetails from "../pages/ProjectDetails";
import { getToken } from "../utils/token";

// Protect private routes
const ProtectedRoute = ({ children }) => {
  return getToken() ? children : <Navigate to="/" />;
};

// Prevent logged-in users from going back to login
const PublicRoute = ({ children }) => {
  return !getToken() ? children : <Navigate to="/dashboard" />;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        {/* Private */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/projects" element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        } />

        <Route path="/tasks" element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        } />
        <Route path="/projects/:id" element={
  <ProtectedRoute>
    <ProjectDetails />
  </ProtectedRoute>
} />

        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/dashboard" />} />

      </Routes>
    </BrowserRouter>
  );
}