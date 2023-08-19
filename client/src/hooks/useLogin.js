import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        console.log("OK")
        const response = await fetch("http://localhost:5000/loginuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()
        console.log(json)
        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({ type: "LOGIN", payload: json })
            setIsLoading(false)
        }
    }
    return { login, isLoading, error }
} 