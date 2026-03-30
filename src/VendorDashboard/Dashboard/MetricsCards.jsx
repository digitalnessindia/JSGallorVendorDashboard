import React from "react";
import {
  BookOpen,
  ShoppingBag,
  Factory,
  WalletCards,
  ArrowUpRight,
} from "lucide-react";
import { metricsData } from "../../features/dashboard/dashboardData";

const iconsMap = {
  "Total Catalogues": BookOpen,
  "New Orders": ShoppingBag,
  "Factories Linked": Factory,
  Revenue: WalletCards,
};

const colorMap = {
  "Total Catalogues": {
    iconBg: "bg-[#eaf5ee]",
    iconColor: "text-[#2d6a4f]",
    accent: "from-[#2d6a4f] to-[#6fa57f]",
  },
  "New Orders": {
    iconBg: "bg-[#f4efe2]",
    iconColor: "text-[#8a6a1f]",
    accent: "from-[#c8a95b] to-[#e4d2a3]",
  },
  "Factories Linked": {
    iconBg: "bg-[#edf7ef]",
    iconColor: "text-[#3f7d58]",
    accent: "from-[#4d8b66] to-[#9cc7ab]",
  },
  Revenue: {
    iconBg: "bg-[#eef4ec]",
    iconColor: "text-[#355f46]",
    accent: "from-[#355f46] to-[#7fb08d]",
  },
};

const MetricsCards = () => {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {metricsData.map((item) => {
        const Icon = iconsMap[item.title] || BookOpen;
        const colors = colorMap[item.title] || {
          iconBg: "bg-[#eaf5ee]",
          iconColor: "text-[#2d6a4f]",
          accent: "from-[#2d6a4f] to-[#9cc7ab]",
        };

        return (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-[28px] border border-[#dbe6dc] bg-linear-to-br from-[#f7fff5] via-[#fffaf0] to-[#ffffff] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(35,75,54,0.10)] sm:p-6"
          >
            {/* Top Accent */}
            <div
              className={`absolute left-0 top-0 h-1.5 w-full bg-linear-to-r ${colors.accent}`}
            />

            {/* Soft Background Glow */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#f7f4ea] blur-2xl transition-all duration-300 group-hover:scale-110" />

            <div className="relative z-10">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium tracking-wide text-[#6c8074]">
                    {item.title}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-[#234b36] sm:text-[32px]">
                    {item.value}
                  </h3>
                </div>

                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${colors.iconBg} shadow-sm ring-1 ring-black/5`}
                >
                  <Icon size={22} className={colors.iconColor} />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-[#edf2ee] pt-4">
                <p className="text-sm text-[#7b8f83]">{item.subtext}</p>

                <button className="inline-flex items-center gap-1 rounded-full bg-[#f7faf7] px-3 py-1.5 text-sm font-semibold text-[#234b36] transition hover:bg-[#eef5ef]">
                  View Details
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default MetricsCards;