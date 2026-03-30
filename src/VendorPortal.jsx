import React from "react"
import "./App.css"
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import VendorCategories from "./components/VendorCategories"
import WhyPartnerWithJSGallor from "./components/WhyPartnerWithJSGallor"
import AboutVendorSection from "./components/AboutVendorSection"
import Footer from "./components/Footer"
import TestimonialsSection from "./components/Testimonials"
import RegistrationForm from "./components/RegistrationForm"
import RegistrationHeroSection from "./components/RegistrationHeroSection";


function HomePage() {

  return (
    <>

      <Navbar />

      <AboutVendorSection />
      <VendorCategories />
      <WhyPartnerWithJSGallor />
      <TestimonialsSection />
      <Footer />

    </>
  )
}
function RegistrationPage() {
  return (
    <>
      <Navbar />
      <RegistrationHeroSection />
      <RegistrationForm />
      <Footer />
    </>
  );
}
function VendorPortal() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
}

export default VendorPortal;