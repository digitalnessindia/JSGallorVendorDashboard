import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./VendorDashboard/Layout/MainLayout";
import Dashboard from "./Dashboard";
import Estimation from "./VendorDashboard/Estimation/Estimation";
import Portfolio from "./VendorDashboard/Portfolio/Portfolio";
import Documentation from "./VendorDashboard/Documents/Documentataion";
import VendorProfile from "./VendorDashboard/VendorProfile/Profile";
import HelpSupport from "./VendorDashboard/HelpSupport/HelpSupport";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="estimation" element={<Estimation />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="documents" element={<Documentation/>} />
        <Route path="profile" element={<VendorProfile/>} />
        <Route path="help" element={<HelpSupport/>} />
      </Route>
    </Routes>
  );
}

export default App;




// Vendor Portal Code
// import React from "react";
// import VendorPortal from "./VendorPortal";
// function App() {
//   return (
//     <>
//       <VendorPortal />
//     </>
//   )
// }
// export default App;