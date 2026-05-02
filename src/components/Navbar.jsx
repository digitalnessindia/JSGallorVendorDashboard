import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="navbar w-full bg-[#473425] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-19">
          {/* Left Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#f4b400] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 w-6 h-6 text-black"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg>
            </div>

            <div onClick={() => navigate("/")}>
              <h1 className="text-xl font-bold text-[#f4b400] tracking-tight leading-none">
                JSGALLOR
              </h1>
              <p className="text-xs text-[#ffffff] sm:text-sm">
                Vendor Portal
              </p>
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="border bg-[#F3F4F6] h-10 px-4 py-2 border-gray-700 text-black hover:bg-gray-800 hover:text-white   rounded-xl  font-semibold  transition">
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 rounded-xl bg-[#EAB308] text-black font-semibold hover:opacity-90 transition">
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => {
                  navigate("/register");
                  setMenuOpen(false);
                }}

                className="w-full px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition">
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/register");
                  setMenuOpen(false);
                }}
                className="w-full px-5 py-3 rounded-xl bg-[#f4b400] text-black font-semibold hover:opacity-90 transition">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;