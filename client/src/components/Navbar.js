import React, { useEffect } from 'react';
import Login from '../pages/Login';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {
    const [state, setState] = useState(false)
    const { logout } = useLogout()
    const { user } = useAuthContext();
    const handleClick = () => {
        logout()
    }
    // Replace javascript:void(0) path with your path
    const navigation = [
        { title: "Music", path: "/music" },
        { title: "Careers", path: "javascript:void(0)" },
        { title: "Guides", path: "javascript:void(0)" },
        { title: "Partners", path: "javascript:void(0)" }
    ]

    return (
        <nav className="bg-gray-800 w-full border-b md:border-0 md:static">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <a href="javascript:void(0)">
                        <img
                            src="https://www.floatui.com/logo.svg"
                            width={120}
                            height={50}
                            alt="Float UI logo"
                        />
                    </a>
                    <div className="md:hidden">
                        <button className="w-6 h-6 text-white outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-gray-100 hover:text-indigo-600">
                                        <a href={item.path}>
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {user && (
                    <>
                        <span style={{ color: "white" }}>{user.email}</span>
                        <div className="hidden md:inline-block">
                            <button className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow" onClick={handleClick}>
                                Logout
                            </button>
                        </div>
                    </>
                )}
                {!user && (
                    <>
                        <div className="hidden md:inline-block mx-5">
                            <button className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">
                                Login
                            </button>
                        </div>
                        <div className="hidden md:inline-block mx-5">
                            <button className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">
                                Signup
                            </button>
                        </div>
                    </>
                )}
            </div>
        </nav>
    )
}