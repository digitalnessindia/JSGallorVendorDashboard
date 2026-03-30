import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
} from "lucide-react";

const initialVendorData = {
  companyName: "GAMLAWALA",
  legalName: "KUSHAL INDUSTRIES (UNIT 1)",
  companyType: "Proprietorship",
  email: "gamlawalagogreen@gmail.com",
  phonePrimary: "",
  phoneSecondary: "7013592698",
  location: "Katedan, Hyderabad, India",
  status: "Pending",
  registeredOn: "3/20/2026",
  relationWithJsGallor: "Direct Vendor",
  natureOfBusiness: "Manufacturer",
  yearEstablished: "2026",
  employees: "50",
  pan: "ARXPJ8192N",
  gst: "36ARXPJ8192N1ZL",
  itemsInterested: "POTS",
  countriesExported: "Not provided",
  legalDisputes: "None reported",
  additionalInfo: "No additional information provided",
  totalOrders: "0",
  totalRevenue: "₹0",
  activeProducts: "0",
  factoriesLinked: "0",
};

const initialDocuments = [
  {
    id: 1,
    name: "PAN Document",
    type: "PAN",
    fileName: "pan-document.pdf",
    uploadedAt: "2026-03-20",
    status: "Uploaded",
  },
  {
    id: 2,
    name: "GST Certificate",
    type: "GST",
    fileName: "gst-certificate.pdf",
    uploadedAt: "2026-03-20",
    status: "Uploaded",
  },
];

