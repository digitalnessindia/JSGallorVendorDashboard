import React from "react";
import { recentActivities } from "../../features/dashboard/dashboardData";
import { CheckCircle2 } from "lucide-react";

const RecentActivity = () => {
  return (
    <section className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_8px_28px_rgba(17,24,39,0.05)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#111827]">Recent Activity</h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            Track the latest updates from your dashboard
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 rounded-2xl border border-black/5 bg-[#fafafa] p-4"
          >
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#C1E1C1]">
              <CheckCircle2 size={18} className="text-[#111827]" />
            </div>

            <div className="flex-1">
              <p className="font-medium text-[#111827]">{activity.title}</p>
              <p className="mt-1 text-sm text-[#6b7280]">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentActivity;