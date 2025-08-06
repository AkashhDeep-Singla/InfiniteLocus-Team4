import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import CreateEvent from "./pages/createEvent"
import EventList from "./pages/EventList"
import MyRegisteredEvents from "./pages/MyRegisteredEvents"
import OrganizerLayout from "./layouts/OrganizerLayout"
import UserLayout from "./layouts/UserLayout"
import OrganizerDashboard from "./pages/OrganizerDashboard"

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {user?.role === "organizer" && (
                <Route element={<OrganizerLayout />}>
                    <Route path="/dashboard" element={<OrganizerDashboard />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                </Route>
            )}

            {user?.role === "user" && (
                <Route element={<UserLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/events" element={<EventList />} />
                    <Route path="/my-registrations" element={<MyRegisteredEvents />} />

                </Route>
            )}

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRoutes;
