import React from "react";
import { ArrowRight, TrendingUp, Package, Users } from "lucide-react";

const WelcomeSection = () => {
  return (
    <section className="mb-6">
      <div className="rounded-3xl border border-[#dbe6dc] bg-linear-to-br from-[#f7fff5] via-[#fffaf0] to-[#ffffff] p-6 shadow-sm sm:p-8 lg:p-10">
        
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <h1 className="text-2xl font-bold text-[#234b36] sm:text-3xl lg:text-4xl">
              Welcome back, Vendor 👋
            </h1>

            <p className="mt-3 text-sm leading-7 text-[#5f7467] sm:text-base">
              Manage your products, track orders, and grow your business with ease.
              Everything you need is right here in your dashboard.
            </p>

            <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#245640]">
              Go to Catalogue
              <ArrowRight size={16} />
            </button>
          </div>

          {/* RIGHT QUICK STATS */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
            
            <div className="rounded-2xl border border-[#dbe6dc] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#e8f3eb] p-2 text-[#2d6a4f]">
                  <Package size={18} />
                </div>
                <div>
                  <p className="text-xs text-[#6c8074]">Products</p>
                  <h4 className="text-lg font-bold text-[#234b36]">24</h4>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#dbe6dc] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#edf7ef] p-2 text-[#3e8b57]">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <p className="text-xs text-[#6c8074]">Revenue</p>
                  <h4 className="text-lg font-bold text-[#234b36]">₹45K</h4>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#dbe6dc] bg-white p-4 shadow-sm col-span-2 sm:col-span-1">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#f4efe2] p-2 text-[#8a6a1f]">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-xs text-[#6c8074]">Customers</p>
                  <h4 className="text-lg font-bold text-[#234b36]">120</h4>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WelcomeSection;