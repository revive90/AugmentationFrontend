import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from "react-router-dom";
import Baseline from "./pages/Baseline";



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Baseline />} />
      </Routes>
    </>
  )
}

export default App
