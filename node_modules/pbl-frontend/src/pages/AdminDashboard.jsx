import { useEffect, useState } from "react";
import api from "../lib/api.js";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/dashboard/admin");
        setData(res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Error loading dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!data?.success) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">Error loading dashboard data</p>
        </div>
      </div>
    );
  }

  const getRoleCount = (role) => {
    return data.users.filter(user => user.role === role).length;
  };

  const getProjectStatusCount = (status) => {
    return data.projects.filter(project => project.status === status).length;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <div className="flex items-center space-x-4 text-gray-600">
          <p><span className="font-medium">Email:</span> {data.email}</p>
          <p><span className="font-medium">Role:</span> {data.role}</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold text-gray-900">{data.users.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Projects</h3>
          <p className="text-2xl font-bold text-blue-600">{data.projects.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-sm font-medium text-gray-500">Mock Projects</h3>
          <p className="text-2xl font-bold text-green-600">{data.mockProjects.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
          <p className="text-2xl font-bold text-purple-600">{getProjectStatusCount('in-progress')}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Users Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Users Overview</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{getRoleCount('student')}</p>
              <p className="text-sm text-gray-600">Students</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{getRoleCount('entrepreneur')}</p>
              <p className="text-sm text-gray-600">Entrepreneurs</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{getRoleCount('admin')}</p>
              <p className="text-sm text-gray-600">Admins</p>
            </div>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {data.users.slice(0, 10).map((user) => (
              <div key={user._id} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <p className="font-medium text-sm">{user.email}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.emailVerified ? 'Verified' : 'Pending'}
                </span>
              </div>
            ))}
            {data.users.length > 10 && (
              <p className="text-center text-sm text-gray-500">... and {data.users.length - 10} more users</p>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects Overview</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{getProjectStatusCount('pending')}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{getProjectStatusCount('approved')}</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{getProjectStatusCount('in-progress')}</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{getProjectStatusCount('completed')}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {data.projects.slice(0, 10).map((project) => (
              <div key={project._id} className="p-2 border rounded">
                <p className="font-medium text-sm">{project.title}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">by {project.entrepreneurId?.email || 'Unknown'}</p>
                  <span className={`px-2 py-1 rounded text-xs ${
                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    project.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
            {data.projects.length > 10 && (
              <p className="text-center text-sm text-gray-500">... and {data.projects.length - 10} more projects</p>
            )}
          </div>
        </div>
      </div>

      {/* Mock Projects Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Mock Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.mockProjects.map((project) => (
            <div key={project._id} className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
              <div className="flex items-center justify-between">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {project.level}
                </span>
                <span className="text-gray-500 text-sm">{project.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
