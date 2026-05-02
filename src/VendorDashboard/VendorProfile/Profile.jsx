import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

import {
  Bell,
  ShoppingCart,
  Building2,
  CheckCircle2,
  Clock3,
  Factory,
  FileText,
  Mail,
  MapPin,
  Package,
  Pencil,
  Phone,
  ShieldCheck,
  BadgeIndianRupee,
  CalendarDays,
  Users,
  Boxes,
  Headset,
  X,
  Upload,
  Eye,
  Save,
  Loader2,
  Trash2,
  Download,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://api.jsgallor.com";

const VendorProfile = () => {
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState(null);
  const [formData, setFormData] = useState({});
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState("Legal");
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Today");

  const documentInputRef = useRef(null);

  // Fetch vendor profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/vendors/me");
        if (response.data.success && response.data.vendor) {
          setVendorData(response.data.vendor);
          setFormData(response.data.vendor);
          setLastUpdated(new Date().toLocaleDateString());
        } else if (response.data.user) {
          // fallback for older endpoint
          setVendorData(response.data.user);
          setFormData(response.data.user);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
        if (err.response?.status === 401) {
          navigate("/vendor-login");
        } else {
          setError("Failed to load profile. Please refresh.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!vendorData) return;
      try {
        const res = await axios.get("/api/vendors/documents");
        if (res.data.success && Array.isArray(res.data.documents)) {
          setDocuments(res.data.documents);
        }
      } catch (err) {
        console.error("Failed to fetch documents", err);
      }
    };
    fetchDocuments();
  }, [vendorData]);

  // Stats (mock or real – can be extended)
  const stats = useMemo(
    () => [
      { title: "Total Orders", value: vendorData?.totalOrders || "0", icon: <Package size={22} /> },
      { title: "Total Revenue", value: vendorData?.totalRevenue || "₹0", icon: <BadgeIndianRupee size={22} /> },
      { title: "Active Products", value: vendorData?.activeProducts || "0", icon: <Boxes size={22} /> },
      { title: "Factories Linked", value: vendorData?.factoriesLinked || "0", icon: <Factory size={22} /> },
    ],
    [vendorData]
  );

  const profileCompletion = useMemo(() => {
    if (!vendorData) return 0;
    const requiredFields = [
      vendorData.vendorName,
      vendorData.businessName,
      vendorData.email,
      vendorData.phone,
      vendorData.location,
      vendorData.category,
      vendorData.businessDesc,
    ];
    const filled = requiredFields.filter(f => f && String(f).trim() !== "").length;
    return Math.round((filled / requiredFields.length) * 100);
  }, [vendorData]);

  const openEditModal = () => {
    setFormData(vendorData);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await axios.put("/api/vendors/profile", formData);
      if (response.data.success) {
        setVendorData(response.data.vendor);
        setLastUpdated(new Date().toLocaleDateString());
        setIsEditModalOpen(false);
      } else {
        setError(response.data.message || "Update failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setSaving(false);
    }
  };

  const handleUploadClick = (docType = "Legal") => {
    setSelectedDocumentType(docType);
    documentInputRef.current?.click();
  };

  const handleDocumentUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploadingDoc(true);
    const formDataDocs = new FormData();
    files.forEach(file => {
      formDataDocs.append("documents", file);
    });
    formDataDocs.append("category", selectedDocumentType);

    try {
      const response = await axios.post("/api/vendors/documents", formDataDocs, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        // Refresh document list
        const res = await axios.get("/api/vendors/documents");
        setDocuments(res.data.documents);
        setIsDocumentsModalOpen(true);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.message || "Document upload failed");
    } finally {
      setUploadingDoc(false);
      e.target.value = "";
    }
  };

  const handleDeleteDocument = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;
    try {
      const response = await axios.delete(`/api/vendors/documents/${docId}`);
      if (response.data.success) {
        setDocuments(prev => prev.filter(doc => doc._id !== docId));
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const getFileUrl = (filePath) => {
    if (!filePath) return "#";
    // If it's already a full URL, return it
    if (filePath.startsWith("http")) return filePath;
    // Remove leading 'uploads/' if present and serve from base URL
    const cleanPath = filePath.replace(/^uploads[\\/]/, "");
    return `${API_BASE}/uploads/${cleanPath}`;
  };

  const openDocumentsModal = () => setIsDocumentsModalOpen(true);
  const closeDocumentsModal = () => setIsDocumentsModalOpen(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7fff5] to-[#ffffff] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#2d6a4f]" />
        <span className="ml-2 text-[#234b36]">Loading profile...</span>
      </div>
    );
  }

  if (error && !vendorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7fff5] to-[#ffffff] flex items-center justify-center">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7fff5] via-[#fffaf0] to-[#ffffff] text-[#264736]">
      <div className="mx-auto w-full max-w-400 px-4 py-4 sm:px-6 lg:px-8">
        <input
          ref={documentInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          multiple
          className="hidden"
          onChange={handleDocumentUpload}
        />

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#234b36] sm:text-4xl">
              Vendor Profile
            </h1>
            <p className="mt-2 text-sm text-[#5f7467] sm:text-base">
              Welcome back, {vendorData?.vendorName || vendorData?.businessName || "Vendor"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="relative rounded-xl border border-[#d7e3d9] bg-white p-3 text-[#2d6a4f] shadow-sm transition hover:bg-[#eef5ef]">
              <Bell size={20} />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#5c8f6b] text-xs font-semibold text-white">3</span>
            </button>
            <button className="relative rounded-xl border border-[#d7e3d9] bg-white p-3 text-[#2d6a4f] shadow-sm transition hover:bg-[#eef5ef]">
              <ShoppingCart size={20} />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d3b97a] text-xs font-semibold text-[#264736]">5</span>
            </button>
            <button
              onClick={openEditModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2d6a4f] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#245640] sm:px-5"
            >
              <Pencil size={18} /> Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Hero */}
        <div className="mb-6 rounded-3xl border border-[#dbe6dc] bg-white p-5 shadow-sm sm:p-6 lg:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#e8f2eb] text-[#2d6a4f]">
                <Building2 size={38} />
              </div>
              <div className="min-w-0">
                <h2 className="wrap-break-word text-3xl font-bold text-[#234b36] sm:text-4xl">
                  {vendorData?.businessName || vendorData?.vendorName || "Company Name"}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#d7c18b] bg-[#fbf5e4] px-4 py-1.5 text-sm font-semibold text-[#8a6a1f]">
                    <Clock3 size={15} /> {vendorData?.status || "Pending"}
                  </span>
                  <span className="text-sm text-[#667a6f] sm:text-base">
                    Registered on{" "}
                    {vendorData?.createdAt
                      ? new Date(vendorData.createdAt).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#5f7467] sm:text-base">
                  {vendorData?.legalName || vendorData?.vendorName || "-"} •{" "}
                  {vendorData?.businessType || "Individual"} • {vendorData?.location || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-[#dbe6dc] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-[#6c8074]">{item.title}</p>
                  <h3 className="mt-2 text-3xl font-bold text-[#234b36]">{item.value}</h3>
                </div>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eef5ef] text-[#2d6a4f]">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Left Column */}
          <div className="space-y-6 xl:col-span-8">
            <div className="rounded-3xl border border-[#dbe6dc] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-[#234b36]">
                <Building2 size={24} className="text-[#2d6a4f]" /> Company Information
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-[#6c8074]">Business / Vendor Name</p>
                    <h4 className="mt-1 text-xl font-semibold text-[#234b36]">
                      {vendorData?.businessName || vendorData?.vendorName || "Not provided"}
                    </h4>
                  </div>
                  <div>
                    <p className="text-sm text-[#6c8074]">Vendor Name</p>
                    <h4 className="mt-1 text-lg font-semibold text-[#234b36]">
                      {vendorData?.vendorName || "Not provided"}
                    </h4>
                  </div>
                  <div>
                    <p className="text-sm text-[#6c8074]">Business Type</p>
                    <h4 className="mt-1 text-lg font-semibold text-[#234b36]">
                      {vendorData?.businessType || "Not provided"}
                    </h4>
                  </div>
                  <div>
                    <p className="text-sm text-[#6c8074]">Email Address</p>
                    <h4 className="mt-1 flex items-start gap-2 break-all text-lg font-semibold text-[#234b36]">
                      <Mail size={18} className="mt-1 shrink-0 text-[#5c8f6b]" />
                      {vendorData?.email || "Not provided"}
                    </h4>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-[#6c8074]">Phone Number</p>
                    <h4 className="mt-1 flex items-center gap-2 text-lg font-semibold text-[#234b36]">
                      <Phone size={18} className="shrink-0 text-[#5c8f6b]" />
                      {vendorData?.phone || "Not provided"}
                    </h4>
                  </div>
                  <div>
                    <p className="text-sm text-[#6c8074]">Location</p>
                    <h4 className="mt-1 flex items-start gap-2 wrap-break-word text-lg font-semibold text-[#234b36]">
                      <MapPin size={18} className="mt-1 shrink-0 text-[#5c8f6b]" />
                      {vendorData?.location || "Not provided"}
                    </h4>
                  </div>
                  <div>
                    <p className="text-sm text-[#6c8074]">Primary Category</p>
                    <h4 className="mt-1 text-lg font-semibold text-[#234b36]">
                      {vendorData?.category || "Not provided"}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#dbe6dc] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-[#234b36]">
                <Factory size={24} className="text-[#2d6a4f]" /> Business Details
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-[#6c8074]">Services Offered</p>
                    <h4 className="mt-1 text-xl font-semibold text-[#234b36]">
                      {vendorData?.servicesOffered || "Not provided"}
                    </h4>
                  </div>
                  <div>
                    <p className="text-sm text-[#6c8074]">Years of Experience</p>
                    <h4 className="mt-1 flex items-center gap-2 text-xl font-semibold text-[#234b36]">
                      <CalendarDays size={18} className="text-[#5c8f6b]" />
                      {vendorData?.yearsExp || "Not provided"}
                    </h4>
                  </div>
                  <div>
                    <p className="text-sm text-[#6c8074]">Projects Completed</p>
                    <h4 className="mt-1 flex items-center gap-2 text-xl font-semibold text-[#234b36]">
                      <Users size={18} className="text-[#5c8f6b]" />
                      {vendorData?.projectsCompleted || "Not provided"}
                    </h4>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-[#6c8074]">GST Number</p>
                    <h4 className="mt-1 flex items-start gap-2 break-all text-lg font-semibold text-[#234b36]">
                      <FileText size={18} className="mt-1 shrink-0 text-[#5c8f6b]" />
                      {vendorData?.gstNo || "Not provided"}
                    </h4>
                  </div>
                  <div>
                    <p className="text-sm text-[#6c8074]">Business Description</p>
                    <h4 className="mt-1 text-lg font-semibold text-[#234b36]">
                      {vendorData?.businessDesc || "Not provided"}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 xl:col-span-4">
            {/* Verification Status */}
            <div className="rounded-3xl border border-[#dbe6dc] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-5 flex items-center gap-2 text-2xl font-bold text-[#234b36]">
                <ShieldCheck size={24} className="text-[#2d6a4f]" /> Verification Status
              </h3>
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#fbf5e4] px-4 py-3">
                <div>
                  <p className="text-sm text-[#6c8074]">Account Status</p>
                  <h4 className="mt-1 text-lg font-bold text-[#8a6a1f]">
                    {vendorData?.status || "Pending"}
                  </h4>
                </div>
                <span className="rounded-full border border-[#d7c18b] bg-[#fff9e7] px-4 py-1.5 text-sm font-semibold text-[#8a6a1f]">
                  {vendorData?.status || "Pending"}
                </span>
              </div>
              <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-[#e5ece6]">
                <div
                  className="h-full rounded-full bg-[#5c8f6b] transition-all duration-300"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
              <div className="mt-2 text-right text-xs font-semibold text-[#5c8f6b]">
                {profileCompletion}% Complete
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#55695d]">Company Details</span>
                  <CheckCircle2 size={20} className="text-[#3e8b57]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#55695d]">Legal Documents</span>
                  {documents.length > 0 ? (
                    <CheckCircle2 size={20} className="text-[#3e8b57]" />
                  ) : (
                    <span className="font-semibold text-[#b3882c]">Pending</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#55695d]">Business Verification</span>
                  <span className="font-semibold text-[#b3882c]">
                    {vendorData?.status || "Pending"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-3xl border border-[#dbe6dc] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-5 text-2xl font-bold text-[#234b36]">Quick Actions</h3>
              <div className="space-y-4">
                <button
                  onClick={openEditModal}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2d6a4f] px-4 py-3 font-semibold text-white transition hover:bg-[#245640]"
                >
                  <Pencil size={18} /> Edit Profile
                </button>
                <button
                  onClick={() => handleUploadClick("Legal")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#d7e3d9] bg-[#eef5ef] px-4 py-3 font-semibold text-[#234b36] transition hover:bg-[#e4eee6]"
                >
                  <Upload size={18} /> Upload Documents
                </button>
                <button
                  onClick={openDocumentsModal}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e3e9e4] bg-[#f8faf8] px-4 py-3 font-semibold text-[#234b36] transition hover:bg-[#eef5ef]"
                >
                  <Eye size={18} /> View Documents
                </button>
              </div>
            </div>

            {/* Account Information */}
            <div className="rounded-3xl border border-[#dbe6dc] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-5 text-2xl font-bold text-[#234b36]">Account Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-[#edf1ee] pb-3">
                  <span className="text-[#5f7467]">Registration Date</span>
                  <span className="font-semibold text-[#234b36]">
                    {vendorData?.createdAt
                      ? new Date(vendorData.createdAt).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-[#edf1ee] pb-3">
                  <span className="text-[#5f7467]">Member Since</span>
                  <span className="font-semibold text-[#234b36]">
                    {vendorData?.createdAt
                      ? Math.floor(
                          (new Date() - new Date(vendorData.createdAt)) /
                            (1000 * 60 * 60 * 24 * 30)
                        ) + " months"
                      : "0 months"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#5f7467]">Last Updated</span>
                  <span className="font-semibold text-[#234b36]">{lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="rounded-3xl border border-[#dbe6dc] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-4 text-2xl font-bold text-[#234b36]">Need Help?</h3>
              <p className="mb-5 text-sm leading-6 text-[#5f7467] sm:text-base">
                For profile verification or document updates, contact our vendor support
                team.
              </p>
              <button
                onClick={() => navigate("/help")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#dbe8dd] px-4 py-3 font-semibold text-[#234b36] transition hover:bg-[#d0e0d3]"
              >
                <Headset size={18} /> Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-8">
          <div className="w-full max-w-5xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf1ee] px-5 py-4 sm:px-6">
              <h3 className="text-xl font-bold text-[#234b36] sm:text-2xl">
                Edit Profile
              </h3>
              <button
                onClick={closeEditModal}
                className="rounded-xl p-2 text-[#5f7467] transition hover:bg-[#eef5ef]"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveProfile} className="p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  name="vendorName"
                  value={formData.vendorName || ""}
                  onChange={handleFormChange}
                  placeholder="Vendor Name"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="businessName"
                  value={formData.businessName || ""}
                  onChange={handleFormChange}
                  placeholder="Business Name"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="businessType"
                  value={formData.businessType || ""}
                  onChange={handleFormChange}
                  placeholder="Business Type"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="email"
                  value={formData.email || ""}
                  onChange={handleFormChange}
                  placeholder="Email"
                  type="email"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleFormChange}
                  placeholder="Phone Number"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="location"
                  value={formData.location || ""}
                  onChange={handleFormChange}
                  placeholder="Location"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="category"
                  value={formData.category || ""}
                  onChange={handleFormChange}
                  placeholder="Primary Category"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="yearsExp"
                  value={formData.yearsExp || ""}
                  onChange={handleFormChange}
                  placeholder="Years of Experience"
                  type="number"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="projectsCompleted"
                  value={formData.projectsCompleted || ""}
                  onChange={handleFormChange}
                  placeholder="Projects Completed"
                  type="number"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="gstNo"
                  value={formData.gstNo || ""}
                  onChange={handleFormChange}
                  placeholder="GST Number"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <textarea
                  name="businessDesc"
                  value={formData.businessDesc || ""}
                  onChange={handleFormChange}
                  placeholder="Business Description"
                  rows="4"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b] md:col-span-2"
                />
              </div>
              {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-xl border border-[#dbe6dc] px-5 py-3 font-semibold text-[#234b36] transition hover:bg-[#f7faf7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2d6a4f] px-5 py-3 font-semibold text-white transition hover:bg-[#245640] disabled:opacity-50"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {isDocumentsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-8">
          <div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf1ee] px-5 py-4 sm:px-6">
              <h3 className="text-xl font-bold text-[#234b36] sm:text-2xl">
                Legal Documents & Reports
              </h3>
              <button
                onClick={closeDocumentsModal}
                className="rounded-xl p-2 text-[#5f7467] transition hover:bg-[#eef5ef]"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 sm:p-6">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#5f7467] sm:text-base">
                  View uploaded files and upload new legal documents whenever needed.
                </p>
                <button
                  onClick={() => handleUploadClick("Legal")}
                  disabled={uploadingDoc}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2d6a4f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#245640] disabled:opacity-50"
                >
                  {uploadingDoc ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Upload size={18} />
                  )}
                  {uploadingDoc ? "Uploading..." : "Upload Legal Documents"}
                </button>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[#e7eee8]">
                <div className="hidden grid-cols-5 gap-4 bg-[#f7faf7] px-4 py-3 text-sm font-semibold text-[#4d6256] md:grid">
                  <div>Document Type</div>
                  <div>File Name</div>
                  <div>Uploaded Date</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                {documents.length > 0 ? (
                  <div className="divide-y divide-[#edf1ee]">
                    {documents.map((doc) => (
                      <div
                        key={doc._id}
                        className="grid grid-cols-1 gap-2 px-4 py-4 text-sm text-[#234b36] md:grid-cols-5 md:gap-4"
                      >
                        <div>
                          <span className="mr-2 font-semibold md:hidden">Type:</span>
                          {doc.category || doc.documentType || "Legal"}
                        </div>
                        <div className="break-all">
                          <span className="mr-2 font-semibold md:hidden">File:</span>
                          {doc.fileName}
                        </div>
                        <div>
                          <span className="mr-2 font-semibold md:hidden">Uploaded:</span>
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="inline-flex rounded-full bg-[#e8f5eb] px-3 py-1 text-xs font-semibold text-[#2d6a4f]">
                            {doc.status || "Uploaded"}
                          </span>
                        </div>
                        <div className="flex justify-start gap-3 md:justify-end">
                          <a
                            href={getFileUrl(doc.filePath)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#355b35] hover:underline"
                          >
                            <Eye size={16} />
                          </a>
                          <a
                            href={getFileUrl(doc.filePath)}
                            download={doc.fileName}
                            className="text-[#7a5c2e] hover:underline"
                          >
                            <Download size={16} />
                          </a>
                          <button
                            onClick={() => handleDeleteDocument(doc._id)}
                            className="text-red-500 hover:underline"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-[#5f7467]">
                    No documents uploaded yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorProfile;