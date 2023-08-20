import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { Footer } from 'flowbite-react';
import { useAuth } from '../utils/AuthContext';
import { useLogin } from '../hooks/useLogin';
export default function Login(props) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login, error, isLoading } = useLogin();
    const { message } = props;
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async () => {
        await login(formData.email, formData.password);
    }
    return (
        <div>
            <Navbar />
            <main className="w-full h-screen flex flex-col bg-white items-center justify-center px-4">
                {message && <span>{message}</span>}
                <div className="max-w-sm w-full text-gray-600">
                    <div className="text-center">
                        <img src="https://floatui.com/logo.svg" width={150} className="mx-auto" />
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                            <p className="">Don't have an account? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link></p>
                        </div>
                    </div>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="mt-8 space-y-5"
                    >
                        <div>
                            <label className="font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                name='email'
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                name='password'
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                onChange={handleChange}
                                value={formData.password}
                            />
                        </div>
                        <button
                            disabled={isLoading}
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            onClick={handleSubmit}
                        >
                            Sign in
                        </button>
                        <div className="text-center">
                            <Link to="/forgotPass" className="hover:text-indigo-600">Forgot password?</Link>
                        </div>
                        {error && <div className="text-center">{error}</div>}
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}
