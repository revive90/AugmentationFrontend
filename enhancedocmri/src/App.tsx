import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TrainingEval from "./pages/TrainingEval";
import Enhanced from "./pages/Enhanced";
import AugProgress from "./pages/AugProgress";
import Baseline from "./pages/Baseline";
import TrainingProgress from "./pages/TrainingProgress";
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Baseline />} />
        <Route path="/TrainingEval" element={<TrainingEval />} />
        <Route path="/Enhanced" element={<Enhanced />} />
        <Route path="/AugProgress" element={<AugProgress />} />
        <Route path="/Baseline" element={<Baseline />} />
        <Route path="/TrainingProgress" element={<TrainingProgress />} />
      </Routes>
    </>
  );
}

export default App;
