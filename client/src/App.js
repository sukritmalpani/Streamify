import React from 'react'
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Publisher from './pages/Publisher';
import Viewer from './pages/Viewer';
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Publisher />} />
          <Route path="/viewer" element={<Viewer />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
