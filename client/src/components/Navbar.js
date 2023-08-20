import React, { useEffect } from 'react';
import Login from '../pages/Login';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import logo from "../images/logo.png"

export default function Navbar() {
    const [state, setState] = useState(false)
    const { logout } = useLogout()

    const { user } = useAuthContext();
    const handleClick = () => {
        logout()
    }

    return (
        <nav className="bg-gray-800 w-full border-b md:border-0 md:static">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <img
                        src={logo}
                        width={120}
                        height={50}
                        alt="Float UI logo"
                    />
                </div>
                <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {user?.publisher && <li className="text-gray-100 hover:text-indigo-600">
                            <Link to='/publisher'><button className='font-semibold bg-gradient-to-r m-5 rounded-lg from-purple-800 to-blue-700 hover:text-yellow-700 hover:scale-110 transition duration-200 ease-out shadow-sm shadow-yellow-200 py-1 px-2'>Publisher</button></Link>
                        </li>}
                        <li className="text-gray-100 hover:text-indigo-600">
                            <Link to='/viewer'><button className='font-semibold bg-gradient-to-r m-5 rounded-lg from-purple-800 to-blue-700 hover:text-yellow-700 hover:scale-110 transition duration-200 ease-out shadow-sm shadow-yellow-200 py-1 px-2'>Viewer</button></Link>
                        </li>
                    </ul>
                </div>
                {user && (
                    <>
                        <span className='font-semibold text-white m-3'>Hello <span className='text-red-700'>{user.name}!</span>  </span>
                        <div className="hidden md:inline-block">
                            <button className="p-2 text-white bg-gradient-to-r from-purple-800 to-blue-700 hover:text-yellow-700 hover:scale-110 transition duration-200 ease-out rounded-md shadow" onClick={handleClick}>
                                Logout
                            </button>
                        </div>
                    </>
                )}
                {!user && (
                    <>
                        <Link to="/login">
                            <div className="hidden md:inline-block mx-5">
                                <button className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">
                                    Login
                                </button>
                            </div>
                        </Link>
                        <Link to="/register">
                            <div className="hidden md:inline-block mx-5">
                                <button className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">
                                    Signup
                                </button>
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}