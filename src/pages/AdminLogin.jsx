import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GrUserAdmin } from "react-icons/gr";


function AdminLogin() {
    {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();

        const handleLogin = (e) => {
            e.preventDefault();
            localStorage.setItem("user", JSON.stringify({ username, password }));

            if (username === "test123@gmail.com") {
                navigate("/");

            } else {
                alert("password or gmail invalid")
            }
        };

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <Link to={'/'}>
                        <div className="text-end">
                            <span className="text-sky-600 font-medium text-xs border-solid border-2 border-sky-600 p-2 my-1 rounded-md hover:bg-sky-600 hover:text-white"><GrUserAdmin className="inline mx-1" /> User LogIn</span>
                        </div>
                    </Link>
                    <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Admin</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Login as Admin
                        </button>
                    </form>
                </div>
            </div>
        );
    };
}

export default AdminLogin