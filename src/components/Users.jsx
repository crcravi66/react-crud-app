import React, { useEffect, useState } from 'react'
import datas from '../datas/datas.js'

function Users() {
    const [alldata, setAllData] = useState(datas || [])
    console.log(alldata)
    useEffect(async () => {
        try {
            const fetchData = async () => {
                const getJSONData = localStorage.getItem("user")
                const newData = await JSON.parse(getJSONData)
                setAllData(
                    alldata.push({
                        id: datas.length + 1,
                        name: newData.username,
                        gmail: newData.usergmail,
                        contact: newData.usercontact
                    })
                )
            }
            await fetchData()
            // debugger
            console.log(alldata)
        } catch (error) {
            console.log("fetch Error =" + error)
        }
    }, [])

    return (
        <>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold text-center mb-6">User Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {alldata.map((user, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
                            <p className="text-gray-600">Email: {user.gmail}</p>
                            <p className="text-gray-600">Contact: {user.contact}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};


export default Users







import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { addUsers as addUsersAction, updateUsers, deleteUsers } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const AdminDashboard = () => {
    const { theme } = useTheme();
    const { logout } = useAuth();
    const dispatch = useDispatch();

    const items = useSelector((state) => state.users.users);
    const [formData, setFormData] = useState({ name: '', email: '', contact: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [viewing, setViewing] = useState(null);

    const backgroundStyle = theme === "dark" ? {
        color: "white",
        backgroundImage: "linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)",
        boxShadow: "1px 0px 6px 1px rgba(255,255,100,0.22)",
    } : {
        backgroundImage: "radial-gradient(circle at 50% 50%, #95afbb, #9dbac5, #a5c5cf, #aed1d9, #b7dce2, #c0e8ec, #c9f3f5, #d3fffe)",
        boxShadow: "2px 5px 11px 1px rgba(70,20,10,0.22)",
        color: "black"
    };

    const tableStyle = theme === "dark" ? {
        color: "white",
        background: "linear-gradient(90deg, rgba(2,0,36,1) 1%, rgba(20,20,139,1) 44%, rgba(20,24,101,1) 100%)",
    } : {
        backgroundColor: "white",
        color: "black"
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Email validation function
    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleCreate = () => {
        if (!isEmailValid(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (formData.name && formData.email && formData.contact) {
            dispatch(addUsersAction(formData));
            setFormData({ name: '', email: '', contact: '' });
        }
    };

    const handleView = (index) => {
        setViewing(items[index]);
    }

    const handleUpdate = () => {
        if (!isEmailValid(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }
        dispatch(updateUsers({ index: editingIndex, updatedData: formData }));
        setEditingIndex(null);
        setFormData({ name: '', email: '', contact: '' });
    };

    const handleDelete = (index) => dispatch(deleteUsers(index));

    const handleDeleteConfirmation = (item, index) => {
        if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
            handleDelete(index);
        }
    };

    const handleEdit = (index) => {
        setFormData(items[index]);
        setEditingIndex(index);
    };

    return (
        <div className="flex items-center justify-center min-h-screen" style={backgroundStyle}>
            <div className="container mx-auto p-6" style={backgroundStyle}>
                <h2 className="text-3xl font-bold text-orange-700 mb-4">Admin Dashboard</h2>
                <button onClick={logout} className="mb-4 bg-red-500 text-white px-4 py-2 rounded">
                    Logout
                </button>

                <div className="flex flex-col items-center mb-4">
                    <form className="w-full max-w-lg">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border px-2 py-1 mb-2"
                            style={backgroundStyle}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border px-2 py-1 mb-2"
                            style={backgroundStyle}
                        />
                        <input
                            type="number"
                            name="contact"
                            placeholder="Contact"
                            value={formData.contact}
                            onChange={handleInputChange}
                            className="w-full border px-2 py-1 mb-2"
                            style={backgroundStyle}
                        />
                        {editingIndex === null ? (
                            <button onClick={handleCreate} className="w-full bg-blue-500 text-white px-4 py-2 rounded">
                                Add
                            </button>
                        ) : (
                            <button onClick={handleUpdate} className="w-full bg-green-500 text-white px-4 py-2 rounded">
                                Update
                            </button>
                        )}
                    </form>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border dark:bg-gray-700" style={tableStyle}>
                        <thead>
                            <tr>
                                <th className="py-2 px-2 border">Name</th>
                                <th className="py-2 px-2 border">Email</th>
                                <th className="py-2 px-2 border">Contact</th>
                                <th className="py-2 px-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <td className="py-2 px-2 border">{item.name}</td>
                                    <td className="py-2 px-2 border">{item.email}</td>
                                    <td className="py-2 px-2 border">{item.contact}</td>
                                    <td className="py-2 px-2 border flex space-x-2">
                                        <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteConfirmation(item, index)} className="bg-red-500 text-white px-3 py-1 rounded">
                                            Delete
                                        </button>
                                        <button onClick={() => handleView(index)} className="bg-green-500 text-white px-3 py-1 rounded">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {viewing && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white text-gray-700 p-6 rounded-lg shadow-lg max-w-sm">
                            <h2 className="text-xl font-bold mb-3">View Contact</h2>
                            <p><strong>Name:</strong> {viewing.name}</p>
                            <p><strong>Email:</strong> {viewing.email}</p>
                            <p><strong>Contact:</strong> {viewing.contact}</p>
                            <button onClick={() => setViewing(null)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// export default AdminDashboard;
