import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { Loader2, Upload, Edit } from "lucide-react";

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
  const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&?/]+)/;
  const match = url.match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const Portfolio = () => {
  const navigate = useNavigate();
  const [vendorId, setVendorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  const [videos, setVideos] = useState([]);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState(portfolioStats);

  const videoInputRefs = useRef([]);
  const imageInputRefs = useRef([]);

  // Get vendorId from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("vendor");
    if (stored) {
      try {
        const vendor = JSON.parse(stored);
        if (vendor._id) setVendorId(vendor._id);
        else {
          setError("Vendor ID missing. Please login again.");
          navigate("/vendor-login");
        }
      } catch (e) {
        console.error("Parse error", e);
        setError("Invalid vendor data. Please login again.");
        navigate("/vendor-login");
      }
    } else {
      setError("Please login to access portfolio.");
      navigate("/vendor-login");
    }
  }, [navigate]);

  // Fetch portfolio data when vendorId is available
  useEffect(() => {
    if (!vendorId) return;
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/vendors/portfolio?vendorId=${vendorId}`);
        if (response.data.success) {
          const data = response.data.portfolio;
          setVideos(data.videos || []);
          setPortfolioImages(data.images || []);
          setTestimonials(data.testimonials || initialTestimonials);
          if (data.stats) setStats(data.stats);
        } else {
          setError("Failed to load portfolio data");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Could not load portfolio");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [vendorId]);

  // Update videos (replace an existing video by index)
  const handleVideoFileChange = async (event, index) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!vendorId) return;

    setUpdating(true);
    const formData = new FormData();
    formData.append("vendorId", vendorId);
    formData.append("video", file);
    formData.append("videoIndex", index);
    formData.append("title", videos[index]?.title || "Video");

    try {
      const response = await axios.post("/api/vendors/portfolio/video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        const updatedVideo = { title: videos[index].title, url: response.data.videoUrl };
        setVideos((prev) => prev.map((v, i) => (i === index ? updatedVideo : v)));
      } else {
        alert("Video upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setUpdating(false);
      event.target.value = "";
    }
  };

  // Update image
  const handleImageFileChange = async (event, index) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!vendorId) return;

    setUpdating(true);
    const formData = new FormData();
    formData.append("vendorId", vendorId);
    formData.append("image", file);
    formData.append("imageIndex", index);

    try {
      const response = await axios.post("/api/vendors/portfolio/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        const updatedImage = {
          title: portfolioImages[index]?.title || `Image ${index + 1}`,
          url: response.data.imageUrl,
        };
        setPortfolioImages((prev) => prev.map((img, i) => (i === index ? updatedImage : img)));
      } else {
        alert("Image upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setUpdating(false);
      event.target.value = "";
    }
  };

  // Update testimonial (edit review text)
  const handleEditTestimonial = async (index) => {
    if (!vendorId) return;
    const newReview = window.prompt("Edit review:", testimonials[index]?.review);
    if (!newReview) return;

    setUpdating(true);
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index] = { ...updatedTestimonials[index], review: newReview };

    try {
      const response = await axios.put("/api/vendors/portfolio/testimonials", {
        vendorId,
        testimonials: updatedTestimonials,
      });
      if (response.data.success) {
        setTestimonials(updatedTestimonials);
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setUpdating(false);
    }
  };

  // Add new video
  const handleAddVideo = async () => {
    if (!vendorId) return;
    const title = window.prompt("Enter video title:", "New Project Video");
    if (!title) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setUpdating(true);
      const formData = new FormData();
      formData.append("vendorId", vendorId);
      formData.append("video", file);
      formData.append("title", title);
      try {
        const response = await axios.post("/api/vendors/portfolio/video", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.data.success) {
          setVideos((prev) => [...prev, { title, url: response.data.videoUrl }]);
        } else {
          alert("Failed to add video");
        }
      } catch (err) {
        console.error(err);
        alert("Upload failed");
      } finally {
        setUpdating(false);
      }
    };
    input.click();
  };

  // Delete video
  const handleDeleteVideo = async (index) => {
    if (!vendorId) return;
    if (!window.confirm("Delete this video?")) return;
    try {
      const response = await axios.delete(`/api/vendors/portfolio/video/${index}`, {
        data: { vendorId },
      });
      if (response.data.success) {
        setVideos((prev) => prev.filter((_, i) => i !== index));
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-700" />
        <span className="ml-2">Loading portfolio...</span>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  // Helper to display file URLs (assuming backend serves uploaded files)
  const getFileUrl = (url) => {
    if (!url) return "#";
    if (url.startsWith("http")) return url;
    const clean = url.replace(/^uploads[\\/]/, "");
    return `https://api.jsgallor.com/uploads/${clean}`;
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
                <span className="rounded-full bg-[#a7e0a7]/35 px-4 py-2 text-sm font-medium text-[#274227]">Manufacturing Excellence</span>
                <span className="rounded-full bg-[#fff7e8] px-4 py-2 text-sm font-medium text-[#7a5c2e]">Premium Fabric Collections</span>
                <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#374151] shadow-sm">Quality Wood Selection</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((item, idx) => (
                <div key={idx} className="rounded-3xl border border-white/70 bg-white/65 p-5 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-lg">
                  <h3 className="text-2xl font-bold text-[#1f2937] sm:text-3xl">{item.value}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6b7280]">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div className="rounded-4xl border border-white/60 bg-white/55 p-6 shadow-[0_20px_60px_rgba(167,224,167,0.12)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#1f2937] sm:text-3xl">JSGallor Videos</h2>
              <p className="mt-2 text-base text-[#6b7280]">Showcase your latest videos (YouTube or uploaded).</p>
            </div>
            <button
              onClick={handleAddVideo}
              disabled={updating}
              className="rounded-full border border-[#a7e0a7]/50 bg-[#f3fff1] px-5 py-2 text-sm font-semibold text-[#355b35] transition hover:bg-[#e8fbe4] disabled:opacity-50"
            >
              Add Video
            </button>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
            {videos.map((video, index) => (
              <div key={index} className="rounded-[28px] border border-white/60 bg-white/70 p-4 shadow-[0_18px_50px_rgba(167,224,167,0.12)] backdrop-blur-xl sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-bold text-[#1f2937]">{video.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => videoInputRefs.current[index]?.click()}
                      className="rounded-full border border-[#f2e4c8] bg-[#fffaf0] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7a5c2e] hover:bg-[#fff4df]"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(index)}
                      className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  ref={(el) => (videoInputRefs.current[index] = el)}
                  onChange={(e) => handleVideoFileChange(e, index)}
                  className="hidden"
                />
                <div className="overflow-hidden rounded-[22px] border border-white/70 bg-black/5">
                  {video.url.includes("youtube.com") || video.url.includes("youtu.be") ? (
                    <iframe
                      src={getEmbedUrl(video.url)}
                      title={video.title}
                      className="h-55 w-full sm:h-70"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video controls className="h-55 w-full object-cover sm:h-70">
                      <source src={getFileUrl(video.url)} />
                      Your browser does not support the video tag.
                    </video>
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
              <h2 className="text-2xl font-bold text-[#1f2937] sm:text-3xl">Portfolio Images</h2>
              <p className="mt-2 text-base text-[#6b7280]">Manage your portfolio images.</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {portfolioImages.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-[26px] border border-white/70 bg-white/65 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.05)] backdrop-blur-lg">
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => (imageInputRefs.current[index] = el)}
                  onChange={(e) => handleImageFileChange(e, index)}
                  className="hidden"
                />
                <button
                  onClick={() => imageInputRefs.current[index]?.click()}
                  className="absolute right-7 top-7 z-10 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#355b35] shadow-sm transition hover:bg-[#f3fff1]"
                >
                  Update
                </button>
                <img
                  src={getFileUrl(item.url)}
                  alt={item.title}
                  className="h-72 w-full rounded-[22px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="rounded-4xl border border-white/60 bg-white/55 p-6 shadow-[0_20px_60px_rgba(167,224,167,0.12)] backdrop-blur-xl sm:p-8 relative">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1f2937] sm:text-3xl">Testimonials</h2>
            <p className="mt-2 text-base text-[#6b7280]">Real feedback from clients.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <div key={index} className="relative rounded-[26px] border border-white/70 bg-white/70 p-6 shadow-[0_12px_36px_rgba(0,0,0,0.05)] backdrop-blur-lg">
                <button
                  onClick={() => handleEditTestimonial(index)}
                  className="absolute right-4 top-4 rounded-full bg-white/80 p-1.5 text-[#7a5c2e] hover:bg-[#fff4df]"
                >
                  <Edit size={14} />
                </button>
                <div className="mb-4 text-4xl leading-none text-[#a7e0a7]">“</div>
                <p className="text-sm leading-8 text-[#4b5563]">{item.review}</p>
                <div className="mt-6 border-t border-[#eef2ee] pt-4">
                  <h4 className="text-base font-semibold text-[#1f2937]">{item.name}</h4>
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