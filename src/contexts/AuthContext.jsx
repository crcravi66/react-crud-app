// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(localStorage.getItem('role') || 'user');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    let authCurrentUser = useSelector((state) => state.users.user)

    useEffect(() => {
        localStorage.setItem('role', role);
    }, [role]);

    const login = (selectedRole) => {
        setRole(selectedRole);
        // navigate(selectedRole === 'admin' ? '/react-crud-app/admin' : '/react-crud-app/user');
    };

    const logout = () => {
        dispatch(setAuthUser(null))
        navigate('/react-crud-app/');
        authCurrentUser = null;
    };

    return (
        <AuthContext.Provider value={{ role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
