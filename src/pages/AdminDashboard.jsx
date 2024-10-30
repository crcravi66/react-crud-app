
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { addUsers as addUsersAction, updateUsers, deleteUsers } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const AdminDashboard = () => {
    const { theme } = useTheme();
    const { logout } = useAuth();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ name: '', email: '', contact: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [viewing, setViewing] = useState(null);
    const items = useSelector((state) => state.users.users);

    const backgroundStyle =
        theme === "dark" ? {
            color: "white",
            backgroundImage: "linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)",
            boxShadow: "1px 0px 6px 1px rgba(255,255,100,0.22)",
        } : {
            backgroundImage: "radial-gradient(circle at 50% 50%, #95afbb, #9dbac5, #a5c5cf, #aed1d9, #b7dce2, #c0e8ec, #c9f3f5, #d3fffe)",
            boxShadow: "2px 5px 11px 1px rgba(70,20,10,0.22)",
            color: "black"
        };

    const tableStyle =
        theme === "dark" ? {
            color: "white",
            background: "linear-gradient(90deg, rgba(2,0,36,1) 1%, rgba(20,20,139,1) 44%, rgba(20,24,101,1) 100%, rgba(0,21,25,1) 100%)",
        } : {
            backgroundColor: "white",
            color: "black"
        };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleCreate = () => {
        if (!isEmailValid(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (formData.name && formData.email && formData.contact) {
            dispatch(addUsersAction(formData));
            setFormData({ name: '', email: '', contact: '' });
        }
    };

    const handleView = (index) => setViewing(items[index]);

    const handleUpdate = () => {
        if (!isEmailValid(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }
        dispatch(updateUsers({ editingIndex, formData }));
        setEditingIndex(null);
        setFormData({ name: '', email: '', contact: '' });
    };

    const handleDelete = (index) => dispatch(deleteUsers(index));

    const handleDeleteInfoPop = (item, index) => {
        if (window.confirm(`Are you sure you want to delete "${item.name}" details?`)) {
            handleDelete(index);
        }
    };

    const handleEdit = (index) => {
        setFormData(items[index]);
        setEditingIndex(index);
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 py-2 sm:p-6 min-h-screen" style={backgroundStyle}>
            <div className="container mx-auto px-0 py-2 sm:p-6" style={backgroundStyle}>
                <h2 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-4">Admin Dashboard</h2>
                <button onClick={logout} className="mb-4 bg-red-500 text-white px-4 py-1 text-xs sm-px-4 rounded w-1/8 sm:w-1/4">
                    Logout
                </button>

                <div className="flex flex-col mb-4 justify-center">
                    <form className="flex flex-col items-center justify-center">
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="border w-1/2 sm:w-1/2 text-xs sm:text-sm px-2 py-1 mb-2"
                            style={backgroundStyle}
                        />
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border w-1/2 sm:w-1/2 text-xs sm:text-sm px-2 py-1 mb-2"
                            style={backgroundStyle}
                        />
                        <input
                            required
                            type="number"
                            name="contact"
                            placeholder="Contact"
                            value={formData.contact}
                            onChange={handleInputChange}
                            className="border w-1/2 sm:w-1/2 text-xs sm:text-sm px-2 py-1 mb-2"
                            style={backgroundStyle}
                        />
                        <button
                            onClick={editingIndex === null ? handleCreate : handleUpdate}
                            className={`${editingIndex === null ? "bg-blue-500" : "bg-green-500"
                                } text-white px-4 sm:px-4 py-1 rounded w-1/8 text-xs sm:w-1/4 mt-2`}
                        >
                            {editingIndex === null ? "Add" : "Update"}
                        </button>
                    </form>
                    <div className="overflow-x-auto text-xs sm:text-sm mt-4">
                        <table className="min-w-full bg-white border dark:bg-gray-700" style={tableStyle}>
                            <thead>
                                <tr className='text-sm sm:text-base'>
                                    <th className="py-2 px-1 sm:px-2  border">Name</th>
                                    <th className="py-2 px-1 sm:px-2 border">Email</th>
                                    <th className="py-2 px-1 sm:px-2 border">Contact</th>
                                    <th className="py-2 px-1 sm:px-2  border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index} className='text-xs sm:text-sm'>
                                        <td className="py-2 p-1 sm:px-2 sm:py-1 text-xs sm:text-sm border">{item.name}</td>
                                        <td className="py-2 p-1 sm:px-2 sm:py-1 text-xs sm:text-sm border">{item.email}</td>
                                        <td className="py-2 p-1 sm:px-2 sm:py-1 text-xs sm:text-sm border">{item.contact}</td>
                                        <td className="sm:py-2 px-1 sm:px-2  border flex-col sm:flex-row flex flex-wrap ">
                                            {/* <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white px-0 sm:px-2 py-1 rounded my-1">
                                                Edit
                                            </button> */}
                                            <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white  rounded px-2 my-1 py-1 sm:my-1 text-xs sm:text-sm sm:mx-1 sm:px-3">
                                                Edit
                                            </button>
                                            <button onClick={() => handleView(index)} className="bg-green-500 text-white  rounded px-2 my-0 py-1 sm:my-1 text-xs sm:text-sm sm:mx-1 sm:px-3">
                                                View
                                            </button>
                                            <button onClick={() => handleDeleteInfoPop(item, index)} className="bg-red-500 text-white  rounded px-2 my-1 py-1 text-xs sm:text-sm sm:my-1 sm:mx-1 sm:px-3">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {viewing && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white text-gray-700 p-6 rounded-lg shadow-lg max-w-xs w-full">
                            <h2 className="text-xl font-bold mb-3">View Contact</h2>
                            <p><strong>Name:</strong> {viewing.name}</p>
                            <p><strong>Email:</strong> {viewing.email}</p>
                            <p><strong>Contact:</strong> {viewing.contact}</p>
                            <button onClick={() => setViewing(null)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
