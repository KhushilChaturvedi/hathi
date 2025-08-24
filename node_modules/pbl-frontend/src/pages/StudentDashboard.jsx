import { useEffect, useState } from "react";
import api from "../lib/api.js";

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/dashboard/student");
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
        <div className="flex items-center space-x-4 text-gray-600">
          <p><span className="font-medium">Email:</span> {data.email}</p>
          <p><span className="font-medium">Role:</span> {data.role}</p>
          <p><span className="font-medium">Level:</span> {data.level}</p>
        </div>
        {data.skills && data.skills.length > 0 && (
          <div className="mt-4">
            <p className="font-medium text-gray-700 mb-2">Skills:</p>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Mock Projects */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Mock Projects</h2>
          {data.mockProjects && data.mockProjects.length > 0 ? (
            <div className="space-y-4">
              {data.mockProjects.map((project) => (
                <div key={project._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {project.level}
                    </span>
                    <span className="text-gray-500 text-sm">{project.role}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No mock projects available</p>
          )}
        </div>

        {/* Available Projects */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Real Projects</h2>
          {data.projects && data.projects.length > 0 ? (
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs ${
                      project.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-gray-500 text-sm">
                      by {project.entrepreneurId?.email || 'Unknown'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No projects available</p>
          )}
        </div>
      </div>
    </div>
  );
}
