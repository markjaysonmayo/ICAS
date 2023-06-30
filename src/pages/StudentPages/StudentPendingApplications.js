import React from "react";
import { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import notif from "../../assets/notif.png";
import Logo from "../../assets/app-logo.png";
import resubmit from "../../assets/resubmit.png";
import close from "../../assets/close.png";

export default function StudentPendingApplications() {
    const [link, setLink] = useState({});
    const username = localStorage.getItem("fname") + " " + localStorage.getItem("mname") + " " + localStorage.getItem("lname");
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData())
    const navigate = useNavigate()
    const [pendingStudentApplications, setPendingStudentApplications] = useState([]);
    const initialFetch = useRef(true);
    
    
    function logout() {
        const cookies = new Cookies();
        cookies.remove("authToken");

        localStorage.removeItem("upmail");
        localStorage.removeItem("fname");
        localStorage.removeItem("mname"); 
        localStorage.removeItem("lname");
        localStorage.removeItem("type");
        localStorage.removeItem("link");
        localStorage.removeItem("step");
        localStorage.removeItem("aID");

        setIsLoggedIn(false)
    }

    function showNotifications() {
        document.getElementById("notifications-popup").style.display="block";
        document.getElementById("overlay").style.display="block";
    }
    function removeNotifications() {
        document.getElementById("notifications-popup").style.display="none";
        document.getElementById("overlay").style.display="none";
    }

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/")
        }

        if(initialFetch.current){
            fetch('http://localhost:3001/fetchApplications',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({upmail: localStorage.getItem("upmail"), status: "pending"})
            }).then(response=>response.json())
            .then(body=>{
                setPendingStudentApplications(body)
            })
        
            initialFetch.current = false;
        }
    }, [isLoggedIn, navigate, pendingStudentApplications])

    const handleChange = (event) => {
        setLink(event.target.value);
        console.log(link);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSUbmit");
        submitNewApplication(link);
    }

    function createNewApplication() {
        // to create new application
        document.getElementById("new-application-form").style.display = "block";
    }
    
    function closeApplication() {
        document.getElementById("new-application-form").style.display = "none";
    }
    
    function submitNewApplication(link){
        // var dateTime = require('node-datetime');
        // var dt = dateTime.create();
        // var formatted = dt.format('Y-m-d H:M:S');
        console.log("hello");
        console.log((new Date()).toString());
        fetch('http://localhost:3001/createApplication',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({link: link, submissionDate: new Date(), upmail: localStorage.getItem("upmail")})
        }).then(response=>response.json())
        .then(body=>{
            console.log(body.success)
            if(body.success){
                alert("Successfully submitted application :>")
            }
            else
                alert("Submission failed </3")
        })
    }

    function closeApplication(event, id){
        console.log(id)
        fetch('http://localhost:3001/closeApplication',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({appliId: id})
        }).then(response=>response.json())
        .then(body=>{
            console.log(body.success)
            if(body.success){
                alert("Successfully closed application :>")
                
            }
            else
                alert("Failed to close application </3")
        }).then(refresh=>{
            fetch('http://localhost:3001/fetchApplications',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({upmail: localStorage.getItem("upmail"), status: "pending"})
            }).then(response=>response.json())
            .then(body=>{
                setPendingStudentApplications(body)
            })
        
        }) 
    }

    function createApplication(){
        fetch('http://localhost:3001/openApplication',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({upmail: localStorage.getItem("upmail")})
        }).then(response=>response.json())
        .then(body=>{
            console.log(body.success)
            console.log(localStorage.getItem("upmail"))
            if(body.success){
                alert("Successfully opened an application :>")
                navigate("/student/application")
            }
            else
                alert("Creating an application failed </3")
        })
    }

    // let pendingStudentApplications = [
    //     {
    //         "id": "APPLICATION-NO-542",
    //         "status":"PENDING", 
    //         "step": "ADVISER",
    //         // to add remarks and other fields
    //     },
    //     {
    //         "id": "APPLICATION-NO-0983",
    //         "status":"PENDING", 
    //         "step": "CLEARANCE OFFICER",
    //         // to add remarks and other fields
    //     },
    // ]

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
                <button>Log Out</button>
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
            <div className="student-body">
            <div className="student-page">
                <div className="left-panel">
                <div className="left-stud">   
                    <div className="info">
                        <div id="site-name">
                            ICAS
                        </div>
                        <div id="welcome">
                            Welcome,
                            <text id="user-name">{username.toUpperCase()}!</text>
                        </div>
                    </div>
                    <Link to={`/student/application`} className="navigation-button">Create an Application</Link>
                    
                    </div>
                </div>
                <div className="right-panel">
                    <div className="nav-header">CLEARANCE APPLICATIONS</div>
                    <div className="app-views">
                            <Link to={`/student`} id="link"><span id="nav-link">All</span></Link>
                            <Link to={`/open-applications`} id="link"><span id="nav-link">Open</span></Link>
                            <Link to={`/pending-applications`} id="active-link"><span id="nav-link"  className="active-link">Pending</span></Link>
                            <Link to={`/cleared-applications`} id="link"><span id="nav-link">Cleared</span></Link>
                            <Link to={`/closed-applications`} id="link"><span id="nav-link">Closed</span></Link>
                    </div>
                    <div className="all-applications">
                    {
                        pendingStudentApplications.map((application)=>{
                            return <div className="applications">
                                <div id="application">
                                    <text id="app-id">{application._id}</text>
                                        <div id="app-status">
                                            <text id="status">{application.status.toUpperCase()}</text>
                                        </div>
                                        <div id="app-step">
                                            <text id="step">{application.step}</text>
                                        </div>
                                        <div id="pending-buttons">
                                            <div id="close" onClick={event => closeApplication(event, application._id)}>
                                                <img src={close} />
                                            </div>
                                            <div id="resubmit">
                                                <img src={resubmit} />
                                            </div>
                                        </div>
                                </div>
                                    
                            </div>
                        })
                    }
                </div>
                </div>
                
            </div>
            </div>
            
        </>
    )
}