import "./Application.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import Logo from "../../assets/app-logo.png";
import notif from "../../assets/notif.png";

export default function Application() {
    const [link, setLink] = useState("");
    const [step, setStep] = useState(0);
    const username = localStorage.getItem("fname") + " " + localStorage.getItem("mname") + " " + localStorage.getItem("lname");
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData())
    const navigate = useNavigate()
    const initialFetch = useRef(true);
        
    
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

        if(initialFetch.current){
            fetch('http://localhost:3001/fetchLink',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({appliId: localStorage.getItem("aID")})
            }).then(response=>response.json())
            .then(body=>{
                setLink(body)
            })

            
            fetch('http://localhost:3001/fetchStep',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({appliId: localStorage.getItem("aID")})
            }).then(response=>response.json())
            .then(body=>{
                setStep(body)
            })
        
            initialFetch.current = false;
        }
    }, [isLoggedIn, navigate])
    
    const  handleChange = (event) => {
        setLink(event.target.value);
        console.log(link);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        submitLink(link);
    }

    function saveLink(link){
        fetch('http://localhost:3001/saveApplication',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({upmail: localStorage.getItem("upmail"), appliId: localStorage.getItem("aID"), link: link, submissionDate: new Date()})
        }).then(response=>response.json())
        .then(body=>{
            console.log(body.success)
            if(body.success){
                alert("Successfully saved link!")
                localStorage.setItem("link", link)
                setStep(1)
            }
            else
                alert("Failed to save link ;(")
        })
    }

    function submitLink(link){
        if(step == 2 || step > 2)
            return;

        fetch('http://localhost:3001/submitApplication',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({upmail: localStorage.getItem("upmail"), appliId: localStorage.getItem("aID"), link: link, submissionDate: new Date()})
        }).then(response=>response.json())
        .then(body=>{
            console.log(body.success)
            if(body.success){
                alert("Successfully submitted link!")
                localStorage.setItem("link", link)
                setStep(2)
                navigate("/student/application/adviser");
            }
            else
                alert("Failed to submit link ;(")
    })}

    const handleSave = (event) => {
        event.preventDefault();
        saveLink(link);
    }

    function showNotifications() {
        document.getElementById("notifications-popup").style.display="block";
        document.getElementById("overlay").style.display="block";
    }
    function removeNotifications() {
        document.getElementById("notifications-popup").style.display="none";
        document.getElementById("overlay").style.display="none";
    }

    return(
        <>
            <div className="navigation-bar">

                <img src={Logo}></img>

                <a href="javascript:void(0)" id="notification-icon" onClick={showNotifications}>
                    <img src={notif}/>
                    <div className="badge"></div>
                </a>
                <button >Log Out</button>
                <div id="overlay"></div>
                <div id="notifications-popup">
                    Notifications
                    <div id="notifications">
                        <div id="notification">
                            Your submission has been returned
                        </div>
                    </div>
                    <button onClick={removeNotifications} className="print-pdf-button">Close</button>
                </div>
            
            </div>
            <div className="application-body">
                <div className="application-page">
                    <div className="application-left-panel">
                        <div className="info">
                            <div id="site-name">
                                ICAS
                            </div>
                            <div id="welcome">
                                Welcome,
                                <text id="user-name">{username.toUpperCase()}</text>
                            </div>
                            <Link to={`/student`} className="navigation-button">Back to Home</Link>
                        </div>
                    </div>
                    <div className="application-right-panel">
                        <div className="nav-header">CLEARANCE APPLICATIONS</div>
                        <div className="application-views">
                            <Link to={`/student/application`} id="active-link"><span id="app-nav-link" className="active-link">Application</span></Link>
                            <Link to={`/student/application/adviser`} id="application-link"><span id="app-nav-link">Adviser</span></Link>
                            <Link to={`/student/application/clearance-officer`} id="application-link"><span id="app-nav-link">Clearance Officer</span></Link>
                            <Link to={`/student/application/finish`} id="application-link"><span id="app-nav-link">Finish</span></Link>
                        </div>
                        <div id="application-submit-link">
                                <form id="application-form-buttons" onSubmit={handleSubmit}>
                                    <div id="application-add-form">
                                        <text id="link-input-title">
                                            LINK
                                        </text>
                                        <input
                                            id="application-link-input"
                                            type="text"
                                            name="github-link"
                                            value={link}
                                            placeholder="Enter GitHub Link"
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div id="application-buttons">
                                        <button className="save-link-button" onClick={handleSave}>Save</button>
                                        <input className="submit-link-button" type="submit" value="Submit"/>
                                    </div>
                                </form>
                                <div id="application-buttons">
                                    <Link to={`/student/application/adviser`} id="navigation-button">Next</Link>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}