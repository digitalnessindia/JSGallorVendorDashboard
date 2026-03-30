import React from "react";
import {
  LayoutDashboard,
  Calculator,
  BriefcaseBusiness,
  FileText,
  User,
  CircleHelp,
  LogOut,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Estimation", icon: Calculator, path: "/estimation" },
  { name: "Portfolio", icon: BriefcaseBusiness, path: "/portfolio" },
  { name: "Documentation", icon: FileText, path: "/documents" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "Help", icon: CircleHelp, path: "/help" },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeItem = "Dashboard" }) => {
  const navigate = useNavigate();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50 h-screen w-70
          bg-[#C1E1C1] border-r border-black/5
          px-5 py-6
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-[#1f2937]">
              Vendor Portal
            </h1>
            <p className="mt-1 text-sm text-[#4b5563]">
              Business management dashboard
            </p>
          </div>

          <button
            className="md:hidden rounded-xl p-2 hover:bg-white/60 transition"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-8 rounded-3xl bg-white/55 p-4 shadow-sm border border-white/60">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm text-lg font-bold text-[#1f2937]">
              VP
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#1f2937]">
                JS Gallor Vendor
              </h3>
              <p className="text-xs text-[#4b5563]">Verified Partner</p>
            </div>
          </div>
        </div>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.name === activeItem;

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200 ${isActive
                  ? "bg-white text-[#111827] shadow-md"
                  : "text-[#1f2937] hover:bg-white/70 hover:shadow-sm"
                  }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${isActive ? "bg-[#C1E1C1]" : "bg-white/60"
                    }`}
                >
                  <Icon size={18} />
                </span>
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 border-t border-black/10 pt-5">
          <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/70">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/60">
              <LogOut size={18} />
            </span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;