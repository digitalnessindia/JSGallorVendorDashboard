import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../utils/axios.js";

const VendorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", phone: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await axios.post("/api/vendors/login", {
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      if (response.data.success && response.data.token) {
        localStorage.setItem("vendorToken", response.data.token);
        localStorage.setItem("vendor", JSON.stringify(response.data.vendor));
        navigate("/"); // Redirect to home page after login
      } else {
        setErrorMsg("Invalid response from server");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#473425] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-xl relative">
        {/* Decorative blurred circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#C6A43B]/10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C6A43B]/10 blur-3xl rounded-full"></div>

        {/* Card */}
        <div className="relative rounded-[28px] border border-white/10 bg-white backdrop-blur-xl shadow-[0_0_50px_rgba(255,193,7,0.08)] p-6 sm:p-8 lg:p-10">
          <div className="mb-8 text-center">
            <span className="text-[#8B5A2B] text-sm font-semibold tracking-[0.2em] uppercase">
              Vendor Login
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">
              Welcome Back
            </h3>
            <p className="text-gray-700 mt-3 text-sm sm:text-base leading-7">
              Access your vendor dashboard to manage your profile, projects, and products.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-[#8B5A2B] font-medium mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="hello@studio.com"
                className="w-full rounded-xl border border-gray-300 bg-white/5 text-gray-900 placeholder:text-gray-700 px-4 py-3 outline-none focus:border-[#C6A43B] focus:ring-2 focus:ring-[#C6A43B]/30 transition"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-[#8B5A2B] font-medium mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter registered mobile number"
                className="w-full rounded-xl border border-gray-300 bg-white/5 text-gray-900 placeholder:text-gray-700 px-4 py-3 outline-none focus:border-[#C6A43B] focus:ring-2 focus:ring-[#C6A43B]/30 transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[#8B5A2B] font-medium mb-2">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 bg-white/5 text-gray-900 placeholder:text-gray-700 px-4 py-3 outline-none focus:border-[#C6A43B] focus:ring-2 focus:ring-[#C6A43B]/30 transition"
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-700 p-3 text-sm">
                {errorMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-xl bg-[#C6A43B] text-black font-semibold py-4 shadow-md transition-all flex justify-center items-center gap-2 hover:bg-[#d6b24a] ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login →"}
            </button>

            {/* Additional Links */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-700">
                Don't have an account?{" "}
                <Link to="/vendor-register" className="text-[#C6A43B] font-semibold hover:underline">
                  Register as a vendor
                </Link>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Use the same email and phone number you registered with.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VendorLogin;