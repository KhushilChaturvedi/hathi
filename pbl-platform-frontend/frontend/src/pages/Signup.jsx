import { useState } from "react";
import api from "../lib/api";
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function SignupForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/signup", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role); // 👈 store role
      window.location.href = redirectByRole(res.data.role);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
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
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="student">Student</option>
        <option value="entrepreneur">Entrepreneur</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Sign Up
      </button>
    </form>
  );
}
