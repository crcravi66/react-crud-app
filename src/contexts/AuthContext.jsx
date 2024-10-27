// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(localStorage.getItem('role') || 'user');
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('role', role);
    }, [role]);

    const login = (selectedRole) => {
        setRole(selectedRole);
        navigate(selectedRole === 'admin' ? '/react-crud-app/admin' : '/react-crud-app/user');
    };

    const logout = () => {
        setRole('user');
        localStorage.removeItem('role');
        navigate('/react-crud-app/');
    };

    return (
        <AuthContext.Provider value={{ role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
