import React from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FolderKanban,
} from "lucide-react";
import {
  previousProjects,
  ongoingProjects,
} from "../../features/dashboard/dashboardData";
//bg-linear-to-br from-[#f7fff5] via-[#fffaf0] to-[#ffffff]
const ProjectsSection = () => {
  return (
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Previous Projects */}
      <div className="overflow-hidden rounded-[30px] border border-[#dbe6dc] bg-white shadow-[0_12px_34px_rgba(35,75,54,0.06)]">
        <div className="border-b border-[#edf2ee] bg-linear-to-br from-[#f7fff5] via-[#fffaf0] to-[#ffffff] px-6 py-5 sm:px-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf5ee] text-[#2d6a4f] shadow-sm">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[#234b36] sm:text-2xl">
                  Previous Projects
                </h3>
                <p className="text-sm text-[#6c8074]">
                  Review your completed and delivered projects
                </p>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 rounded-full border border-[#d7e3d9] bg-white px-4 py-2 text-sm font-semibold text-[#234b36] transition hover:bg-[#eef5ef]">
              View All
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-4 p-6 sm:p-7">
          {previousProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl border border-[#e3ebe4] bg-[#fbfcfb] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(35,75,54,0.08)]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef5ef] text-[#2d6a4f]">
                      <FolderKanban size={20} />
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate text-base font-semibold text-[#234b36] sm:text-lg">
                        {project.name}
                      </h4>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#708478]">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays size={16} className="text-[#5c8f6b]" />
                          Completed on {project.completionDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#cfe4d5] bg-[#eaf5ee] px-3.5 py-1.5 text-xs font-semibold text-[#2d6a4f]">
                    <CheckCircle2 size={14} />
                    {project.status}
                  </span>

                  <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d7e3d9] bg-white px-4 py-2.5 text-sm font-semibold text-[#234b36] transition hover:bg-[#eef5ef]">
                    View Details
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ongoing Projects */}
      <div className="overflow-hidden rounded-[30px] border border-[#dbe6dc] bg-white shadow-[0_12px_34px_rgba(35,75,54,0.06)]">
        <div className="border-b border-[#edf2ee] bg-linear-to-br from-[#f7fff5] via-[#fffaf0] to-[#ffffff] px-6 py-5 sm:px-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4efe2] text-[#8a6a1f] shadow-sm">
                <Clock3 size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[#234b36] sm:text-2xl">
                  Ongoing Projects
                </h3>
                <p className="text-sm text-[#6c8074]">
                  Track active work, deadlines, and current progress
                </p>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 rounded-full border border-[#d7e3d9] bg-white px-4 py-2 text-sm font-semibold text-[#234b36] transition hover:bg-[#eef5ef]">
              Manage
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-4 p-6 sm:p-7">
          {ongoingProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl border border-[#e3ebe4] bg-[#fbfcfb] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(35,75,54,0.08)]"
            >
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef5ef] text-[#2d6a4f]">
                        <FolderKanban size={20} />
                      </div>

                      <div className="min-w-0">
                        <h4 className="truncate text-base font-semibold text-[#234b36] sm:text-lg">
                          {project.name}
                        </h4>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#708478]">
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays size={16} className="text-[#b3882c]" />
                            Deadline: {project.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ead9ad] bg-[#fbf5e4] px-3.5 py-1.5 text-xs font-semibold text-[#8a6a1f]">
                    <Clock3 size={14} />
                    {project.status}
                  </span>
                </div>

                <div className="rounded-2xl border border-[#eef2ee] bg-white p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-[#5f7467]">
                      Progress
                    </span>
                    <span className="text-sm font-bold text-[#234b36]">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-[#e7efe8]">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-[#2d6a4f] to-[#7fb08d] transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-[#2d6a4f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#245640] hover:shadow-md">
                    Update Project
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;