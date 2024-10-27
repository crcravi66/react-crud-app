// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';

function ProtectedRoute({ children, role }) {
  const { role: userRole } = useAuth();
  if (userRole !== role) {
    return <Navigate to="/" />;
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






// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import './App.css'
// import Home from "./pages/Home"
// import Login from './pages/Login'
// import AdminLogin from './pages/AdminLogin'
// import Admin from './components/Admin'
// // import { createContext } from 'react'

// // const TodosContext = createContext();

// function App() {

//   return (
//     // <TodosContext.Provider va>

//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Login />} />
//         <Route path='/adminlogin' element={<AdminLogin />} />
//         <Route path='/home' element={<Home />} />
//         <Route path='/admin' element={<Admin />} />
//       </Routes>
//     </BrowserRouter>
//     // </TodosContext.Provider>
//   )
// }

// export default App
