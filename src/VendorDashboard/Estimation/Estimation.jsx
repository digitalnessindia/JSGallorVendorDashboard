import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import {
  Search,
  Bell,
  Plus,
  FileText,
  Upload,
  IndianRupee,
  FolderOpen,
  CheckCircle2,
  Clock3,
  FileSpreadsheet,
  ClipboardList,
  PackageCheck,
  RefreshCcw,
  Lock,
  Pencil,
  Save,
  User,
  MapPin,
  Briefcase,
  CalendarDays,
  Image as ImageIcon,
} from "lucide-react";

const API_BASE = "/api/vendors";

const workflowSteps = [
  { name: "Estimation", icon: FileSpreadsheet },
  { name: "Quotation", icon: ClipboardList },
  { name: "Final Order", icon: PackageCheck },
  { name: "Update", icon: RefreshCcw },
  { name: "Closing", icon: Lock },
];

const vendorStepRequirements = {
  Interior: {
    finalOrderStages: [
      "Site Visit Completed",
      "Material Selection",
      "Production Started",
      "Installation In Progress",
      "Finishing Stage",
      "Ready for Handover",
    ],
    updateTypes: [
      "Site Progress",
      "Material Update",
      "Client Approval",
      "Installation Update",
      "Payment Follow-up",
    ],
    closingChecks: [
      "Final images uploaded",
      "Client approval collected",
      "Pending balance cleared",
      "Handover completed",
      "Warranty / support shared",
    ],
  },
  Furniture: {
    finalOrderStages: [
      "Design Approved",
      "Woodwork Started",
      "Polish In Progress",
      "Dispatch Ready",
      "Delivered",
      "Installed",
    ],
    updateTypes: [
      "Production Update",
      "Polish Update",
      "Dispatch Update",
      "Delivery Update",
      "Client Feedback",
    ],
    closingChecks: [
      "Delivered images uploaded",
      "Installation completed",
      "Client sign-off received",
      "Balance payment completed",
      "Service notes shared",
    ],
  },
  Civil: {
    finalOrderStages: [
      "Planning Stage",
      "Foundation Stage",
      "Structure Stage",
      "Finishing Stage",
      "Inspection Stage",
      "Completed",
    ],
    updateTypes: [
      "Work Progress",
      "Site Material Update",
      "Inspection Update",
      "Labour Update",
      "Approval Update",
    ],
    closingChecks: [
      "Completion images uploaded",
      "Inspection closed",
      "Snag list completed",
      "Client handover done",
      "Final settlement completed",
    ],
  },
};

const getStepIndex = (stepName) =>
  workflowSteps.findIndex((item) => item.name === stepName);

const priorityStyles = {
  High: "bg-red-500/10 text-red-300 border-red-400/20",
  Medium: "bg-[#8B5A2B]/15 text-[#e6c39d] border-[#8B5A2B]/30",
  Low: "bg-[#a7e0a7]/10 text-[#d7ffd7] border-[#a7e0a7]/20",
};

const createEmptyProject = () => ({
  id: null,
  _id: null,
  projectName: "",
  estimatedCost: "",
  description: "",
  estimationDocument: null,
  clientName: "",
  location: "",
  priority: "Medium",
  vendorType: "Interior",
  step: "Estimation",
  updatedAt: "Just now",
  userDetails: {
    clientName: "",
    companyName: "",
    phone: "",
    email: "",
    address: "",
  },
  quotationDetails: {
    quotationNumber: "",
    quotationDate: "",
    validTill: "",
    quotationAmount: "",
    notes: "",
    quotationDocument: null,
  },
  finalOrder: {
    updatedDetails: "",
    currentStage: "",
    estimationCost: "",
    description: "",
    stages: "",
    images: [],
  },
  updatesSection: {
    updateType: "",
    progressTitle: "",
    progressNote: "",
    nextAction: "",
    followUpDate: "",
    progressPercent: 0,
    attachments: [],
  },
  closingSection: {
    closingSummary: "",
    closingRequirements: "",
    currentStage: "",
    finalImages: [],
    handoverDone: false,
    paymentClosed: false,
    clientApproved: false,
    supportShared: false,
  },
});

