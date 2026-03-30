import React from "react";

const categoriesList = [
  {
    id: 1,
    title: "Interior Designing",
    icon: "🛋️",
    desc: "Concept & space planning, mood boards",
  },
  {
    id: 2,
    title: "Interior Architecture",
    icon: "🏛️",
    desc: "Structural detailing & spatial flow",
  },
  {
    id: 3,
    title: "Lighting and Electrical works",
    icon: "💡",
    desc: "Ambient, task & decorative lighting",
  },
  {
    id: 4,
    title: "False Ceiling",
    icon: "📐",
    desc: "Gypsum, POP, creative ceiling design",
  },
  {
    id: 5,
    title: "Curtains and Blinds",
    icon: "🪟",
    desc: "Luxury drapes, upholstered beds",
  },
  {
    id: 6,
    title: "Polishing and Painting",
    icon: "🎨",
    desc: "Textures, polish, premium finishes",
  },
  {
    id: 7,
    title: "Interior Art Work",
    icon: "🖼️",
    desc: "Wall art, sculptures, installations",
  },
  {
    id: 8,
    title: "Glass Partition",
    icon: "🚪",
    desc: "Frameless, sliding glass dividers",
  },
];

const VendorCategories = () => {
  return (
    <div className="w-full bg-[#ffffff] py-12">
    <section className="mt-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">

      {/* Glow Effect */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#C6A43B]/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#C6A43B]/10 blur-3xl rounded-full"></div>

      {/* Header */}
      <div className="relative text-center mb-12">
        <span className="text-[#8B5A2B] text-sm font-semibold tracking-wider uppercase">
          Specializations
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-[#8B5A2B] mt-3">
          Vendor Categories
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mt-4">
          Choose your niche & showcase expertise in premium furniture & interior
          segments.
        </p>
      </div>

      {/* Cards */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categoriesList.map((cat) => (
          <div
            key={cat.id}
            className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#C6A43B] hover:shadow-[0_10px_40px_rgba(198,164,59,0.2)]"
          >
            {/* Icon */}
            <div className="w-14 h-14 bg-[#C6A43B]/10 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
              <span>{cat.icon}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-[#000000] group-hover:text-[#C6A43B] transition">
              {cat.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {cat.desc}
            </p>

            {/* Bottom Accent Line */}
            <div className="w-0 group-hover:w-full h-0.5 bg-[#C6A43B] mt-4 transition-all duration-300"></div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default VendorCategories;