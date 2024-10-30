import { useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';


const UserDashboard = () => {
    const items = useSelector(state => state.users.users)
    const { logout } = useAuth();
    const { theme } = useTheme();

    const backgroundStyle =
        theme === "dark"
            ? {
                color: "white",
                backgroundImage: " linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)",
                boxShadow: "1px 5px 12px 1px rgba(255,255,100,0.22)",
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

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800" style={backgroundStyle}>
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
                <button onClick={logout} className="mb-4 bg-red-500 text-white px-4 py-2 rounded">
                    Logout
                </button>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border dark:bg-gray-700" style={tabelStyle}>
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">Name</th>
                                <th className="py-2 px-4 border">Email</th>
                                <th className="py-2 px-4 border">Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border">{item.name}</td>
                                    <td className="py-2 px-4 border">{item.email}</td>
                                    <td className="py-2 px-4 border">{item.contact}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        // </div>
    );
};

export default UserDashboard;
