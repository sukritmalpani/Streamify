import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const signup = async (name, email, password) => {
        setIsLoading(true)
        setError(null)
        console.log("OK")
        const response = await fetch("http://localhost:5000/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json()
        console.log(json)
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({ type: "LOGIN", payload: json })
            setIsLoading(false)
        }
    }
    return { signup, isLoading, error }
} 