import { AuthContext } from "../utils/AuthContext";
import { useContext } from "react";
export const useAuthContext = () => {
    const context = useContext(AuthContext)
    // if (!context) {
    //     throw error("useAuthContext must be used inside an AuthContextProvider ")
    // }
    return context
}