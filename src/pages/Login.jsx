import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext'
const Login = () => {
    const { theme } = useTheme();

    const backgroundStyle =
        theme === "dark"
            ? {
                backgroundImage:
                    " linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)"
            }
            : {
                backgroundImage: "radial-gradient(circle at 50% 50%, #95afbb, #9dbac5, #a5c5cf, #aed1d9, #b7dce2, #c0e8ec, #c9f3f5, #d3fffe)",
            };
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState('user');
    const navigate = useNavigate();

    const handleLogin = () => {
        login(selectedRole);
        navigate(selectedRole === 'admin' ? '/react-crud-app/admin' : '/react-crud-app/user');
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800" style={backgroundStyle}>
            <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-80" style={backgroundStyle} >
                <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Login</h2>

                <div className="mb-4">
                    <label className="block mb-4 text-sm font-bold text-pink-700">
                        Select Role
                    </label>
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="block w-full px-3 py-2 border rounded bg-gray-100 text-gray-900 dark:text-gray-100  "
                    >
                        <option value="user" >User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;











// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; // Import if using react-router
// import { GrUserAdmin } from "react-icons/gr";

// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [usergmail, setUsergmail] = useState("");
//     const [usercontact, setUsercontact] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = (e) => {
//         e.preventDefault();

//         // Mock login: Save role to localStorage
//         localStorage.setItem("user", JSON.stringify({ username, usergmail, usercontact }));

//         // // // Navigate to home or dashboard after login
//         navigate("/home"); // Replace "/" with the home/dashboard route
//         alert(`Logged in as ${username}`);
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//                 <Link to={"/adminlogin"}>
//                     <div className="text-end">
//                         <span className="text-sky-600 font-medium text-xs border-solid border-2 border-sky-600 p-2 my-1 rounded-md hover:bg-sky-600 hover:text-white"><GrUserAdmin className="inline mx-1" /> Admin User</span>
//                     </div>
//                 </Link>
//                 <h2 className="text-2xl font-bold mb-6 text-sky-600 text-center">Login</h2>
//                 <form onSubmit={handleLogin} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Username</label>
//                         <input
//                             type="text"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                             className="mt-1 block w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md shadow-sm"
//                         />
//                     </div>
//                     <div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Gmail</label>
//                             <input
//                                 type="text"
//                                 value={usergmail}
//                                 onChange={(e) => setUsergmail(e.target.value)}
//                                 required
//                                 className="mt-1 block w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md shadow-sm"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Contact</label>
//                             <input
//                                 type="number"
//                                 value={usercontact}
//                                 onChange={(e) => setUsercontact(e.target.value)}
//                                 required
//                                 className="mt-1 block w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md shadow-sm"
//                             />
//                         </div>
//                         <label className="block text-sm font-medium text-gray-700">Password</label>
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className="mt-1 block w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md shadow-sm"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//                     >
//                         Login as User
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };


// export default Login;




