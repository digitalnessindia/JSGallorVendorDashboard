import React, { useState, useRef } from "react";
import axios from "../utils/axios.js";

const categoriesList = [
  { id: 1, title: "Interior Designing" },
  { id: 2, title: "Interior Architecture" },
  { id: 3, title: "Lighting" },
  { id: 4, title: "False Ceiling" },
  { id: 5, title: "Curtains and Beds" },
  { id: 6, title: "Polishing and Painting" },
  { id: 7, title: "Interior Art Work" },
  { id: 8, title: "Glass Partition" },
  { id: 9, title: "Modular Kitchen" },
  { id: 10, title: "Wardrobes" },
  { id: 11, title: "Furniture Manufacturing" },
  { id: 12, title: "Wood Work" },
  { id: 13, title: "Civil Work" },
  { id: 14, title: "Flooring" },
  { id: 15, title: "Wallpaper" },
  { id: 16, title: "Home Automation" },
  { id: 17, title: "Other" },
];

const initialFormData = {
  vendorName: "",
  businessName: "",
  gstNo: "",
  businessType: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  location: "",
  yearsExp: "",
  category: "",
  otherCategory: "",
  servicesOffered: "",
  projectsCompleted: "",
  projectNames: "",
  previousWork: "",
  professionalExpertise: "",
  businessDesc: "",
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState(initialFormData);

  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [productImages, setProductImages] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const portfolioInputRef = useRef(null);
  const productInputRef = useRef(null);

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white/5 text-gray-900 placeholder:text-gray-700 px-4 py-3 outline-none focus:border-[#C6A43B] focus:ring-2 focus:ring-[#C6A43B]/30";

  const labelClass = "block text-[#8B5A2B] font-medium mb-2";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && value !== "Other"
        ? { otherCategory: "" }
        : {}),
    }));

    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handlePortfolioChange = (e) => {
    setPortfolioFiles(Array.from(e.target.files));
  };

  const handleProductImagesChange = (e) => {
    setProductImages(Array.from(e.target.files));
  };

  const validatePassword = () => {
    const { password, confirmPassword } = formData;

    if (!password.trim()) {
      setPasswordError("Password is required.");
      return false;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    if (formData.category === "Other" && !formData.otherCategory.trim()) {
      setErrorMsg("Please enter your other category.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMsg("");
    setErrorMsg("");

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "confirmPassword") return;
      if (key === "otherCategory") return;

      if (key === "category") {
        data.append(
          "category",
          formData.category === "Other"
            ? formData.otherCategory.trim()
            : formData.category
        );
        return;
      }

      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    portfolioFiles.forEach((file) => data.append("portfolioFiles", file));
    productImages.forEach((file) => data.append("productImages", file));

    try {
      const response = await axios.post("/api/vendors/register", data);

      if (response.data.success) {
        setSubmitMsg(
          "✅ Registration request sent successfully! Pending admin approval."
        );

        setFormData(initialFormData);
        setPortfolioFiles([]);
        setProductImages([]);

        if (portfolioInputRef.current) portfolioInputRef.current.value = "";
        if (productInputRef.current) productInputRef.current.value = "";
      } else {
        setErrorMsg(
          response.data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMsg(
        error.response?.data?.message ||
          "Something went wrong. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-[#473425] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#C6A43B]/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C6A43B]/10 blur-3xl rounded-full" />

        <div className="relative rounded-[28px] border border-white/10 bg-white backdrop-blur-xl shadow-[0_0_50px_rgba(255,193,7,0.08)] p-6 sm:p-8 lg:p-10">
          <div className="mb-8">
            <span className="text-[#8B5A2B] text-sm font-semibold tracking-[0.2em] uppercase">
              Vendor Onboarding
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">
              Vendor Profile & Registration
            </h3>

            <p className="text-gray-700 mt-3 max-w-2xl text-sm sm:text-base leading-7">
              Join JS Gallor and showcase your craftsmanship, products, and
              interior expertise through a premium vendor network.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Vendor Name *</label>
                <input
                  type="text"
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  placeholder="Legal business / studio name"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>GST No.</label>
                <input
                  type="text"
                  name="gstNo"
                  value={formData.gstNo}
                  onChange={handleChange}
                  placeholder="Enter GST Number"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Business Type</label>
                <input
                  type="text"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  placeholder="Manufacturer, Contractor, Studio, Freelancer..."
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="hello@studio.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your mobile number"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create password"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter your password"
                  className={inputClass}
                />
              </div>
            </div>

            {passwordError && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {passwordError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Location / City *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Mumbai, Delhi, Hyderabad..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Years of Experience</label>
                <input
                  type="number"
                  name="yearsExp"
                  value={formData.yearsExp}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 8"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Primary Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 text-gray-700 px-4 py-3 outline-none focus:border-[#C6A43B] focus:ring-2 focus:ring-[#C6A43B]/30"
                >
                  <option value="">Select a specialty</option>
                  {categoriesList.map((cat) => (
                    <option key={cat.id} value={cat.title}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Services Offered</label>
                <input
                  type="text"
                  name="servicesOffered"
                  value={formData.servicesOffered}
                  onChange={handleChange}
                  placeholder="Modular kitchen, false ceiling, lighting..."
                  className={inputClass}
                />
              </div>
            </div>

            {formData.category === "Other" && (
              <div>
                <label className={labelClass}>Enter Other Category *</label>
                <input
                  type="text"
                  name="otherCategory"
                  value={formData.otherCategory}
                  onChange={handleChange}
                  required
                  placeholder="Enter your category"
                  className={inputClass}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Projects Completed</label>
                <input
                  type="number"
                  name="projectsCompleted"
                  value={formData.projectsCompleted}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 25"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Specify Project Names</label>
                <input
                  type="text"
                  name="projectNames"
                  value={formData.projectNames}
                  onChange={handleChange}
                  placeholder="Project A, Project B, Project C..."
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Previous Work Experience / Notable Projects
              </label>
              <textarea
                name="previousWork"
                rows="3"
                value={formData.previousWork}
                onChange={handleChange}
                placeholder="Describe past residential/commercial projects..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Professional Expertise</label>
              <textarea
                name="professionalExpertise"
                rows="3"
                value={formData.professionalExpertise}
                onChange={handleChange}
                placeholder="Luxury interiors, Vastu planning, 3D visualization, AutoCAD..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Short Business Description *</label>
              <textarea
                name="businessDesc"
                rows="3"
                value={formData.businessDesc}
                onChange={handleChange}
                required
                placeholder="Tell us about your design philosophy, materials, or unique style"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-300 bg-white/5 p-4">
                <label className={labelClass}>📁 Portfolio Upload</label>
                <input
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={handlePortfolioChange}
                  ref={portfolioInputRef}
                  className="w-full text-sm text-gray-700 file:mr-3 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:bg-[#C6A43B]/15 file:text-[#EAB308] hover:file:bg-[#C6A43B]/25"
                />

                {portfolioFiles.length > 0 && (
                  <p className="text-xs text-gray-600 mt-2">
                    {portfolioFiles.length} file(s) selected
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-gray-300 bg-white/5 p-4">
                <label className={labelClass}>🖼️ Product Images Upload</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleProductImagesChange}
                  ref={productInputRef}
                  className="w-full text-sm text-gray-700 file:mr-3 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:bg-[#C6A43B]/15 file:text-[#EAB308] hover:file:bg-[#C6A43B]/25"
                />

                {productImages.length > 0 && (
                  <p className="text-xs text-gray-600 mt-2">
                    {productImages.length} image(s) selected
                  </p>
                )}
              </div>
            </div>

            {submitMsg && (
              <div className="rounded-xl border border-green-500/30 bg-green-500/10 text-green-700 p-3 text-sm">
                {submitMsg}
              </div>
            )}

            {errorMsg && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-700 p-3 text-sm">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-xl bg-[#C6A43B] text-black font-semibold py-4 shadow-md transition-all flex justify-center items-center gap-2 hover:bg-[#d6b24a] ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Registration →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;