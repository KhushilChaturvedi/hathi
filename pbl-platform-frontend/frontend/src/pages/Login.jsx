// frontend/components/LoginForm.jsx
import { useState } from "react";
import api from "../api";
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role); // 👈 store role
      window.location.href = redirectByRole(res.data.role);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const redirectByRole = (role) => {
    switch (role) {
      case "student": return "/student-dashboard";
      case "entrepreneur": return "/entrepreneur-dashboard";
      case "admin": return "/admin-dashboard";
      default: return "/";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2">
        Login
      </button>
    </form>
  );
}
