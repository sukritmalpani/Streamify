import React from 'react'
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Publisher from './pages/Publisher';
import Viewer from './pages/Viewer';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Page404 from './pages/Page404';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import { Navigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from './hooks/useAuthContext';
import Dashboard from './dash/Dashboard';
export default function App() {
  const { user } = useAuthContext();
  return (
    <div>
      <BrowserRouter>
        <Routes>
{/* <<<<<<< Updated upstream */}
          <Route path="/" element={<Home />} />
          <Route path="/dash" element={<Dashboard />} />

          <Route path='/publisher' element={user?.publisher ? <Publisher /> : <Login message="You need to login first" />} />
          <Route path="/viewer" element={user ? <Viewer /> : <Login message="You need to login first" />} />
          <Route path="/login" element={user ? <Navigate to='/' /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to='/' /> : <Register />} />
=======
          <Route path="/test" element={<Home />} />
          <Route path='/publisher' element={<Publisher />} />
          <Route path="/viewer" element={<Viewer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
{/* >>>>>>> Stashed changes */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
