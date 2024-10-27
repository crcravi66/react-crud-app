
import React, { useState } from 'react';

const defaultVal = {
    id: 1,
    name: "tom",
    email: "test@email.com",
    contact: 897434434
}

const TodoApp = () => {
    const [todos, setTodos] = useState([defaultVal]);
    const [formData, setFormData] = useState({ name: '', email: '', contact: '' });
    const [editing, setEditing] = useState(null);
    const [viewing, setViewing] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData({ ...formData, [name]: value });
    };

    const handleAddOrUpdateTodo = () => {
        if (!formData.name || !formData.email || !formData.contact) return;

        if (editing !== null) {
            setTodos(todos.map((todo, index) =>
                index === editing ? { ...todo, ...formData } : todo
            ));
            setEditing(null);
        } else {
            setTodos([...todos, { ...formData, id: Date.now() }]);
        }

        setFormData({ name: '', email: '', contact: '' });
    };


    const handleEdit = (index) => {
        setFormData(todos[index]);
        setEditing(index);
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };


    const handleView = (index) => {
        setViewing(todos[index]);
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Contact List</h1>

            {/* Input form */}
            <div className="flex flex-col gap-2 mb-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="p-2 border text-gray-700 rounded-md"
                    placeholder="Enter Name"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 border text-gray-700 rounded-md"
                    placeholder="Enter Email"
                />
                <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="p-2 border text-gray-700 rounded-md"
                    placeholder="Enter Contact Number"
                />
                <button
                    onClick={handleAddOrUpdateTodo}
                    className="p-2 bg-blue-500 text-white rounded-md"
                >
                    {editing !== null ? 'Update' : 'Add'}
                </button>
            </div>

            {/* Table format */}
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-gray-700 border">Num</th>
                        <th className="px-4 py-2 text-gray-700 border">Name</th>
                        <th className="px-4 py-2 text-gray-700 border">Email</th>
                        <th className="px-4 py-2 text-gray-700 border">Contact</th>
                        <th className="px-4 py-2 text-gray-700 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={todo.id} className="border-b">
                            <td className="px-4 py-2 text-gray-700 border text-center">{index + 1}</td>
                            <td className="px-4 py-2 text-gray-700 border">{todo.name}</td>
                            <td className="px-4 py-2 text-gray-700 border">{todo.email}</td>
                            <td className="px-4 py-2 text-gray-700 border">{todo.contact}</td>
                            <td className="px-4 py-2 text-gray-700 border text-center">
                                <button
                                    onClick={() => handleView(index)}
                                    className="mr-2 px-2 py-1 bg-green-500 text-white rounded-md"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handleEdit(index)}
                                    className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded-md"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded-md"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* View Modal */}
            {viewing && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white text-gray-700 p-4 rounded-lg shadow-lg max-w-sm">
                        <h2 className="text-xl font-bold mb-2">View Contact</h2>
                        <p><strong>Name:</strong> {viewing.name}</p>
                        <p><strong>Email:</strong> {viewing.email}</p>
                        <p><strong>Contact:</strong> {viewing.contact}</p>
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
    );
};

export default TodoApp;
