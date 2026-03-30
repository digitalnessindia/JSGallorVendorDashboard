import React from "react";

const benefits = [
  {
    id: 1,
    icon: "📈",
    title: "Grow Business Visibility",
    desc: "Reach premium clients across India",
  },
  {
    id: 2,
    icon: "🤝",
    title: "Connect with More Customers",
    desc: "Direct leads & project inquiries",
  },
  {
    id: 3,
    icon: "🖼️",
    title: "Showcase Portfolio Professionally",
    desc: "Curated gallery & product highlights",
  },
  {
    id: 4,
    icon: "🏅",
    title: "Build Trust & Brand Credibility",
    desc: "Verified partner badge & reviews",
  },
  {
    id: 5,
    icon: "🛠️",
    title: "Manage Products & Services Easily",
    desc: "Central dashboard & analytics",
  },
];

const WhyPartnerWithJSGallor = () => {
  return (
    <div className="w-full bg-[#473425] py-16  relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#C6A43B]/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#C6A43B]/10 blur-3xl rounded-full"></div>
    
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-10">
          <div className="text-3xl">💎</div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#ffffff] mt-2">
            Why partner with <span className="text-[#f4b400]">JSGALLOR?</span> 
          </h2>
          <p className="text-white mt-2">
            Exclusive platform built for artisans, manufacturers & interior
            experts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="text-center p-5 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:border-[#C6A43B] hover:shadow-[0_10px_40px_rgba(198,164,59,0.2)]"
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto shadow-sm text-2xl border border-white/10">
                <span>{benefit.icon}</span>
              </div>

              <h4 className="font-semibold text-[#C6A43B] mt-4">
                {benefit.title}
              </h4>
              <p className="text-sm text-white mt-1">{benefit.desc}</p>

              <div className="w-0 group-hover:w-full h-0.5 bg-[#C6A43B] mt-4 mx-auto transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyPartnerWithJSGallor;