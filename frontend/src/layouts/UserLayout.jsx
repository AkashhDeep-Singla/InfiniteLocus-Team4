import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserLayout = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            navigate("/login");
        } else {
            setUser(JSON.parse(userData));
        }
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
                <h2 className="text-xl font-bold mb-6">User Panel</h2>
                <nav className="space-y-4">
                    <Link to="/dashboard" className="block hover:text-blue-500">
                        Dashboard
                    </Link>
                    <Link to="/events" className="block hover:text-blue-500">
                        Browse Events
                    </Link>
                    <Link to="/my-registrations" className="block hover:text-blue-500">
                        My Registered Events
                    </Link>
                    <button onClick={logout} className="block text-red-500 mt-6">
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 p-6">
                {/* Mobile Top Bar */}
                <div className="md:hidden flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">
                        Hello, {user?.name || "User"}
                    </h2>
                    <button onClick={logout} className="text-sm text-red-500">
                        Logout
                    </button>
                </div>

                <Outlet />
            </div>
        </div>
    );
};

export default UserLayout;
