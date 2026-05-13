import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { Loader2, Eye, Download, Trash2, Upload } from "lucide-react";

const documentCategories = [
  { title: "MOU Documents", value: "MOU" },
  { title: "Business Documents", value: "Business" },
  { title: "Project Documents", value: "Project" },
];

const Documentation = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [docName, setDocName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("MOU");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Helper to get auth token
  const getAuthToken = () => {
    const vendor = localStorage.getItem("vendor");
    if (!vendor) return null;
    try {
      const parsed = JSON.parse(vendor);
      return parsed.token || null;
    } catch {
      return null;
    }
  };

  // Axios request interceptor to add token
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  // Check authentication and fetch documents
  useEffect(() => {
    const storedVendor = localStorage.getItem("vendor");
    if (!storedVendor) {
      setError("Please login to continue");
      navigate("/vendor-login");
      return;
    }

    try {
      const vendor = JSON.parse(storedVendor);
      if (!vendor._id || !vendor.token) {
        setError("Invalid session. Please login again.");
        localStorage.removeItem("vendor");
        navigate("/vendor-login");
        return;
      }
      // No need to set vendorId state; token is used for auth
    } catch (e) {
      console.error("Parse error", e);
      setError("Invalid vendor data. Please login again.");
      localStorage.removeItem("vendor");
      navigate("/vendor-login");
    }
  }, [navigate]);

  // Fetch documents (no vendorId param)
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/vendors/documents");
        if (response.data.success) {
          setDocuments(response.data.documents);
        } else {
          setError(response.data.message || "Failed to load documents");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem("vendor");
          navigate("/vendor-login");
        } else {
          setError(err.response?.data?.message || "Could not load documents");
        }
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem("vendor")) {
      fetchDocuments();
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    if (files.length === 1 && !docName.trim()) {
      setDocName(files[0].name);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }
    if (!docName.trim()) {
      alert("Please enter a document name.");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("documentName", docName);
    formData.append("category", selectedCategory);
    selectedFiles.forEach((file) => {
      formData.append("documents", file);
    });

    try {
      const response = await axios.post("/api/vendors/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        // Refresh document list
        const refreshRes = await axios.get("/api/vendors/documents");
        setDocuments(refreshRes.data.documents);
        // Reset form
        setDocName("");
        setSelectedCategory("MOU");
        setSelectedFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setError(response.data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("vendor");
        navigate("/vendor-login");
      } else {
        setError(err.response?.data?.message || "Upload failed");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;
    try {
      const response = await axios.delete(`/api/vendors/documents/${docId}`);
      if (response.data.success) {
        setDocuments((prev) => prev.filter((doc) => doc._id !== docId));
      } else {
        alert(response.data.message || "Failed to delete document");
      }
    } catch (err) {
      console.error("Delete error:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("vendor");
        navigate("/vendor-login");
      } else {
        alert(err.response?.data?.message || "Delete failed");
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 Bytes";
    const kb = bytes / 1024;
    const mb = kb / 1024;
    if (mb >= 1) return `${mb.toFixed(1)} MB`;
    return `${kb.toFixed(0)} KB`;
  };

  const getFileType = (fileName) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return "PDF";
    if (["xls", "xlsx", "csv"].includes(ext)) return "Excel";
    if (["doc", "docx"].includes(ext)) return "Word";
    if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "Image";
    return ext?.toUpperCase() || "File";
  };

  const getFileUrl = (filePath) => {
    if (!filePath) return "#";
    const clean = filePath.replace(/^uploads[\\/]/, "");
    const baseUrl = import.meta.env.VITE_API_URL || "";
    return `${baseUrl}/uploads/${clean}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7fff5] to-[#ffffff] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#2d6a4f]" />
        <span className="ml-2 text-[#234b36]">Loading documents...</span>
      </div>
    );
  }

  return (
    <section className="w-full bg-linear-to-br from-[#f7fff5] via-[#fffaf0] to-[#ffffff] p-4 sm:p-6 lg:p-8 overflow-x-hidden">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="rounded-[30px] border border-white/60 bg-white/60 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(167,224,167,0.12)] sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1f2937]">
            Documentation Center
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#6b7280]">
            Manage all vendor-related documents including MOU agreements, business records, and project files in one place.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documentCategories.map((cat) => (
            <div
              key={cat.value}
              className="rounded-[26px] border border-white/70 bg-white/70 p-5 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
            >
              <h3 className="text-lg font-semibold text-[#1f2937]">{cat.title}</h3>
              <p className="mt-2 text-sm text-[#6b7280]">
                Upload and manage {cat.title.toLowerCase()} for your vendor profile.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.value);
                  fileInputRef.current?.click();
                }}
                className="mt-4 w-full rounded-xl bg-[#a7e0a7]/70 py-2 text-sm font-semibold text-[#1f3d1f] hover:bg-[#a7e0a7] transition"
              >
                Upload {cat.title}
              </button>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className="rounded-[30px] border border-white/60 bg-white/60 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(255,247,232,0.6)] sm:p-8">
          <h2 className="text-xl font-semibold text-[#1f2937]">Upload New Document</h2>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Document Name"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              className="w-full rounded-xl border border-[#e5e7eb] bg-white/80 p-3 text-sm outline-none focus:ring-2 focus:ring-[#a7e0a7]"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-[#e5e7eb] bg-white/80 p-3 text-sm outline-none focus:ring-2 focus:ring-[#a7e0a7]"
            >
              {documentCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.title}
                </option>
              ))}
            </select>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="col-span-1 md:col-span-2 w-full rounded-xl border border-dashed border-[#a7e0a7]/60 bg-[#f7fff5] p-4 text-sm"
            />
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-3 text-sm text-[#6b7280]">
              Selected files: {selectedFiles.map((f) => f.name).join(", ")}
            </div>
          )}

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#1f2937] px-6 py-2 text-white text-sm font-semibold hover:bg-black transition disabled:opacity-50"
          >
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {uploading ? "Uploading..." : "Upload File(s)"}
          </button>
        </div>

        {/* Documents Table */}
        <div className="rounded-[30px] border border-white/60 bg-white/60 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(167,224,167,0.12)] sm:p-8 overflow-x-auto">
          <h2 className="text-xl font-semibold text-[#1f2937] mb-5">
            Uploaded Documents
          </h2>

          {documents.length === 0 ? (
            <p className="text-center text-[#6b7280] py-6">No documents uploaded yet.</p>
          ) : (
            <table className="w-full min-w-150 text-left text-sm">
              <thead>
                <tr className="text-[#6b7280] border-b">
                  <th className="py-3">Document</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc._id} className="border-b hover:bg-[#f7fff5]/60 transition">
                    <td className="py-3 font-medium text-[#1f2937] break-all">
                      {doc.documentName || doc.fileName}
                    </td>
                    <td>{getFileType(doc.fileName)}</td>
                    <td>{formatFileSize(doc.fileSize)}</td>
                    <td>{doc.category || "-"}</td>
                    <td>{new Date(doc.uploadedAt).toLocaleDateString()}</td>
                    <td className="text-right space-x-3 whitespace-nowrap">
                      <a
                        href={getFileUrl(doc.filePath)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#355b35] hover:underline inline-flex items-center gap-1"
                      >
                        <Eye size={14} /> View
                      </a>
                      <a
                        href={getFileUrl(doc.filePath)}
                        download={doc.fileName}
                        className="text-[#7a5c2e] hover:underline inline-flex items-center gap-1"
                      >
                        <Download size={14} /> Download
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDelete(doc._id)}
                        className="text-red-500 hover:underline inline-flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default Documentation;