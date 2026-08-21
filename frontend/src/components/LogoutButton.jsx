import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";


const LogoutButton = ({children, className})=>{
    const {logout} = useAuthStore()
    const navigate = useNavigate()

    const onLogout = async()=>{
        await logout();
        navigate("/login")
    }



    return (
        <button className={className || "btn btn-primary"} onClick={onLogout}> 
            {children}
        </button>
    )
}

export default LogoutButton;