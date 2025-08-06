import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

const OrganizerLayout = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
        } else {
            try {
                const decoded = jwtDecode(token)
                setUser(decoded)
            } catch (err) {
                console.error("Invalid token", err)
                localStorage.removeItem("token")
                navigate("/login")
            }
        }
    }, [navigate])

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/login")
    }

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
