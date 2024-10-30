import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../store/userSlice';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { theme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState('user');
    const dispatch = useDispatch()
    // const items = useSelector(state => state.users.users)
    const authDatas = useSelector(state => state.users.authUsers)

    const backgroundStyle =
        theme === "dark"
            ? {
                backgroundImage:
                    " linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)"
            }
            : {
                backgroundImage: "radial-gradient(circle at 50% 50%, #95afbb, #9dbac5, #a5c5cf, #aed1d9, #b7dce2, #c0e8ec, #c9f3f5, #d3fffe)",
            };

    const handleLogin = (e) => {
        e.stopPropagation()
        e.preventDefault()
        let user = null;

        // // 1. filter auth users with user role
        const foundUserData = authDatas.find(data => data.email === email)

        // // // 2. find if the email present in the filtered auth users
        if (foundUserData) {
            if (foundUserData.password === password) {
                dispatch(setAuthUser(foundUserData))
                user = foundUserData
            } else {
                setError('PASSWORD Not Same .Please try again.');
                throw new Error("PASSWORD Not Same .Please try again.");

            }
        } else {
            setError('EMAIL not match. Please try again.');
            throw new Error("EMAIL not match. Please try again.");
        }

        if (location.state?.from) {
            navigate(location.state.from)
        }

        if (user) {
            console.log(user)
            localStorage.setItem('email', user.email);
            login(user.role);
            navigate(user.role === 'admin' ? '/react-crud-app/admin' : '/react-crud-app/user');

        } else if (!user) {
            setError('Invalid email, password, or role selection. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800" style={backgroundStyle}>
            <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-80" style={backgroundStyle} >
                <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Login</h2>
                <form>
                    <div className="mb-4">
                        <label className="block mb-1 text-sm text-start font-bold text-purple-500">
                            Email
                        </label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full p-2 mb-4 border  text-gray-900 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-600"
                        />
                        <label className="block mb-1 text-sm text-start font-bold text-purple-500">
                            Password
                        </label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-2 mb-4 border border-gray-300  text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-600"
                        />
                        {/* <label className="block mb-1 text-start text-sm font-bold text-purple-600">
                            Select Role
                        </label>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="block w-full px-3 py-1 border rounded bg-gray-100 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400  "
                        >
                            <option value="user" >User</option>
                            <option value="admin">Admin</option>
                        </select> */}
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;







