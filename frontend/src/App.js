import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";
import Products from "./pages/Products";

// ✅ Reusable Private Route Component
function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading } = useContext(AuthContext);

  // Show loading state while fetching user info
  if (loading) return <p>Loading...</p>;

  // Redirect if user not logged in
  if (!user) return <Navigate to="/login" />;

  // Restrict admin-only routes
  if (adminOnly && !user.is_admin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />

          {/* ✅ Protected Routes (requires login) */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />

          {/* ✅ Admin Only Route */}
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly={true}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* ✅ Catch-all route → redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
