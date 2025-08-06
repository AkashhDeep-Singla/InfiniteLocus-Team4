import { Outlet, NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const OrganizerLayout = () => {
    const { logout, user } = useAuth()

    return (
        <div className="flex">
            <div className="w-1/5 p-4 bg-gray-200 h-screen">
                <h2 className="font-bold text-lg mb-4">
                    Organizer Panel {user?.name || "Organizer"}
                </h2>
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="/organizer/dashboard"
                            className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : ""}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/organizer/create-event"
                            className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : ""}
                        >
                            Create Event
                        </NavLink>
                    </li>
                    <li>
                        <button
                            onClick={logout}
                            className="text-red-500 hover:underline"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>

            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    )
}

export default OrganizerLayout;
