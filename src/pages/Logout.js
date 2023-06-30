import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';

export default function Logout() {
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData())
    const navigate = useNavigate()
    
    function logout() {
        const cookies = new Cookies();
        cookies.remove("authToken");

        localStorage.removeItem("upmail");
        localStorage.removeItem("fname");
        localStorage.removeItem("mname"); 
        localStorage.removeItem("lname");
        localStorage.removeItem("type");

        setIsLoggedIn(false)
    }

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/")
        }
    }, [isLoggedIn, navigate])

    return (
        <>
            <h1>Logging out</h1>
            <button onClick={logout}>Log Out</button>
        </>
    )
}