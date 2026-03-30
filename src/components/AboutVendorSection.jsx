import React, { useState, useEffect } from "react";

const images = [
  "/src/aboutSectionImage/furnitureImg1.png",
  "/src/aboutSectionImage/furnitureImg2.png",
  "/src/aboutSectionImage/furnitureimg3.png",
  "/src/aboutSectionImage/furnitureImg4.png",
  "/src/aboutSectionImage/furnitureImg5.png",
];

const focusPoints = [
  "Single-point responsibility (end-to-end execution)",
  "Structured planning and timeline control",
  "Transparent pricing and cost control system",
  "Quality materials, engineering approach and supervision",
  "Functional and aesthetic balance",
  "Warranty and after-sales support",
  "Hassle-free turnkey solution for each project",
];

const AboutVendorSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#473425] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-white text-[#8B5A2B] text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#8B5A2B]"></span>
              About JSGALLOR Vendors
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Crafting
              <span className="block text-[#8B5A2B]">Premium Spaces</span>
              With Purpose
            </h2>

            <p className="mt-6 text-white text-base sm:text-lg leading-8 max-w-2xl">
              We help busy homeowners and businesses transform their spaces with
              end-to-end interior and furniture solutions-delivered on time,
              within budget, and without stress.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
                <p className="text-sm text-[#8B5A2B] font-semibold mb-2">
                  Vision
                </p>
                <p className="text-white leading-7">
                  To craft timeless spaces that reflect luxury, functionality,
                  and individuality.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
                <p className="text-sm text-[#8B5A2B] font-semibold mb-2">
                  Mission
                </p>
                <p className="text-white leading-7">
                  To deliver be spoke interior and furniture solutions through
                  design innovation, precision engineering, and uncompromised
                  quality.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-8 border-t border-white/10 pt-6">
              <div>
                <h3 className="text-3xl font-bold text-[#8B5A2B]">End-to-End</h3>
                <p className="text-sm text-white mt-1">Execution</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#8B5A2B]">Mid & Premium</h3>
                <p className="text-sm text-white mt-1">Project Solutions</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#8B5A2B]">On Time</h3>
                <p className="text-sm text-white mt-1">Delivery Focus</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            {/* Glow Effects */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-500/10 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-500/10 blur-3xl rounded-full"></div>

            {/* Carousel Container */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(255,193,7,0.08)] min-h-125 md:min-h-162.5">
              {/* Images */}
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Interior Preview"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === current ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/30"></div>

              {/* Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                <p className="text-white font-semibold">
                  Premium Interior Solutions
                </p>
                <p className="text-gray-300 text-sm">
                  Designed with precision & elegance
                </p>
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      i === current ? "bg-[#8B5A2B]" : "bg-white/40"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVendorSection;