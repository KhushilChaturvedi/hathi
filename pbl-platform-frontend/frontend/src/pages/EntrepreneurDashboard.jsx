import { useEffect, useState } from "react";
import api from "../lib/api.js";

export default function EntrepreneurDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/dashboard/entrepreneur");
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusCount = (status) => {
    return data.projects.filter(project => project.status === status).length;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Entrepreneur Dashboard</h1>
        <div className="flex items-center space-x-4 text-gray-600">
          <p><span className="font-medium">Email:</span> {data.email}</p>
          <p><span className="font-medium">Role:</span> {data.role}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Projects</h3>
          <p className="text-2xl font-bold text-gray-900">{data.projects.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">{getStatusCount('pending')}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-sm font-medium text-gray-500">Approved</h3>
          <p className="text-2xl font-bold text-green-600">{getStatusCount('approved')}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
          <p className="text-2xl font-bold text-blue-600">{getStatusCount('in-progress')}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-purple-600">{getStatusCount('completed')}</p>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Projects</h2>
        {data.projects && data.projects.length > 0 ? (
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                      {project.openUntil && (
                        <span>Open until: {new Date(project.openUntil).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    {project.premium && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                        Premium
                      </span>
                    )}
                  </div>
                </div>
                {project.requiredRoles && project.requiredRoles.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm font-medium text-gray-700 mb-2">Required Roles:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.requiredRoles.map((role, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                          {role.role} ({role.level})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You haven't created any projects yet.</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
              Create Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