const VendorProfile = () => {
  const navigate = useNavigate();

  const [vendorData, setVendorData] = useState(initialVendorData);
  const [formData, setFormData] = useState(initialVendorData);
  const [documents, setDocuments] = useState(initialDocuments);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState("Legal Document");
  const [lastUpdated, setLastUpdated] = useState("Today");

  const documentInputRef = useRef(null);

  const stats = useMemo(
    () => [
      {
        title: "Total Orders",
        value: vendorData.totalOrders || "0",
        icon: <Package size={22} />,
      },
      {
        title: "Total Revenue",
        value: vendorData.totalRevenue || "₹0",
        icon: <BadgeIndianRupee size={22} />,
      },
      {
        title: "Active Products",
        value: vendorData.activeProducts || "0",
        icon: <Boxes size={22} />,
      },
      {
        title: "Factories Linked",
        value: vendorData.factoriesLinked || "0",
        icon: <Factory size={22} />,
      },
    ],
    [vendorData]
  );

  const openEditModal = () => {
    setFormData(vendorData);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setVendorData(formData);
    setLastUpdated(new Date().toLocaleDateString());
    setIsEditModalOpen(false);
  };

  const openDocumentsModal = () => {
    setIsDocumentsModalOpen(true);
  };

  const closeDocumentsModal = () => {
    setIsDocumentsModalOpen(false);
  };

  const handleUploadClick = (docType = "Legal Document") => {
    setSelectedDocumentType(docType);
    documentInputRef.current?.click();
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newDocs = files.map((file, index) => ({
      id: Date.now() + index,
      name: selectedDocumentType,
      type: selectedDocumentType,
      fileName: file.name,
      uploadedAt: new Date().toISOString().split("T")[0],
      status: "Uploaded",
      file,
    }));

    setDocuments((prev) => [...prev, ...newDocs]);
    setIsDocumentsModalOpen(true);
    e.target.value = "";
  };

  const profileCompletion = useMemo(() => {
    const requiredFields = [
      vendorData.companyName,
      vendorData.legalName,
      vendorData.companyType,
      vendorData.email,
      vendorData.location,
      vendorData.natureOfBusiness,
      vendorData.yearEstablished,
      vendorData.employees,
      vendorData.pan,
      vendorData.gst,
    ];

    const filledFields = requiredFields.filter(
      (item) => item !== undefined && item !== null && String(item).trim() !== ""
    ).length;

    return Math.round((filledFields / requiredFields.length) * 100);
  }, [vendorData]);

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

        {/* Top Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#234b36] sm:text-4xl">
              Vendor Profile
            </h1>
            <p className="mt-2 text-sm text-[#5f7467] sm:text-base">
              Welcome to your manufacturer dashboard
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="relative rounded-xl border border-[#d7e3d9] bg-white p-3 text-[#2d6a4f] shadow-sm transition hover:bg-[#eef5ef]"
            >
              <Bell size={20} />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#5c8f6b] text-xs font-semibold text-white">
                3
              </span>
            </button>

            <button
              type="button"
              className="relative rounded-xl border border-[#d7e3d9] bg-white p-3 text-[#2d6a4f] shadow-sm transition hover:bg-[#eef5ef]"
            >
              <ShoppingCart size={20} />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d3b97a] text-xs font-semibold text-[#264736]">
                5
              </span>
            </button>

            <button
              type="button"
              onClick={openEditModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2d6a4f] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#245640] sm:px-5"
            >
              <Pencil size={18} />
              Edit Profile
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
                  {vendorData.companyName || "Company Name"}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#d7c18b] bg-[#fbf5e4] px-4 py-1.5 text-sm font-semibold text-[#8a6a1f]">
                    <Clock3 size={15} />
                    {vendorData.status || "Pending"}
                  </span>
                  <span className="text-sm text-[#667a6f] sm:text-base">
                    Registered on {vendorData.registeredOn || "-"}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-[#5f7467] sm:text-base">
                  {vendorData.legalName || "-"} • {vendorData.companyType || "-"} •{" "}
                  {vendorData.location || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#dbe6dc] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-[#6c8074]">{item.title}</p>
                  <h3 className="mt-2 text-3xl font-bold text-[#234b36]">
                    {item.value}
                  </h3>
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
          {/* Left Content */}
          <div className="space-y-6 xl:col-span-8">
            <div className="rounded-3xl border border-[#dbe6dc] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-[#234b36]">
                <Building2 size={24} className="text-[#2d6a4f]" />
                Company Information
              </h3>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-[#6c8074]">Company Name</p>
                    <h4 className="mt-1 text-xl font-semibold text-[#234b36]">
                      {vendorData.companyName || "Not provided"}
                    </h4>
                  </div>

                  <div>
                    <p className="text-sm text-[#6c8074]">Legal Name</p>
                    <h4 className="mt-1 wrap-break-word text-lg font-semibold text-[#234b36]">
                      {vendorData.legalName || "Not provided"}
                    </h4>
                  </div>

                  <div>
                    <p className="text-sm text-[#6c8074]">Company Type</p>
                    <h4 className="mt-1 text-lg font-semibold text-[#234b36]">
                      {vendorData.companyType || "Not provided"}
                    </h4>
                  </div>

                  <div>
                    <p className="text-sm text-[#6c8074]">Email Address</p>
                    <h4 className="mt-1 flex items-start gap-2 break-all text-lg font-semibold text-[#234b36]">
                      <Mail size={18} className="mt-1 shrink-0 text-[#5c8f6b]" />
                      {vendorData.email || "Not provided"}
                    </h4>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-[#6c8074]">Contact Numbers</p>
                    <h4 className="mt-1 flex items-center gap-2 text-lg font-semibold text-[#234b36]">
                      <Phone size={18} className="shrink-0 text-[#5c8f6b]" />
                      {vendorData.phonePrimary || "Not provided"}
                    </h4>
                    <h4 className="mt-2 flex items-center gap-2 break-all text-lg font-semibold text-[#234b36]">
                      <Phone size={18} className="shrink-0 text-[#5c8f6b]" />
                      {vendorData.phoneSecondary || "Not provided"}
                    </h4>
                  </div>

                  <div>
                    <p className="text-sm text-[#6c8074]">Location</p>
                    <h4 className="mt-1 flex items-start gap-2 wrap-break-word text-lg font-semibold text-[#234b36]">
                      <MapPin size={18} className="mt-1 shrink-0 text-[#5c8f6b]" />
                      {vendorData.location || "Not provided"}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#dbe6dc] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-[#234b36]">
                <Factory size={24} className="text-[#2d6a4f]" />
                Business Details
              </h3>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-[#6c8074]">Nature of Business</p>
                    <h4 className="mt-1 text-xl font-semibold text-[#234b36]">
                      {vendorData.natureOfBusiness || "Not provided"}
                    </h4>
                  </div>

                  <div>
                    <p className="text-sm text-[#6c8074]">Year Established</p>
                    <h4 className="mt-1 flex items-center gap-2 text-xl font-semibold text-[#234b36]">
                      <CalendarDays size={18} className="text-[#5c8f6b]" />
                      {vendorData.yearEstablished || "Not provided"}
                    </h4>
                  </div>

                  <div>
                    <p className="text-sm text-[#6c8074]">Full-Time Employees</p>
                    <h4 className="mt-1 flex items-center gap-2 text-xl font-semibold text-[#234b36]">
                      <Users size={18} className="text-[#5c8f6b]" />
                      {vendorData.employees || "Not provided"}
                    </h4>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-[#6c8074]">Legal Documents</p>
                    <h4 className="mt-1 flex items-start gap-2 break-all text-lg font-semibold text-[#234b36]">
                      <FileText size={18} className="mt-1 shrink-0 text-[#5c8f6b]" />
                      PAN: {vendorData.pan || "Not provided"}
                    </h4>
                    <h4 className="mt-2 flex items-start gap-2 break-all text-lg font-semibold text-[#234b36]">
                      <FileText size={18} className="mt-1 shrink-0 text-[#5c8f6b]" />
                      GST/VAT: {vendorData.gst || "Not provided"}
                    </h4>
                  </div>

                  <div>
                    <p className="text-sm text-[#6c8074]">Relation with JS Gallor</p>
                    <h4 className="mt-1 text-lg font-semibold text-[#234b36]">
                      {vendorData.relationWithJsGallor || "Not provided"}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

           
          </div>

          {/* Right Content */}
          <div className="space-y-6 xl:col-span-4">
            <div className="rounded-3xl border border-[#dbe6dc] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-5 flex items-center gap-2 text-2xl font-bold text-[#234b36]">
                <ShieldCheck size={24} className="text-[#2d6a4f]" />
                Verification Status
              </h3>

              <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#fbf5e4] px-4 py-3">
                <div>
                  <p className="text-sm text-[#6c8074]">Account Status</p>
                  <h4 className="mt-1 text-lg font-bold text-[#8a6a1f]">
                    {vendorData.status || "Pending"}
                  </h4>
                </div>

                <span className="rounded-full border border-[#d7c18b] bg-[#fff9e7] px-4 py-1.5 text-sm font-semibold text-[#8a6a1f]">
                  {vendorData.status || "Pending"}
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
                    {vendorData.status || "Pending"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#dbe6dc] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-5 text-2xl font-bold text-[#234b36]">
                Quick Actions
              </h3>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={openEditModal}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2d6a4f] px-4 py-3 font-semibold text-white transition hover:bg-[#245640]"
                >
                  <Pencil size={18} />
                  Edit Profile
                </button>

                <button
                  type="button"
                  onClick={() => handleUploadClick("Legal Document")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#d7e3d9] bg-[#eef5ef] px-4 py-3 font-semibold text-[#234b36] transition hover:bg-[#e4eee6]"
                >
                  <Upload size={18} />
                  Upload Documents
                </button>

                <button
                  type="button"
                  onClick={openDocumentsModal}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e3e9e4] bg-[#f8faf8] px-4 py-3 font-semibold text-[#234b36] transition hover:bg-[#eef5ef]"
                >
                  <Eye size={18} />
                  View 
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-[#dbe6dc] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-5 text-2xl font-bold text-[#234b36]">
                Account Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-[#edf1ee] pb-3">
                  <span className="text-[#5f7467]">Registration Date</span>
                  <span className="font-semibold text-[#234b36]">
                    {vendorData.registeredOn || "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-[#edf1ee] pb-3">
                  <span className="text-[#5f7467]">Member Since</span>
                  <span className="font-semibold text-[#234b36]">0 months</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#5f7467]">Last Updated</span>
                  <span className="font-semibold text-[#234b36]">{lastUpdated}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#dbe6dc] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-4 text-2xl font-bold text-[#234b36]">
                Need Help?
              </h3>

              <p className="mb-5 text-sm leading-6 text-[#5f7467] sm:text-base">
                For profile verification or document updates, contact our vendor
                support team.
              </p>

              <button
                type="button"
                onClick={() => navigate("/help")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#dbe8dd] px-4 py-3 font-semibold text-[#234b36] transition hover:bg-[#d0e0d3]"
              >
                <Headset size={18} />
                Contact Support
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
                type="button"
                onClick={closeEditModal}
                className="rounded-xl p-2 text-[#5f7467] transition hover:bg-[#eef5ef]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleFormChange}
                  placeholder="Company Name"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleFormChange}
                  placeholder="Legal Name"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleFormChange}
                  placeholder="Company Type"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Email"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="phonePrimary"
                  value={formData.phonePrimary}
                  onChange={handleFormChange}
                  placeholder="Primary Phone"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="phoneSecondary"
                  value={formData.phoneSecondary}
                  onChange={handleFormChange}
                  placeholder="Secondary Phone"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  placeholder="Location"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  placeholder="Status"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="registeredOn"
                  value={formData.registeredOn}
                  onChange={handleFormChange}
                  placeholder="Registered On"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="relationWithJsGallor"
                  value={formData.relationWithJsGallor}
                  onChange={handleFormChange}
                  placeholder="Relation with JS Gallor"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="natureOfBusiness"
                  value={formData.natureOfBusiness}
                  onChange={handleFormChange}
                  placeholder="Nature of Business"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="yearEstablished"
                  value={formData.yearEstablished}
                  onChange={handleFormChange}
                  placeholder="Year Established"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="employees"
                  value={formData.employees}
                  onChange={handleFormChange}
                  placeholder="Employees"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="pan"
                  value={formData.pan}
                  onChange={handleFormChange}
                  placeholder="PAN"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="gst"
                  value={formData.gst}
                  onChange={handleFormChange}
                  placeholder="GST"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="itemsInterested"
                  value={formData.itemsInterested}
                  onChange={handleFormChange}
                  placeholder="Items Interested"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="countriesExported"
                  value={formData.countriesExported}
                  onChange={handleFormChange}
                  placeholder="Countries Exported / Projects Managed"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <input
                  name="legalDisputes"
                  value={formData.legalDisputes}
                  onChange={handleFormChange}
                  placeholder="Legal Disputes"
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b]"
                />
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleFormChange}
                  placeholder="Additional Information"
                  rows={4}
                  className="rounded-xl border border-[#dbe6dc] px-4 py-3 outline-none focus:border-[#5c8f6b] md:col-span-2"
                />
              </div>

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
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2d6a4f] px-5 py-3 font-semibold text-white transition hover:bg-[#245640]"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Documents / Reports Modal */}
      {isDocumentsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-8">
          <div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf1ee] px-5 py-4 sm:px-6">
              <h3 className="text-xl font-bold text-[#234b36] sm:text-2xl">
                Legal Documents & Reports
              </h3>
              <button
                type="button"
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
                  type="button"
                  onClick={() => handleUploadClick("Legal Document")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2d6a4f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#245640]"
                >
                  <Upload size={18} />
                  Upload Legal Documents
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#e7eee8]">
                <div className="hidden grid-cols-4 gap-4 bg-[#f7faf7] px-4 py-3 text-sm font-semibold text-[#4d6256] md:grid">
                  <div>Document Type</div>
                  <div>File Name</div>
                  <div>Uploaded Date</div>
                  <div>Status</div>
                </div>

                {documents.length > 0 ? (
                  <div className="divide-y divide-[#edf1ee]">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="grid grid-cols-1 gap-2 px-4 py-4 text-sm text-[#234b36] md:grid-cols-4 md:gap-4"
                      >
                        <div>
                          <span className="mr-2 font-semibold md:hidden">Type:</span>
                          {doc.type}
                        </div>
                        <div className="break-all">
                          <span className="mr-2 font-semibold md:hidden">File:</span>
                          {doc.fileName}
                        </div>
                        <div>
                          <span className="mr-2 font-semibold md:hidden">Uploaded:</span>
                          {doc.uploadedAt}
                        </div>
                        <div>
                          <span className="inline-flex rounded-full bg-[#e8f5eb] px-3 py-1 text-xs font-semibold text-[#2d6a4f]">
                            {doc.status}
                          </span>
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