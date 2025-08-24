// frontend/components/LoginForm.jsx
import { useState } from "react";
import api from "../lib/api";
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        // Store user info in context
        login(res.data);

        // Role-based redirect
        if (res.data.role === "student") navigate("/dashboard/student");
        else if (res.data.role === "entrepreneur") navigate("/dashboard/entrepreneur");
        else if (res.data.role === "admin") navigate("/dashboard/admin");
        else navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full font-medium transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
