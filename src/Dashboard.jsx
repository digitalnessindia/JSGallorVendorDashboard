import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Briefcase,
  CheckCircle2,
  Clock,
  FileText,
  FolderOpen,
  Image as ImageIcon,
  ListChecks,
  Package,
  PlusCircle,
  TrendingUp,
  User,
  Video,
  Wallet,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "../src/utils/axios";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [estimations, setEstimations] = useState([]);
  const [portfolio, setPortfolio] = useState({ videos: [], images: [], testimonials: [] });
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch vendor profile
        const profileRes = await axios.get("/api/vendors/me");
        if (profileRes.data.success) setVendor(profileRes.data.vendor);

        // Fetch estimations
        const estRes = await axios.get("/api/vendors/estimations");
        if (estRes.data.success) setEstimations(estRes.data.estimations || []);

        // Fetch portfolio
        const portRes = await axios.get("/api/vendors/portfolio");
        if (portRes.data.success) setPortfolio(portRes.data.portfolio);

        // Fetch documents
        const docRes = await axios.get("/api/vendors/documents");
        if (docRes.data.success) setDocuments(docRes.data.documents || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.response?.data?.message || "Failed to load dashboard");
        if (err.response?.status === 401) navigate("/vendor-login");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [navigate]);

  // Derived statistics
  const stats = useMemo(() => {
    const totalProjects = estimations.length;
    const activeEstimations = estimations.filter(
      (e) => e.step !== "Closing"
    ).length;
    const completedProjects = estimations.filter(
      (e) => e.step === "Closing"
    ).length;
    const totalRevenue = estimations.reduce(
      (sum, e) => sum + (Number(e.estimatedCost) || 0),
      0
    );
    return { totalProjects, activeEstimations, completedProjects, totalRevenue };
  }, [estimations]);

  // Data for charts
  const projectStatusData = [
    { name: "Active", value: stats.activeEstimations, color: "#2d6a4f" },
    { name: "Completed", value: stats.completedProjects, color: "#d3b97a" },
  ];

  const monthlyData = useMemo(() => {
    const months = {};
    estimations.forEach((est) => {
      const month = new Date(est.createdAt).toLocaleString("default", {
        month: "short",
      });
      months[month] = (months[month] || 0) + (Number(est.estimatedCost) || 0);
    });
    return Object.entries(months).map(([name, value]) => ({ name, value }));
  }, [estimations]);

  // Recent estimations (last 5)
  const recentEstimations = [...estimations]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Recent documents (last 5)
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        <span className="ml-3 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold">Error loading dashboard</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fff5] via-[#fffaf0] to-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {vendor?.vendorName || vendor?.businessName || "Vendor"}
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your business today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Projects</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {stats.totalProjects}
                </h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Estimations</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {stats.activeEstimations}
                </h3>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed Projects</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {stats.completedProjects}
                </h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  ₹{stats.totalRevenue.toLocaleString("en-IN")}
                </h3>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Wallet className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Project Status Pie Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Project Status Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Monthly Revenue (₹)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Bar dataKey="value" fill="#2d6a4f" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Projects & Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Estimations */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Projects
              </h3>
              <button
                onClick={() => navigate("/vendor/estimations")}
                className="text-sm text-green-700 hover:text-green-800 font-medium"
              >
                View All →
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {recentEstimations.length > 0 ? (
                recentEstimations.map((proj) => (
                  <div
                    key={proj._id}
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate("/vendor/estimations")}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {proj.projectName}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Client: {proj.clientName} • {proj.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            proj.step === "Closing"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {proj.step}
                        </span>
                        <p className="text-sm font-semibold text-gray-800 mt-1">
                          ₹{Number(proj.estimatedCost).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  No projects yet. Create your first estimation.
                </div>
              )}
            </div>
          </div>

          {/* Recent Documents */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Documents
              </h3>
              <button
                onClick={() => navigate("/vendor/documents")}
                className="text-sm text-green-700 hover:text-green-800 font-medium"
              >
                View All →
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {recentDocuments.length > 0 ? (
                recentDocuments.map((doc) => (
                  <div
                    key={doc._id}
                    className="px-6 py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {doc.documentName || doc.fileName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {doc.category || "Legal"} •{" "}
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <a
                      href={`https://api.jsgallor.com/${doc.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-green-800 text-sm"
                    >
                      View
                    </a>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  No documents uploaded yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Portfolio Summary & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Summary Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Portfolio Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Videos</span>
                </div>
                <span className="font-semibold text-gray-800">
                  {portfolio.videos?.length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Images</span>
                </div>
                <span className="font-semibold text-gray-800">
                  {portfolio.images?.length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Testimonials</span>
                </div>
                <span className="font-semibold text-gray-800">
                  {portfolio.testimonials?.length || 0}
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate("/vendor/portfolio")}
              className="mt-4 w-full py-2 text-sm font-medium text-green-700 border border-green-200 rounded-lg hover:bg-green-50 transition"
            >
              Manage Portfolio
            </button>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate("/vendor/estimations")}
                className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <PlusCircle className="h-6 w-6 text-green-700" />
                <span className="text-xs text-gray-700">New Estimation</span>
              </button>
              <button
                onClick={() => navigate("/vendor/portfolio")}
                className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <FolderOpen className="h-6 w-6 text-green-700" />
                <span className="text-xs text-gray-700">Add Portfolio</span>
              </button>
              <button
                onClick={() => navigate("/vendor/documents")}
                className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <FileText className="h-6 w-6 text-green-700" />
                <span className="text-xs text-gray-700">Upload Document</span>
              </button>
              <button
                onClick={() => navigate("/vendor/profile")}
                className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <User className="h-6 w-6 text-green-700" />
                <span className="text-xs text-gray-700">Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Recent Activity Placeholder */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {estimations.slice(0, 3).map((est, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-sm text-gray-700">
                      Project <strong>{est.projectName}</strong> updated to{" "}
                      {est.step}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(est.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {estimations.length === 0 && (
                <p className="text-gray-500 text-sm">No recent activity.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;