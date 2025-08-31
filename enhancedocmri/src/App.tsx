import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Enhanced from "./pages/Enhanced";
import Baseline from "./pages/Baseline";
import { useNavigate } from "react-router-dom";
import Readme from "./pages/Readme";
import EnhancedPerc from "./pages/EnhancedPerc";
import EnhancedClassSpecific from "./pages/EnhancedClassSpecific";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Baseline />} />
        <Route path="/Readme" element={<Readme />} />
        <Route path="/Baseline" element={<Baseline />} />
        <Route path="/Enhanced-Threshold-Based" element={<Enhanced />} />
        <Route path="/Enhanced-Target-Percentage" element={<EnhancedPerc />} />
        <Route
          path="/Enhanced-Class-Specific"
          element={<EnhancedClassSpecific />}
        />
      </Routes>
    </>
  );
}

export default App;
