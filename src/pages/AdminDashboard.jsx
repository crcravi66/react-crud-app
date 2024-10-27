import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { addUsers as addUsersAction, updateUsers, deleteUsers } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
const AdminDashboard = () => {
    const { theme } = useTheme();

    const backgroundStyle =
        theme === "dark"
            ? {
                color: "white",
                backgroundImage: " linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)",
                boxShadow: "1px 0px 6px 1px rgba(255,255,100,0.22)",
            }
            : {
                backgroundImage: "radial-gradient(circle at 50% 50%, #95afbb, #9dbac5, #a5c5cf, #aed1d9, #b7dce2, #c0e8ec, #c9f3f5, #d3fffe)",
                boxShadow: "2px 5px 11px 1px rgba(70,20,10,0.22)",
                color: "black"
            };
    const tabelStyle =
        theme === "dark"
            ? {
                color: "white",
                background: "linear-gradient(90deg, rgba(2,0,36,1) 1%, rgba(20,20,139,1) 44%, rgba(20,24,101,1) 100%, rgba(0,21,25,1) 100%)",
            }
            : {
                backgroundColor: "white",
                color: "black"
            };


    const { logout } = useAuth();
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ name: '', email: '', contact: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [viewing, setViewing] = useState(null);
    const items = useSelector((state) => state.users.users)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreate = () => {
        dispatch(addUsersAction(formData))
        setFormData({ name: '', email: '', contact: '' });
    };

    const handleView = (index) => {
        setViewing(items[index]);
    };

    const handleUpdate = () => {
        const updatedItems = [...items];
        updatedItems[editingIndex] = formData;
        dispatch(updateUsers({ editingIndex, formData }))
        setEditingIndex(null);
        setFormData({ name: '', email: '', contact: '' });
    };

    const handleDelete = (index) => {
        dispatch(deleteUsers(index))
    };


    const handleEdit = (index) => {
        setFormData(items[index]);
        setEditingIndex(index);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800" style={backgroundStyle}>
            <div className="container mx-auto p-6 " style={backgroundStyle}>
                <h2 className="text-3xl font-bold text-orange-700  mb-4">Admin Dashboard</h2>
                <button onClick={logout} className="mb-4 bg-red-500 text-white px-4 py-2 rounded">
                    Logout
                </button>

                <div className="flex flex-col mb-4 justify-center ">
                    <div className="flex flex-col mb-4 items-center justify-center" >
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="border w-1/2  px-2 py-1 mb-2"
                            style={backgroundStyle}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border w-1/2 px-2 py-1 mb-2"
                            style={backgroundStyle}
                        />
                        <input
                            type="text"
                            name="contact"
                            placeholder="Contact"
                            value={formData.contact}
                            onChange={handleInputChange}
                            className="border  w-1/2 px-2 py-1 mb-2 "
                            style={backgroundStyle}
                        />
                        {editingIndex === null ? (

                            <button onClick={handleCreate} className="bg-blue-500 text-white px-4 w-1/5 py-2 rounded">
                                Add
                            </button>
                        ) : (
                            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">
                                Update
                            </button>
                        )}

                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full  bg-white border dark:bg-gray-700" style={tabelStyle} >
                            <thead>
                                <tr>
                                    <th className="py-2  px-2 border">Name</th>
                                    <th className="py-2 px-2 border">Email</th>
                                    <th className="py-2 px-2 border">Contact</th>
                                    <th className="py-2  px-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-2 border">{item.name}</td>
                                        <td className="py-2 px-2 border">{item.email}</td>
                                        <td className="py-2 px-2 border">{item.contact}</td>
                                        <td className="py-2 px-2 border flex space-x-2">
                                            <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-3 py-1 rounded">
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => handleView(index)}
                                                className="mr-2 px-2 py-1 bg-green-500 text-white rounded-md"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* View Modal */}
                    {viewing && (
                        <div className="fixed inset-0 bg-gray-600  bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white text-gray-700 p-6 rounded-lg shadow-lg max-w-sm">
                                <h2 className="text-xl font-bold mb-3">View Contact</h2>
                                <p className='text-start'><strong>Name:</strong> {viewing.name}</p>
                                <p className='text-start'><strong>Email:</strong> {viewing.email}</p>
                                <p className='text-start'><strong>Contact:</strong> {viewing.contact}</p>
                                <button
                                    onClick={() => setViewing(null)}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
