import React from "react";
import { recentOrders } from "../../features/dashboard/dashboardData";

const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Pending: "bg-gray-200 text-gray-700",
};

const RecentOrders = () => {
  return (
    <section className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_8px_28px_rgba(17,24,39,0.05)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#111827]">Recent Orders</h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            Latest order activity from your customers
          </p>
        </div>

        <button className="text-sm font-semibold text-[#111827] hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/5">
        <div className="hidden grid-cols-5 bg-[#f9fafb] px-5 py-4 text-sm font-semibold text-[#4b5563] md:grid">
          <span>Order ID</span>
          <span>Product</span>
          <span>Customer</span>
          <span>Amount</span>
          <span>Status</span>
        </div>

        <div className="divide-y divide-black/5">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-5 md:items-center"
            >
              <div>
                <p className="text-xs text-[#6b7280] md:hidden">Order ID</p>
                <p className="font-semibold text-[#111827]">{order.id}</p>
              </div>

              <div>
                <p className="text-xs text-[#6b7280] md:hidden">Product</p>
                <p className="text-[#111827]">{order.product}</p>
              </div>

              <div>
                <p className="text-xs text-[#6b7280] md:hidden">Customer</p>
                <p className="text-[#111827]">{order.customer}</p>
              </div>

              <div>
                <p className="text-xs text-[#6b7280] md:hidden">Amount</p>
                <p className="text-[#111827]">{order.amount}</p>
              </div>

              <div>
                <p className="text-xs text-[#6b7280] md:hidden">Status</p>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    statusStyles[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentOrders;