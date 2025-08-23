import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Enhanced from "./pages/Enhanced";
import Baseline from "./pages/Baseline";
import { useNavigate } from "react-router-dom";
import Readme from "./pages/Readme";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Baseline />} />
        <Route path="/Readme" element={<Readme />} />
        <Route path="/Enhanced" element={<Enhanced />} />
        <Route path="/Baseline" element={<Baseline />} />
      </Routes>
    </>
  );
}

export default App;
