// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Header from './components/Header';

function ProtectedRoute({ children, role }) {

  const location = useLocation()
  const { role: userRole } = useAuth();
  if (userRole !== role) {
    return < Navigate to="/react-crud-app/" replace state={{ from: location }
    } />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          {/* <Router> */}
          <div className="min-h-screen text-center  border-gray-400-800 dark:bg-gray-200">
            <Header />
            <Routes>
              <Route path="/react-crud-app/" element={<Login />} />
              <Route path="/react-crud-app/admin" element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/react-crud-app/user" element={
                <ProtectedRoute role="user">
                  <UserDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
          {/* </Router> */}
        </ThemeProvider>
      </AuthProvider>
    </Router >
  );
}

export default App;






