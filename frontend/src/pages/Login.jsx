import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "", role: "user" })
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/signin", form)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/dashboard")
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Login</h2>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <select
                    name="role"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="user">User</option>
                    <option value="organizer">Organizer</option>
                </select>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Login
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>

            <p className="mt-4">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-600 underline">
                    Signup
                </a>
            </p>
        </div>
    );
};

export default Login;
