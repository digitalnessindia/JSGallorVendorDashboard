import React from "react";

const testimonials = [
  {
    id: 1,
    title: "Our Manufacturing Excellence",
    desc: "State-of-the-art factory ensuring precision, quality control, and timely production.",
    image: "/src/testimonialImg/testmonialImg1.png",
  },
  {
    id: 2,
    title: "Premium Fabric Collections",
    desc: "Wide range of luxury fabrics curated for durability, comfort, and elegance.",
    image: "/src/testimonialImg/testimonialImg2.png",
  },
  {
    id: 3,
    title: "Quality Wood Selection",
    desc: "Carefully selected hardwoods and engineered wood ensuring long-lasting strength.",
    image: "/src/testimonialImg/testmonialImg3.png",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#000000] text-sm font-semibold tracking-wider uppercase">
            Our Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3">
            What Makes <span className="text-[#8B5A2B]">JSGALLOR Different</span> 
          </h2>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
            From factory to finish, we ensure premium quality materials and precision craftsmanship.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(198,164,59,0.2)]"
            >
              {/* Image */}
              <div className="h-75 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 p-6">
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm mt-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;