import React from "react";

const RevenueSection = () => {
  return (
    <section className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_8px_28px_rgba(17,24,39,0.05)]">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#111827]">Total Revenue</h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            Monthly performance overview
          </p>
        </div>

        <button className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#111827] hover:shadow-sm">
          View Analytics
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl bg-[#f8faf8] p-5">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-sm text-[#6b7280]">Revenue This Month</p>
              <h4 className="mt-2 text-4xl font-bold text-[#111827]">₹124,500</h4>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              +12.4%
            </span>
          </div>

          <div className="mt-6 flex h-40 items-end gap-3">
            {[35, 55, 45, 72, 68, 88, 76, 95].map((height, index) => (
              <div key={index} className="flex-1">
                <div
                  className="w-full rounded-t-xl bg-[#C1E1C1]"
                  style={{ height: `₹{height}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-2xl bg-[#fafafa] p-5">
            <p className="text-sm text-[#6b7280]">Quarterly Revenue</p>
            <h4 className="mt-2 text-2xl font-bold text-[#111827]">₹312,840</h4>
          </div>

          <div className="rounded-2xl bg-[#fafafa] p-5">
            <p className="text-sm text-[#6b7280]">Average Order Value</p>
            <h4 className="mt-2 text-2xl font-bold text-[#111827]">₹456</h4>
          </div>

          <div className="rounded-2xl bg-[#fafafa] p-5">
            <p className="text-sm text-[#6b7280]">Growth Rate</p>
            <h4 className="mt-2 text-2xl font-bold text-[#111827]">18.6%</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueSection;