import React, { useRef, useState } from "react";

const portfolioStats = [
  { title: "Projects Delivered", value: "120+" },
  { title: "Years of Experience", value: "10+" },
  { title: "Trusted Manufacturing Partners", value: "25+" },
  { title: "Client Satisfaction Focus", value: "100%" },
];





const initialTestimonials = [
  {
    name: "A Residential Client",
    role: "Home Interior Project",
    review:
      "The entire experience was smooth and professional. Their planning, quality, and execution gave us complete confidence throughout the project.",
  },
  {
    name: "Business Owner",
    role: "Commercial Interior Project",
    review:
      "What stood out most was their structured approach, transparency, and the way they handled the project from concept to completion.",
  },
  {
    name: "Premium Homeowner",
    role: "Luxury Furniture & Interiors",
    review:
      "The outcome felt premium in every detail. The team delivered a refined, elegant space with excellent workmanship and on-time execution.",
  },
];

const getEmbedUrl = (url) => {
  if (!url) return "";
  if (url.includes("embed/")) return url;

  const regExp =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&?/]+)/;
  const match = url.match(regExp);

  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const Portfolio = () => {
  const [videos, setVideos] = useState([
    {
      title: "Interiors",
      url: "/portfoliovideos/Video1.mp4",
    },
    {
      title: "Sofa Set",
      url: "/portfoliovideos/Video2.mp4",
    },
  ]);

  const [portfolioImages, setPortfolioImages] = useState([
    {
      title: "Image 1",
      image: "/src/aboutSectionImage/furnitureImg1.png",
    },
    {
      title: "Image 2",
      image: "/src/aboutSectionImage/furnitureImg2.png",
    },
    {
      title: "Image 3",
      image: "/src/aboutSectionImage/furnitureimg3.png",
    },
    {
      title: "Image 4",
      image: "/src/aboutSectionImage/furnitureImg3.png",
    },
    {
      title: "Image 5",
      image: "/src/aboutSectionImage/furnitureImg2.png",
    },
    {
      title: "Image 6",
      image: "/src/aboutSectionImage/furnitureimg1.png",
    },
  ]);

  const [testimonials, setTestimonials] = useState(initialTestimonials);

  const videoInputRefs = useRef([]);
  const imageInputRefs = useRef([]);

  const handleEditVideos = () => {
    const updatedVideos = videos.map((video, index) => {
      const newUrl = window.prompt(
        `Enter YouTube URL for ${video.title}`,
        video.url
      );

      return newUrl
        ? { ...video, url: getEmbedUrl(newUrl.trim()) }
        : videos[index];
    });

    setVideos(updatedVideos);
  };

  const handleVideoFileChange = (event, index) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);

    setVideos((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, url: localUrl, isLocalFile: true } : item
      )
    );
  };

  const handleImageFileChange = (event, index) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);

    setPortfolioImages((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, image: localUrl } : item
      )
    );
  };

  const handleEditImages = () => {
    imageInputRefs.current[0]?.click();
  };
  const handleEditTestimonials = () => {
    const updated = testimonials.map((item, index) => {
      const newReview = prompt("Edit review:", item.review);
      return newReview ? { ...item, review: newReview } : item;
    });

    setTestimonials(updated);
  };
  return (
    <section className="w-full bg-linear-to-br from-[#f7fff5] via-[#fffaf0] to-[#ffffff] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Hero Section */}
        <div className="overflow-hidden rounded-4xl border border-white/60 bg-white/55 p-6 shadow-[0_20px_60px_rgba(167,224,167,0.18)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-[#a7e0a7]/50 bg-[#a7e0a7]/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#355b35]">
                JS Vendors Portfolio
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1f2937] sm:text-4xl lg:text-5xl">
                Premium Interior & Furniture Portfolio
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-8 text-[#4b5563] sm:text-lg">
                We help busy homeowners and businesses transform their spaces
                with end-to-end interior and furniture solutions—delivered on
                time, within budget, and without stress.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#a7e0a7]/35 px-4 py-2 text-sm font-medium text-[#274227]">
                  Manufacturing Excellence
                </span>
                <span className="rounded-full bg-[#fff7e8] px-4 py-2 text-sm font-medium text-[#7a5c2e]">
                  Premium Fabric Collections
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#374151] shadow-sm">
                  Quality Wood Selection
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {portfolioStats.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/70 bg-white/65 p-5 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-lg"
                >
                  <h3 className="text-2xl font-bold text-[#1f2937] sm:text-3xl">
                    {item.value}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#6b7280]">
                    {item.title}
                  </p>
                </div>

              ))}
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div className="rounded-4xl border border-white/60 bg-white/55 p-6 shadow-[0_20px_60px_rgba(167,224,167,0.12)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#1f2937] sm:text-3xl">
                JSGallor Videos
              </h2>
              <p className="mt-2 text-base text-[#6b7280]">
                Showcase your latest YouTube videos here.
              </p>
            </div>

            <button
              type="button"
              onClick={handleEditVideos}
              className="rounded-full border border-[#a7e0a7]/50 bg-[#f3fff1] px-5 py-2 text-sm font-semibold text-[#355b35] transition hover:bg-[#e8fbe4]"
            >
              Edit
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
            {videos.map((video, index) => (
              <div
                key={index}
                className="rounded-[28px] border border-white/60 bg-white/70 p-4 shadow-[0_18px_50px_rgba(167,224,167,0.12)] backdrop-blur-xl sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-bold text-[#1f2937]">
                    {video.title}
                  </h3>

                  <button
                    type="button"
                    onClick={() => videoInputRefs.current[index]?.click()}
                    className="rounded-full border border-[#f2e4c8] bg-[#fffaf0] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7a5c2e] hover:bg-[#fff4df]"
                  >
                    Update
                  </button>
                </div>

                <input
                  type="file"
                  accept="video/*"
                  ref={(el) => (videoInputRefs.current[index] = el)}
                  onChange={(e) => handleVideoFileChange(e, index)}
                  className="hidden"
                />

                <div className="overflow-hidden rounded-[22px] border border-white/70 bg-black/5">
                  {video.isLocalFile ? (
                    <video
                      controls
                      className="h-55 w-full object-cover sm:h-70"
                    >
                      <source src={video.url} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <iframe
                      src={getEmbedUrl(video.url)}
                      title={video.title}
                      className="h-55 w-full sm:h-70"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Images Section */}
        <div className="rounded-4xl border border-white/60 bg-white/55 p-6 shadow-[0_20px_60px_rgba(167,224,167,0.12)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#1f2937] sm:text-3xl">
                Portfolio Images
              </h2>
              <p className="mt-2 text-base text-[#6b7280]">
                Replace the old cards with 3 dynamic images.
              </p>
            </div>

            <button
              type="button"
              onClick={handleEditImages}
              className="rounded-full border border-[#a7e0a7]/50 bg-[#f3fff1] px-5 py-2 text-sm font-semibold text-[#355b35] transition hover:bg-[#e8fbe4]"
            >
              Edit
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {portfolioImages.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[26px] border border-white/70 bg-white/65 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.05)] backdrop-blur-lg"
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => (imageInputRefs.current[index] = el)}
                  onChange={(e) => handleImageFileChange(e, index)}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => imageInputRefs.current[index]?.click()}
                  className="absolute right-7 top-7 z-10 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#355b35] shadow-sm transition hover:bg-[#f3fff1]"
                >
                  Update
                </button>

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-72 w-full rounded-[22px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>




        {/* Testimonials */}
        <div className="rounded-4xl border border-white/60 bg-white/55 p-6 shadow-[0_20px_60px_rgba(167,224,167,0.12)] backdrop-blur-xl sm:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1f2937] sm:text-3xl">
              Testimonials
            </h2>
            <p className="mt-2 text-base text-[#6b7280]">
              Real feedback that reflects quality, trust, and execution
              excellence.
            </p>
            <button
              type="button"
              onClick={handleEditTestimonials}
              className="absolute right-7 top-7 z-10 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#355b35] shadow-sm transition hover:bg-[#f3fff1]"
            >
              Update
            </button>

          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="rounded-[26px] border border-white/70 bg-white/70 p-6 shadow-[0_12px_36px_rgba(0,0,0,0.05)] backdrop-blur-lg"
              >
                <div className="mb-4 text-4xl leading-none text-[#a7e0a7]">
                  “
                </div>

                <p className="text-sm leading-8 text-[#4b5563]">
                  {item.review}
                </p>

                <div className="mt-6 border-t border-[#eef2ee] pt-4">
                  <h4 className="text-base font-semibold text-[#1f2937]">
                    {item.name}
                  </h4>
                  <p className="mt-1 text-sm text-[#6b7280]">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;