const Estimation = () => {
  const navigate = useNavigate();
  const [vendorId, setVendorId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModes, setEditModes] = useState({ estimation: false, quotation: false });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Refs for file inputs
  const fileInputRef = useRef(null);
  const quotationFileInputRef = useRef(null);
  const finalOrderImageRef = useRef(null);
  const updateAttachmentRef = useRef(null);
  const closingImageRef = useRef(null);

  // Get vendorId from localStorage
  useEffect(() => {
    const storedVendor = localStorage.getItem("vendor");
    if (storedVendor) {
      try {
        const vendor = JSON.parse(storedVendor);
        if (vendor._id) setVendorId(vendor._id);
        else setError("Vendor ID missing. Please login again.");
      } catch (e) {
        console.error("Parse error", e);
        setError("Invalid vendor data. Please login again.");
      }
    } else {
      setError("Please login to access estimations.");
      navigate("/vendor-login");
    }
  }, [navigate]);

  // Fetch estimations when vendorId is available
  useEffect(() => {
    if (!vendorId) return;
    const fetchEstimations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE}/estimations?vendorId=${vendorId}`);
        if (response.data.success && response.data.estimations) {
          const loaded = response.data.estimations.map((est) => ({
            id: est._id,
            _id: est._id,
            projectName: est.projectName || "",
            estimatedCost: est.estimatedCost || "",
            description: est.description || "",
            clientName: est.clientName || "",
            location: est.location || "",
            priority: est.priority || "Medium",
            vendorType: est.vendorType || "Interior",
            step: est.step || "Estimation",
            updatedAt: new Date(est.updatedAt).toLocaleString(),
            userDetails: est.userDetails || {},
            quotationDetails: {
              ...est.quotationDetails,
              quotationDocument: null,
            },
            finalOrder: {
              ...est.finalOrder,
              images: [],
            },
            updatesSection: {
              ...est.updatesSection,
              attachments: [],
            },
            closingSection: {
              ...est.closingSection,
              finalImages: [],
            },
            estimationDocument: null,
          }));
          setProjects(loaded);
          if (loaded.length > 0) setSelectedProjectId(loaded[0].id);
        } else {
          setError(response.data.message || "No estimations found.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load estimations. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchEstimations();
  }, [vendorId]);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;
  const activeStep = selectedProject ? getStepIndex(selectedProject.step) : 0;
  const vendorConfig = selectedProject
    ? vendorStepRequirements[selectedProject.vendorType] || vendorStepRequirements.Interior
    : vendorStepRequirements.Interior;

  const totalProjects = projects.length;
  const totalValue = projects.reduce((sum, p) => sum + (Number(p.estimatedCost) || 0), 0);
  const activeEstimations = projects.filter((p) => p.step === "Estimation" || p.step === "Quotation").length;
  const completedClosings = projects.filter((p) => p.step === "Closing").length;

  const filteredProjects = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return projects;
    return projects.filter(
      (p) =>
        p.projectName?.toLowerCase().includes(term) ||
        p.clientName?.toLowerCase().includes(term) ||
        p.location?.toLowerCase().includes(term) ||
        p.step?.toLowerCase().includes(term) ||
        p.vendorType?.toLowerCase().includes(term)
    );
  }, [projects, searchTerm]);

  const handleAddProject = () => {
    const newProject = { ...createEmptyProject(), id: Date.now() };
    setProjects((prev) => [newProject, ...prev]);
    setSelectedProjectId(newProject.id);
    setEditModes({ estimation: true, quotation: true });
  };

  const handleFieldChange = (field, value) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProjectId ? { ...p, [field]: value, updatedAt: "Just now" } : p
      )
    );
  };

  const handleNestedFieldChange = (section, field, value) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProjectId
          ? {
              ...p,
              [section]: { ...p[section], [field]: value },
              updatedAt: "Just now",
            }
          : p
      )
    );
  };

  const handleArrayFilesChange = (section, field, files) => {
    const fileArray = files ? Array.from(files) : [];
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProjectId
          ? {
              ...p,
              [section]: { ...p[section], [field]: fileArray },
              updatedAt: "Just now",
            }
          : p
      )
    );
  };

  const handleNextStep = () => {
    if (!selectedProject) return;
    const currentIdx = getStepIndex(selectedProject.step);
    const nextIdx = Math.min(currentIdx + 1, workflowSteps.length - 1);
    handleFieldChange("step", workflowSteps[nextIdx].name);
  };

  const handlePrevStep = () => {
    if (!selectedProject) return;
    const currentIdx = getStepIndex(selectedProject.step);
    const prevIdx = Math.max(currentIdx - 1, 0);
    handleFieldChange("step", workflowSteps[prevIdx].name);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0] || null;
    handleFieldChange("estimationDocument", file);
  };

  const handleQuotationFileUpload = (e) => {
    const file = e.target.files?.[0] || null;
    handleNestedFieldChange("quotationDetails", "quotationDocument", file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;
    if (!vendorId) {
      setError("Vendor not identified. Please login again.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      // 👇 Add vendorId
      formData.append("vendorId", vendorId);

      const simpleFields = [
        "projectName",
        "estimatedCost",
        "description",
        "clientName",
        "location",
        "priority",
        "vendorType",
        "step",
      ];
      simpleFields.forEach((field) => {
        if (selectedProject[field]) formData.append(field, selectedProject[field]);
      });

      const nestedSections = [
        "userDetails",
        "quotationDetails",
        "finalOrder",
        "updatesSection",
        "closingSection",
      ];
      nestedSections.forEach((section) => {
        const copy = { ...selectedProject[section] };
        if (section === "quotationDetails") delete copy.quotationDocument;
        if (section === "finalOrder") delete copy.images;
        if (section === "updatesSection") delete copy.attachments;
        if (section === "closingSection") delete copy.finalImages;
        formData.append(section, JSON.stringify(copy));
      });

      if (selectedProject.estimationDocument instanceof File) {
        formData.append("estimationDocument", selectedProject.estimationDocument);
      }
      if (selectedProject.quotationDetails?.quotationDocument instanceof File) {
        formData.append("quotationDocument", selectedProject.quotationDetails.quotationDocument);
      }
      selectedProject.finalOrder?.images?.forEach((file) => {
        if (file instanceof File) formData.append("finalOrderImages", file);
      });
      selectedProject.updatesSection?.attachments?.forEach((file) => {
        if (file instanceof File) formData.append("updateAttachments", file);
      });
      selectedProject.closingSection?.finalImages?.forEach((file) => {
        if (file instanceof File) formData.append("closingImages", file);
      });

      let response;
      if (selectedProject._id) {
        response = await axios.put(`${API_BASE}/estimations/${selectedProject._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios.post(`${API_BASE}/estimations`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.data.success) {
        alert("Estimation saved successfully!");
        // Refresh list
        const refreshRes = await axios.get(`${API_BASE}/estimations?vendorId=${vendorId}`);
        if (refreshRes.data.success) {
          const refreshed = refreshRes.data.estimations.map((est) => ({
            id: est._id,
            _id: est._id,
            projectName: est.projectName,
            estimatedCost: est.estimatedCost,
            description: est.description,
            clientName: est.clientName,
            location: est.location,
            priority: est.priority,
            vendorType: est.vendorType,
            step: est.step,
            updatedAt: new Date(est.updatedAt).toLocaleString(),
            userDetails: est.userDetails || {},
            quotationDetails: { ...est.quotationDetails, quotationDocument: null },
            finalOrder: { ...est.finalOrder, images: [] },
            updatesSection: { ...est.updatesSection, attachments: [] },
            closingSection: { ...est.closingSection, finalImages: [] },
            estimationDocument: null,
          }));
          setProjects(refreshed);
          if (refreshed.length > 0) setSelectedProjectId(refreshed[0].id);
        }
      } else {
        setError(response.data.message || "Failed to save estimation.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ----- Helper render functions (unchanged) -----
  const renderInput = (label, value, onChange, placeholder, type = "text", disabled = false, icon = null) => (
    <div className="rounded-[22px] border border-white/10 bg-[#0d1729]/70 p-4">
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
        {icon}
        {label}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 ${
          disabled ? "cursor-not-allowed opacity-70" : "focus:border-[#a7e0a7]/40 focus:ring-2 focus:ring-[#a7e0a7]/20"
        }`}
      />
    </div>
  );

  const renderTextarea = (label, value, onChange, placeholder, disabled = false, rows = 4) => (
    <div className="rounded-[22px] border border-white/10 bg-[#0d1729]/70 p-4">
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
        <FileText size={16} className="text-[#a7e0a7]" />
        {label}
      </label>
      <textarea
        rows={rows}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 ${
          disabled ? "cursor-not-allowed opacity-70" : "focus:border-[#a7e0a7]/40 focus:ring-2 focus:ring-[#a7e0a7]/20"
        }`}
      />
    </div>
  );

  const renderFileNames = (files) => {
    if (!files || files.length === 0) return <p className="text-sm text-white/45">No new files selected</p>;
    return (
      <div className="flex flex-wrap gap-2">
        {files.map((file, idx) => (
          <span key={idx} className="rounded-full border border-[#a7e0a7]/20 bg-[#a7e0a7]/10 px-3 py-1 text-xs text-[#dfffdc]">
            {file.name}
          </span>
        ))}
      </div>
    );
  };

  // ---------- Step Rendering Functions (preserved) ----------
  const renderEstimationSection = () => {
    const isEditing = editModes.estimation;
    return (
      <div className="space-y-5">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Step 1 - Estimation</h3>
            <p className="mt-1 text-sm text-white/55">Estimation section with user details edit option.</p>
          </div>
          <button
            type="button"
            onClick={() => setEditModes((prev) => ({ ...prev, estimation: !prev.estimation }))}
            className="inline-flex items-center gap-2 rounded-2xl border border-[#a7e0a7]/20 bg-[#a7e0a7]/10 px-4 py-2 text-sm font-semibold text-[#dfffdc] transition hover:bg-[#a7e0a7]/15"
          >
            {isEditing ? <Save size={16} /> : <Pencil size={16} />}
            {isEditing ? "Save User Details" : "Edit User Details"}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {renderInput("Project Name", selectedProject?.projectName, (e) => handleFieldChange("projectName", e.target.value), "Enter project name", "text", false, <FolderOpen size={16} className="text-[#a7e0a7]" />)}
          {renderInput("Estimated Cost", selectedProject?.estimatedCost, (e) => {
            handleFieldChange("estimatedCost", e.target.value);
            handleNestedFieldChange("finalOrder", "estimationCost", e.target.value);
            handleNestedFieldChange("quotationDetails", "quotationAmount", e.target.value);
          }, "Enter estimated cost", "number", false, <IndianRupee size={16} className="text-[#a7e0a7]" />)}
          {renderInput("Client Name", selectedProject?.userDetails?.clientName, (e) => {
            handleNestedFieldChange("userDetails", "clientName", e.target.value);
            handleFieldChange("clientName", e.target.value);
          }, "Enter client name", "text", !isEditing, <User size={16} className="text-[#a7e0a7]" />)}
          {renderInput("Company Name", selectedProject?.userDetails?.companyName, (e) => handleNestedFieldChange("userDetails", "companyName", e.target.value), "Enter company name", "text", !isEditing, <Briefcase size={16} className="text-[#a7e0a7]" />)}
          {renderInput("Phone Number", selectedProject?.userDetails?.phone, (e) => handleNestedFieldChange("userDetails", "phone", e.target.value), "Enter phone number", "text", !isEditing)}
          {renderInput("Email", selectedProject?.userDetails?.email, (e) => handleNestedFieldChange("userDetails", "email", e.target.value), "Enter email", "email", !isEditing)}
          {renderInput("Location", selectedProject?.location, (e) => handleFieldChange("location", e.target.value), "Enter site location", "text", false, <MapPin size={16} className="text-[#a7e0a7]" />)}
          <div className="rounded-[22px] border border-white/10 bg-[#0d1729]/70 p-4">
            <label className="mb-2 text-sm font-medium text-white/80">Vendor Type</label>
            <select value={selectedProject?.vendorType || "Interior"} onChange={(e) => handleFieldChange("vendorType", e.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#a7e0a7]/40 focus:ring-2 focus:ring-[#a7e0a7]/20">
              <option className="bg-[#0f172a]" value="Interior">Interior</option>
              <option className="bg-[#0f172a]" value="Furniture">Furniture</option>
              <option className="bg-[#0f172a]" value="Civil">Civil</option>
            </select>
          </div>
        </div>

        {renderTextarea("Description", selectedProject?.description, (e) => handleFieldChange("description", e.target.value), "Add project estimation description", false, 5)}
        {renderTextarea("Address", selectedProject?.userDetails?.address, (e) => handleNestedFieldChange("userDetails", "address", e.target.value), "Enter full address", !isEditing, 3)}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-[22px] border border-white/10 bg-[#0d1729]/70 p-4">
            <label className="mb-2 text-sm font-medium text-white/80">Priority</label>
            <select value={selectedProject?.priority || "Medium"} onChange={(e) => handleFieldChange("priority", e.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#a7e0a7]/40 focus:ring-2 focus:ring-[#a7e0a7]/20">
              <option className="bg-[#0f172a]" value="High">High</option>
              <option className="bg-[#0f172a]" value="Medium">Medium</option>
              <option className="bg-[#0f172a]" value="Low">Low</option>
            </select>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-[#0d1729]/70 p-4">
            <label className="mb-2 text-sm font-medium text-white/80">Current Stage</label>
            <select value={selectedProject?.step || "Estimation"} onChange={(e) => handleFieldChange("step", e.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#a7e0a7]/40 focus:ring-2 focus:ring-[#a7e0a7]/20">
              {workflowSteps.map((item) => <option key={item.name} className="bg-[#0f172a]" value={item.name}>{item.name}</option>)}
            </select>
          </div>
        </div>

        <div className="rounded-[22px] border border-dashed border-[#a7e0a7]/30 bg-[#0d1729]/70 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Upload Estimation Documents</h3>
              <p className="mt-1 text-sm text-white/50">Upload quotation sheets, BOQ files, PDFs, images, or project documents.</p>
              <p className="mt-3 text-sm text-[#a7e0a7]">{selectedProject?.estimationDocument ? selectedProject.estimationDocument.name : "No file selected"}</p>
            </div>
            <div className="flex gap-3">
              <input ref={fileInputRef} type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 rounded-2xl bg-[#8B5A2B] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]">
                <Upload size={16} /> Upload File
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderQuotationSection = () => {
    const isEditing = editModes.quotation;
    return (
      <div className="space-y-5">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div><h3 className="text-xl font-semibold text-white">Step 2 - Quotation</h3><p className="mt-1 text-sm text-white/55">Quotation section with edit option.</p></div>
          <button type="button" onClick={() => setEditModes((prev) => ({ ...prev, quotation: !prev.quotation }))} className="inline-flex items-center gap-2 rounded-2xl border border-[#a7e0a7]/20 bg-[#a7e0a7]/10 px-4 py-2 text-sm font-semibold text-[#dfffdc] transition hover:bg-[#a7e0a7]/15">
            {isEditing ? <Save size={16} /> : <Pencil size={16} />} {isEditing ? "Save Quotation" : "Edit Quotation"}
          </button>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {renderInput("Quotation Number", selectedProject?.quotationDetails?.quotationNumber, (e) => handleNestedFieldChange("quotationDetails", "quotationNumber", e.target.value), "Enter quotation number", "text", !isEditing)}
          {renderInput("Quotation Date", selectedProject?.quotationDetails?.quotationDate, (e) => handleNestedFieldChange("quotationDetails", "quotationDate", e.target.value), "", "date", !isEditing, <CalendarDays size={16} className="text-[#a7e0a7]" />)}
          {renderInput("Valid Till", selectedProject?.quotationDetails?.validTill, (e) => handleNestedFieldChange("quotationDetails", "validTill", e.target.value), "", "date", !isEditing)}
          {renderInput("Quotation Amount", selectedProject?.quotationDetails?.quotationAmount, (e) => handleNestedFieldChange("quotationDetails", "quotationAmount", e.target.value), "Enter quotation amount", "number", !isEditing, <IndianRupee size={16} className="text-[#a7e0a7]" />)}
        </div>
        {renderTextarea("Quotation Notes", selectedProject?.quotationDetails?.notes, (e) => handleNestedFieldChange("quotationDetails", "notes", e.target.value), "Add quotation remarks / scope / inclusions", !isEditing, 5)}
        <div className="rounded-[22px] border border-dashed border-[#a7e0a7]/30 bg-[#0d1729]/70 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Upload Quotation Document</h3>
              <p className="mt-1 text-sm text-white/50">Upload quotation PDF, sheet, client approval copy, or costing document.</p>
              <p className="mt-3 text-sm text-[#a7e0a7]">{selectedProject?.quotationDetails?.quotationDocument ? selectedProject.quotationDetails.quotationDocument.name : "No file selected"}</p>
            </div>
            <div className="flex gap-3">
              <input ref={quotationFileInputRef} type="file" onChange={handleQuotationFileUpload} className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" />
              <button type="button" onClick={() => quotationFileInputRef.current?.click()} disabled={!isEditing} className="inline-flex items-center gap-2 rounded-2xl bg-[#8B5A2B] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50">
                <Upload size={16} /> Upload File
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFinalOrderSection = () => (
    <div className="space-y-5">
      <div className="border-b border-white/10 pb-4"><h3 className="text-xl font-semibold text-white">Step 3 - Final Order</h3><p className="mt-1 text-sm text-white/55">Final order details with updated project information, current stage, estimation cost, description, stages, and image uploads.</p></div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {renderInput("Updated Details", selectedProject?.finalOrder?.updatedDetails, (e) => handleNestedFieldChange("finalOrder", "updatedDetails", e.target.value), "Enter latest project/order details")}
        <div className="rounded-[22px] border border-white/10 bg-[#0d1729]/70 p-4">
          <label className="mb-2 text-sm font-medium text-white/80">Current Stage of Project</label>
          <select value={selectedProject?.finalOrder?.currentStage || ""} onChange={(e) => handleNestedFieldChange("finalOrder", "currentStage", e.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#a7e0a7]/40 focus:ring-2 focus:ring-[#a7e0a7]/20">
            <option className="bg-[#0f172a]" value="">Select stage</option>
            {vendorConfig.finalOrderStages.map((stage) => <option key={stage} className="bg-[#0f172a]" value={stage}>{stage}</option>)}
          </select>
        </div>
        {renderInput("Estimation Cost", selectedProject?.finalOrder?.estimationCost || selectedProject?.estimatedCost, (e) => handleNestedFieldChange("finalOrder", "estimationCost", e.target.value), "Enter final estimation cost", "number")}
        {renderInput("Project Main Stage / Label", selectedProject?.finalOrder?.stages, (e) => handleNestedFieldChange("finalOrder", "stages", e.target.value), "Ex: Production + Dispatch / Site + Installation")}
      </div>
      {renderTextarea("Final Order Description", selectedProject?.finalOrder?.description, (e) => handleNestedFieldChange("finalOrder", "description", e.target.value), "Add final order scope, materials, confirmed work, stage notes", false, 5)}
      <div className="rounded-[22px] border border-dashed border-[#a7e0a7]/30 bg-[#0d1729]/70 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div><h3 className="text-sm font-semibold text-white">Upload Stage / Order Images</h3><p className="mt-1 text-sm text-white/50">Upload stage images, production photos, material references, or order-related visuals.</p><div className="mt-3">{renderFileNames(selectedProject?.finalOrder?.images)}</div></div>
          <div className="flex gap-3"><input ref={finalOrderImageRef} type="file" multiple onChange={(e) => handleArrayFilesChange("finalOrder", "images", e.target.files)} className="hidden" accept=".jpg,.jpeg,.png,.webp" /><button type="button" onClick={() => finalOrderImageRef.current?.click()} className="inline-flex items-center gap-2 rounded-2xl bg-[#8B5A2B] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"><ImageIcon size={16} /> Upload Images</button></div>
        </div>
      </div>
    </div>
  );

  const renderUpdateSection = () => (
    <div className="space-y-5">
      <div className="border-b border-white/10 pb-4"><h3 className="text-xl font-semibold text-white">Step 4 - Update</h3><p className="mt-1 text-sm text-white/55">Dynamic project update section with progress tracking, next action, follow-up, and supporting attachments.</p></div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-[22px] border border-white/10 bg-[#0d1729]/70 p-4">
          <label className="mb-2 text-sm font-medium text-white/80">Update Type</label>
          <select value={selectedProject?.updatesSection?.updateType || ""} onChange={(e) => handleNestedFieldChange("updatesSection", "updateType", e.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#a7e0a7]/40 focus:ring-2 focus:ring-[#a7e0a7]/20">
            <option className="bg-[#0f172a]" value="">Select update type</option>
            {vendorConfig.updateTypes.map((item) => <option key={item} className="bg-[#0f172a]" value={item}>{item}</option>)}
          </select>
        </div>
        {renderInput("Progress Title", selectedProject?.updatesSection?.progressTitle, (e) => handleNestedFieldChange("updatesSection", "progressTitle", e.target.value), "Enter short update title")}
        {renderInput("Next Action", selectedProject?.updatesSection?.nextAction, (e) => handleNestedFieldChange("updatesSection", "nextAction", e.target.value), "Enter next action")}
        {renderInput("Follow-up Date", selectedProject?.updatesSection?.followUpDate, (e) => handleNestedFieldChange("updatesSection", "followUpDate", e.target.value), "", "date")}
      </div>
      {renderTextarea("Progress Note", selectedProject?.updatesSection?.progressNote, (e) => handleNestedFieldChange("updatesSection", "progressNote", e.target.value), "Add latest work update, client status, material status, or internal note", false, 5)}
      <div className="rounded-[22px] border border-white/10 bg-[#0d1729]/70 p-4">
        <label className="mb-2 text-sm font-medium text-white/80">Progress Percentage ({selectedProject?.updatesSection?.progressPercent || 0}%)</label>
        <input type="range" min="0" max="100" value={selectedProject?.updatesSection?.progressPercent || 0} onChange={(e) => handleNestedFieldChange("updatesSection", "progressPercent", Number(e.target.value))} className="w-full accent-[#a7e0a7]" />
      </div>
      <div className="rounded-[22px] border border-dashed border-[#a7e0a7]/30 bg-[#0d1729]/70 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div><h3 className="text-sm font-semibold text-white">Upload Update Attachments</h3><p className="mt-1 text-sm text-white/50">Upload screenshots, update sheets, progress images, or site files.</p><div className="mt-3">{renderFileNames(selectedProject?.updatesSection?.attachments)}</div></div>
          <div className="flex gap-3"><input ref={updateAttachmentRef} type="file" multiple onChange={(e) => handleArrayFilesChange("updatesSection", "attachments", e.target.files)} className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" /><button type="button" onClick={() => updateAttachmentRef.current?.click()} className="inline-flex items-center gap-2 rounded-2xl bg-[#8B5A2B] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"><Upload size={16} /> Upload Attachments</button></div>
        </div>
      </div>
    </div>
  );

  const renderClosingSection = () => (
    <div className="space-y-5">
      <div className="border-b border-white/10 pb-4"><h3 className="text-xl font-semibold text-white">Step 5 - Closing</h3><p className="mt-1 text-sm text-white/55">Closing section with current stage, final images, project wrap-up, approvals, and completion checklist.</p></div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {renderInput("Current Stage", selectedProject?.closingSection?.currentStage || selectedProject?.finalOrder?.currentStage || selectedProject?.step, (e) => handleNestedFieldChange("closingSection", "currentStage", e.target.value), "Enter current closing stage")}
        {renderInput("Closing Requirements", selectedProject?.closingSection?.closingRequirements, (e) => handleNestedFieldChange("closingSection", "closingRequirements", e.target.value), "Ex: final cleaning, sign-off, payment, handover file")}
      </div>
      {renderTextarea("Closing Summary", selectedProject?.closingSection?.closingSummary, (e) => handleNestedFieldChange("closingSection", "closingSummary", e.target.value), "Add final completion note, delivery note, pending observations, or handover summary", false, 5)}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {vendorConfig.closingChecks.map((item, index) => {
          const keyMap = { 0: "supportShared", 1: "clientApproved", 2: "paymentClosed", 3: "handoverDone", 4: "supportShared" };
          const mappedKey = keyMap[index] || "supportShared";
          return (
            <label key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d1729]/70 px-4 py-4 text-sm text-white/80">
              <input type="checkbox" checked={Boolean(selectedProject?.closingSection?.[mappedKey])} onChange={(e) => handleNestedFieldChange("closingSection", mappedKey, e.target.checked)} className="h-4 w-4 rounded border-white/20 accent-[#a7e0a7]" />
              <span>{item}</span>
            </label>
          );
        })}
      </div>
      <div className="rounded-[22px] border border-dashed border-[#a7e0a7]/30 bg-[#0d1729]/70 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div><h3 className="text-sm font-semibold text-white">Upload Final Closing Images</h3><p className="mt-1 text-sm text-white/50">Upload handover images, installed product images, final completion photos, or client delivery visuals.</p><div className="mt-3">{renderFileNames(selectedProject?.closingSection?.finalImages)}</div></div>
          <div className="flex gap-3"><input ref={closingImageRef} type="file" multiple onChange={(e) => handleArrayFilesChange("closingSection", "finalImages", e.target.files)} className="hidden" accept=".jpg,.jpeg,.png,.webp" /><button type="button" onClick={() => closingImageRef.current?.click()} className="inline-flex items-center gap-2 rounded-2xl bg-[#8B5A2B] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"><ImageIcon size={16} /> Upload Closing Images</button></div>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (selectedProject?.step) {
      case "Estimation": return renderEstimationSection();
      case "Quotation": return renderQuotationSection();
      case "Final Order": return renderFinalOrderSection();
      case "Update": return renderUpdateSection();
      case "Closing": return renderClosingSection();
      default: return renderEstimationSection();
    }
  };

  const summaryCurrentImagesCount = (selectedProject?.finalOrder?.images?.length || 0) + (selectedProject?.closingSection?.finalImages?.length || 0);

  if (loading) {
    return <div className="min-h-screen bg-[#05070d] flex items-center justify-center"><div className="text-white text-xl">Loading estimations...</div></div>;
  }

  return (
    <div className="min-h-screen bg-[#05070d] p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto max-w-400 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] text-[#a7e0a7] uppercase">Vendor Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Estimation Management</h1>
            <p className="mt-2 text-sm text-white/60 sm:text-base">Manage vendor estimations, quotations, final orders, updates, and closings in one place.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition hover:bg-white/10">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#a7e0a7]" />
            </button>
            <button onClick={handleAddProject} className="inline-flex items-center gap-2 rounded-2xl bg-[#a7e0a7] px-5 py-3 text-sm font-semibold text-[#111827] shadow-[0_12px_30px_rgba(167,224,167,0.25)] transition hover:scale-[1.02]">
              <Plus size={18} /> Add New Estimation
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"><p className="text-sm text-white/60">Total Projects</p><h3 className="mt-2 text-3xl font-bold text-white">{totalProjects}</h3></div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"><p className="text-sm text-white/60">Active Estimations</p><h3 className="mt-2 text-3xl font-bold text-[#a7e0a7]">{activeEstimations}</h3></div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"><p className="text-sm text-white/60">Total Estimated Value</p><h3 className="mt-2 text-3xl font-bold text-white">₹{totalValue.toLocaleString("en-IN")}</h3></div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"><p className="text-sm text-white/60">Closed Projects</p><h3 className="mt-2 text-3xl font-bold text-[#8B5A2B]">{completedClosings}</h3></div>
        </div>

        {/* Search */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-2xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input type="text" placeholder="Search by project name, client, location, vendor or status..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="h-14 w-full rounded-2xl border border-white/10 bg-[#0b1324]/80 pl-12 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#a7e0a7]/40 focus:ring-2 focus:ring-[#a7e0a7]/20" />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.92fr_1.45fr]">
          {/* Left Column – Project List */}
          <div className="min-w-0 rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div><h2 className="text-xl font-semibold text-white">Estimation Projects</h2><p className="mt-1 text-sm text-white/50">Dynamic vendor-wise estimation records</p></div>
              <span className="rounded-full border border-[#a7e0a7]/20 bg-[#a7e0a7]/10 px-3 py-1 text-xs font-semibold text-[#dfffdc]">{filteredProjects.length} Records</span>
            </div>
            <div className="space-y-4">
              {filteredProjects.length > 0 ? filteredProjects.map((project) => (
                <button key={project.id} onClick={() => setSelectedProjectId(project.id)} className={`w-full rounded-3xl border p-4 text-left transition ${selectedProjectId === project.id ? "border-[#a7e0a7]/30 bg-[#0d1729] shadow-[0_10px_30px_rgba(167,224,167,0.08)]" : "border-white/10 bg-white/3 hover:bg-white/6"}`}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#8B5A2B]/20 px-3 py-1 text-xs font-medium text-[#f0d0a8]">{project.step}</span>
                        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${priorityStyles[project.priority]}`}>{project.priority} Priority</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">{project.vendorType}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{project.projectName || "Untitled Project"}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-white/55"><span>Client: {project.clientName || "N/A"}</span><span>Location: {project.location || "N/A"}</span></div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-white/50">Estimated Cost</p>
                      <p className="text-xl font-bold text-[#a7e0a7]">₹{Number(project.estimatedCost || 0).toLocaleString("en-IN")}</p>
                      <p className="mt-2 text-xs text-white/40">Updated {project.updatedAt}</p>
                    </div>
                  </div>
                </button>
              )) : <div className="rounded-3xl border border-dashed border-white/10 bg-white/3 p-8 text-center"><p className="text-white/60">No projects found.</p></div>}
            </div>
          </div>

          {/* Right Column – Details Form */}
          <div className="min-w-0 space-y-6">
            {/* Workflow Steps */}
            <div className="overflow-x-auto rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-5">
              <div className="flex w-max min-w-full gap-3 pb-2">
                {workflowSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === activeStep;
                  const isCompleted = index < activeStep;
                  return (
                    <div key={step.name} className="flex items-center gap-3">
                      <div className="flex min-w-40 sm:min-w-45 items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-4 py-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isActive ? "bg-[#a7e0a7] text-[#111827]" : isCompleted ? "bg-[#8B5A2B] text-white" : "bg-white/10 text-white/50"}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${isActive ? "text-white" : isCompleted ? "text-white/90" : "text-white/50"}`}>{step.name}</p>
                          <p className="text-xs text-white/40">Step {index + 1}</p>
                        </div>
                      </div>
                      {index !== workflowSteps.length - 1 && <div className="hidden h-0.5 w-10 rounded-full bg-white/10 sm:block" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step Form */}
            <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[1.4fr_0.8fr]">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6">
                <div className="mb-6 flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold text-white">{selectedProject?.step} Details</h2>
                  <p className="text-sm text-white/55">Dynamic step-based forms that can vary by vendor type without breaking your UI.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {renderStepContent()}
                  <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <button type="button" onClick={handlePrevStep} disabled={activeStep === 0} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40">Previous Step</button>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button type="button" onClick={handleNextStep} className="rounded-2xl bg-[#a7e0a7] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:scale-[1.02]">Next Step</button>
                      <button type="submit" disabled={submitting} className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#111827] transition hover:scale-[1.02] disabled:opacity-50">{submitting ? "Saving..." : "Submit Details"}</button>
                    </div>
                  </div>
                  {error && <div className="text-red-400 text-sm text-center">{error}</div>}
                </form>
              </div>

              {/* Right Side Summary */}
              <div className="space-y-6">
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                  <h3 className="text-xl font-semibold text-white">Estimation Summary</h3>
                  <div className="mt-5 space-y-4 text-sm">
                    <div className="flex items-center justify-between text-white/70"><span>Current Stage</span><span className="font-semibold text-white">{selectedProject?.step}</span></div>
                    <div className="flex items-center justify-between text-white/70"><span>Vendor Type</span><span className="font-semibold text-white">{selectedProject?.vendorType}</span></div>
                    <div className="flex items-center justify-between text-white/70"><span>Client</span><span className="font-semibold text-white">{selectedProject?.clientName || "Not added"}</span></div>
                    <div className="flex items-center justify-between text-white/70"><span>Estimated Value</span><span className="font-semibold text-[#a7e0a7]">₹{Number(selectedProject?.estimatedCost || 0).toLocaleString("en-IN")}</span></div>
                    <div className="flex items-center justify-between text-white/70"><span>Priority</span><span className="font-semibold text-white">{selectedProject?.priority}</span></div>
                    <div className="flex items-center justify-between text-white/70"><span>Uploaded Images</span><span className="font-semibold text-white">{summaryCurrentImagesCount}</span></div>
                    <div className="pt-2">
                      <div className="mb-2 flex items-center justify-between text-xs text-white/50"><span>Workflow Progress</span><span>{Math.round(((activeStep + 1) / workflowSteps.length) * 100)}%</span></div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-linear-to-r from-[#a7e0a7] via-white to-[#8B5A2B]" style={{ width: `${((activeStep + 1) / workflowSteps.length) * 100}%` }} /></div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                  <h3 className="text-xl font-semibold text-white">Recent Status</h3>
                  <div className="mt-5 space-y-4">
                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/3 p-4"><CheckCircle2 size={18} className="mt-0.5 text-[#a7e0a7]" /><div><p className="text-sm font-medium text-white">Workflow updated to {selectedProject?.step}</p><p className="mt-1 text-xs text-white/45">Latest project stage has been saved.</p></div></div>
                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/3 p-4"><Clock3 size={18} className="mt-0.5 text-[#8B5A2B]" /><div><p className="text-sm font-medium text-white">Last modified</p><p className="mt-1 text-xs text-white/45">{selectedProject?.updatedAt || "Just now"}</p></div></div>
                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/3 p-4"><FileText size={18} className="mt-0.5 text-white/70" /><div><p className="text-sm font-medium text-white">Document status</p><p className="mt-1 text-xs text-white/45">{selectedProject?.estimationDocument ? "An estimation document has been attached." : "No estimation document uploaded yet."}</p></div></div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-[#a7e0a7]/20 bg-[#a7e0a7]/5 p-5 backdrop-blur-xl">
                  <p className="text-sm leading-7 text-white/70">This UI now supports dynamic step-wise forms for different vendors. Step 1 and Step 2 include edit modes, Step 3 handles final order execution details, Step 4 tracks project updates, and Step 5 manages closing requirements with images and completion checks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estimation;