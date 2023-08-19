import React from 'react'
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Publisher from './pages/Publisher';
import Viewer from './pages/Viewer';
// <<<<<<< Updated upstream
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Page404 from './pages/Page404';
// =======

// >>>>>>> Stashed changes
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Publisher />} />
          <Route path="/viewer" element={<Viewer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
