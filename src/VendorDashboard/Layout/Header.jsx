import React, { useEffect, useState } from "react";
import { Bell, Menu, Search } from "lucide-react";

const Header = ({ setSidebarOpen }) => {
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    try {
      const storedVendor = localStorage.getItem("vendor");

      if (
        storedVendor &&
        storedVendor !== "undefined" &&
        storedVendor !== "null"
      ) {
        setVendor(JSON.parse(storedVendor));
      } else {
        localStorage.removeItem("vendor");
      }
    } catch (error) {
      console.error("Invalid vendor data in localStorage:", error);
      localStorage.removeItem("vendor");
    }
  }, []);

  const getInitials = (name) => {
    if (!name) return "VA";

    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#e6ece8] bg-white/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            className="rounded-xl border border-[#dbe6dc] bg-white p-2 shadow-sm md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={20} className="text-[#234b36]" />
          </button>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#234b36]">
              Dashboard
            </h2>
            <p className="text-sm text-[#6c8074]">
              Welcome back, {vendor?.vendorName || "Vendor"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-[#dbe6dc] bg-[#f9fbf9] px-4 py-2 shadow-sm">
            <Search size={16} className="text-[#6c8074]" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-44 bg-transparent text-sm text-[#234b36] outline-none placeholder:text-[#9aaea2]"
            />
          </div>

          <button className="relative rounded-2xl border border-[#dbe6dc] bg-white p-3 shadow-sm transition hover:shadow-md hover:bg-[#f3f7f4]">
            <Bell size={18} className="text-[#234b36]" />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2d6a4f] px-1 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-[#dbe6dc] bg-white px-3 py-2 shadow-sm hover:shadow-md transition">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d6a4f] text-white font-semibold text-sm">
              {getInitials(vendor?.vendorName)}
            </div>

            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-semibold text-[#234b36]">
                {vendor?.vendorName || "Vendor Admin"}
              </p>
              <p className="text-xs text-[#6c8074]">
                {vendor?.businessName || "Premium Account"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;