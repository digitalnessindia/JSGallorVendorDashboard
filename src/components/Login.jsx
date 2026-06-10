import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../utils/axios.js";

const VendorLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [forgotData, setForgotData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [mode, setMode] = useState("login"); 
  // login | forgot | reset

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white/5 text-gray-900 placeholder:text-gray-700 px-4 py-3 outline-none focus:border-[#C6A43B] focus:ring-2 focus:ring-[#C6A43B]/30 transition";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleForgotChange = (e) => {
    setForgotData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await axios.post("/api/vendors/login", {
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      if (response.data.success && response.data.token) {
        localStorage.setItem("vendorToken", response.data.token);
        localStorage.setItem("vendor", JSON.stringify(response.data.vendor));
        navigate("/");
      } else {
        setErrorMsg("Invalid response from server");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await axios.post("/api/vendors/check-email", {
        email: forgotData.email.trim(),
      });

      if (response.data.success) {
        setSuccessMsg("Email verified. You can reset your password now.");
        setMode("reset");
      } else {
        setErrorMsg("Email not registered. Please register first.");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message ||
          "Email not registered. Please register first."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (!forgotData.newPassword.trim()) {
      setErrorMsg("New password is required.");
      setIsSubmitting(false);
      return;
    }

    if (forgotData.newPassword !== forgotData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post("/api/vendors/reset-password", {
        email: forgotData.email.trim(),
        newPassword: forgotData.newPassword,
      });

      if (response.data.success) {
        setSuccessMsg("Password reset successfully. Please login.");
        setForgotData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
        setMode("login");
      } else {
        setErrorMsg(response.data.message || "Password reset failed.");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Password reset failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#473425] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-xl relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#C6A43B]/10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C6A43B]/10 blur-3xl rounded-full"></div>

        <div className="relative rounded-[28px] border border-white/10 bg-white backdrop-blur-xl shadow-[0_0_50px_rgba(255,193,7,0.08)] p-6 sm:p-8 lg:p-10">
          <div className="mb-8 text-center">
            <span className="text-[#8B5A2B] text-sm font-semibold tracking-[0.2em] uppercase">
              {mode === "login" ? "Vendor Login" : "Forgot Password"}
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">
              {mode === "login"
                ? "Welcome Back"
                : mode === "forgot"
                ? "Verify Your Email"
                : "Reset Password"}
            </h3>

            <p className="text-gray-700 mt-3 text-sm sm:text-base leading-7">
              {mode === "login"
                ? "Access your vendor dashboard to manage your profile, projects, and products."
                : mode === "forgot"
                ? "Enter your registered email address to continue."
                : "Create a new simple password for your vendor account."}
            </p>
          </div>

          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[#8B5A2B] font-medium mb-2">
                  Email Address *
                </label>
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
                <label className="block text-[#8B5A2B] font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter registered mobile number"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-[#8B5A2B] font-medium mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className={inputClass}
                />
              </div>

              {errorMsg && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-700 p-3 text-sm">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 text-green-700 p-3 text-sm">
                  {successMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-xl bg-[#C6A43B] text-black font-semibold py-4 shadow-md transition-all flex justify-center items-center gap-2 hover:bg-[#d6b24a] ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Logging in..." : "Login →"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode("forgot");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className="text-xs text-[#C6A43B] font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="text-center mt-4">
                <p className="text-xs text-gray-700">
                  Don't have an account?{" "}
                  <Link
                    to="/vendor-register"
                    className="text-[#C6A43B] font-semibold hover:underline"
                  >
                    Register as a vendor
                  </Link>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Use the same email and phone number you registered with.
                </p>
              </div>
            </form>
          )}

          {mode === "forgot" && (
            <form onSubmit={handleCheckEmail} className="space-y-5">
              <div>
                <label className="block text-[#8B5A2B] font-medium mb-2">
                  Registered Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={forgotData.email}
                  onChange={handleForgotChange}
                  required
                  placeholder="Enter registered email"
                  className={inputClass}
                />
              </div>

              {errorMsg && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-700 p-3 text-sm">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 text-green-700 p-3 text-sm">
                  {successMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-xl bg-[#C6A43B] text-black font-semibold py-4 shadow-md transition-all flex justify-center items-center gap-2 hover:bg-[#d6b24a] ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Checking..." : "Check Email →"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="w-full text-sm text-gray-600 hover:text-[#C6A43B]"
              >
                Back to Login
              </button>
            </form>
          )}

          {mode === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="block text-[#8B5A2B] font-medium mb-2">
                  Registered Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={forgotData.email}
                  readOnly
                  className={`${inputClass} bg-gray-100 cursor-not-allowed`}
                />
              </div>

              <div>
                <label className="block text-[#8B5A2B] font-medium mb-2">
                  New Password *
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={forgotData.newPassword}
                  onChange={handleForgotChange}
                  required
                  placeholder="Enter new password"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-[#8B5A2B] font-medium mb-2">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={forgotData.confirmPassword}
                  onChange={handleForgotChange}
                  required
                  placeholder="Re-enter new password"
                  className={inputClass}
                />
              </div>

              {errorMsg && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-700 p-3 text-sm">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 text-green-700 p-3 text-sm">
                  {successMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-xl bg-[#C6A43B] text-black font-semibold py-4 shadow-md transition-all flex justify-center items-center gap-2 hover:bg-[#d6b24a] ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Updating..." : "Reset Password →"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="w-full text-sm text-gray-600 hover:text-[#C6A43B]"
              >
                Back to Login
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default VendorLogin;