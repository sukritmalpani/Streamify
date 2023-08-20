import React from 'react'
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import logo from '../images/logo.png'
export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const { signup, error, isLoading } = useSignup();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async () => {
        signup(formData.name, formData.email, formData.password)
    }
    return (
        <div>
            <Navbar />
            <main className="w-full flex bg-white">
                <div className="flex-1 flex items-center justify-center h-screen">
                    <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                        <div className="">
                            <img src={logo} width={150} className="lg:hidden" />
                            <div className="mt-5 space-y-2">
                                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
                                <p className="">Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link></p>
                            </div>
                        </div>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="space-y-5 border-2 p-5 rounded-lg shadow-lg"
                        >
                            <div>
                                <label className="font-medium">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <button
                                disabled={isLoading}
                                onClick={handleSubmit}
                                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            >
                                Create account
                            </button>
                            {error && <div className='error'>{error}</div>}
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}