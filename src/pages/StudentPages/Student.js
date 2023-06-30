import React from "react";
import { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate, useLoaderData } from 'react-router-dom';

import './Student.css';
import Logo from "../../assets/app-logo.png";
import notif from "../../assets/notif.png";




function createNewApplication() {
    // to create new application
    document.getElementById("new-application-form").style.display = "block";
}

function closeApplication() {
    document.getElementById("new-application-form").style.display = "none";
}

function showNotifications() {
    document.getElementById("notifications-popup").style.display="block";
    document.getElementById("overlay").style.display="block";
}
function removeNotifications() {
    document.getElementById("notifications-popup").style.display="none";
    document.getElementById("overlay").style.display="none";
}

export default function Student() {
    
    const [link, setLink] = useState({});
    const username = localStorage.getItem("fname") + " " + localStorage.getItem("mname") + " " + localStorage.getItem("lname");
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData())
    const navigate = useNavigate()
    const [allStudentApplications, setAllStudentApplications] = useState([]);
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
                body: JSON.stringify({upmail: localStorage.getItem("upmail"), status: "open"})
            }).then(response=>response.json())
            .then(body=>{
                setAllStudentApplications(body)
            })
        
        }) 
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
                body: JSON.stringify({upmail: localStorage.getItem("upmail"), status: "all"})
            }).then(response=>response.json())
            .then(body=>{
                // console.log(body.success)
                setAllStudentApplications(body)
            })
        
        initialFetch.current = false;
    }
    }, [isLoggedIn, navigate, allStudentApplications])
    
    const handleChange = (event) => {
        setLink(event.target.value);
        console.log(link);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // submitNewApplication(link);
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

    function goToApp(event, aID){
        localStorage.setItem("aID", aID)
        navigate("/student/application");
    }

    // function submitNewApplication(link){
    //     // var dateTime = require('node-datetime');
    //     // var dt = dateTime.create();
    //     // var formatted = dt.format('Y-m-d H:M:S');
    //     console.log("hello");
    //     console.log((new Date()).toString());
    //     fetch('http://localhost:3001/createApplication',
    //     {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({link: link, submissionDate: new Date(), upmail: localStorage.getItem("upmail")})
    //     }).then(response=>response.json())
    //     .then(body=>{
    //         console.log(body.success)
    //         if(body.success){
    //             alert("Successfully submitted application :>")
    //         }
    //         else
    //             alert("Submission failed </3")
    //     })
    // }
    // let allStudentApplications = [
    //     {
    //         "id": "APPLICATION-NO-1",
    //         "status":"CLEARED",
    //         "step": 2,
    //         // to add remarks and other fields
    //     },
    //     {
    //         "id": "APPLICATION-NO-2",
    //         "status":"OPEN", 
    //         "step": 1,
    //         // to add remarks and other fields
    //     },
    //     {
    //         "id": "APPLICATION-NO-3",
    //         "status":"CLOSED",
    //         "step": 2,
    //         // to add remarks and other fields
    //     },
    //     {
    //         "id": "APPLICATION-NO-4",
    //         "status":"PENDING", 
    //         "step": 3,
    //         // to add remarks and other fields
    //     },
    // ]

    return(
        <>  
            <div className="navigation-bar">

                <img src={Logo}></img>
                <a href="javascript:void(0)" id="notification-icon" onClick={showNotifications}>

                    <img src={notif}/>
                    <div className="badge"></div>
                </a>
                <button onClick={logout}>Log Out</button>
                <div id="overlay"></div>
                {/* <div id="notifications-popup">
                    Notifications
                    <div id="notifications">
                        <div id="notification">
                            Your submission has been returned
                        </div>
                    </div>
                    <button onClick={removeNotifications} className="print-pdf-button">Close</button> */}
                </div>
            
            {/* </div> */}

            <div className="student-body">
                <div className="student-page">
                    <div className="left-panel">
                        <div className="info">
                            <div id="site-name">
                                ICAS
                            </div>
                            <div id="welcome">
                                Welcome,
                                <text id="user-name">{username.toUpperCase()}!</text>
                            </div>
                        </div>
                        <button className="navigation-button" onClick={createApplication}>Create an Application</button>
                        {/* <Link to={`/student/application`} className="navigation-button">Create an Application</Link> */}
                        {/* <div className="clearance-options">
                            <button id="application-button" onClick={createNewApplication}>Create an Application</button>
                            <div className = "new-application">
                                <form id = "new-application-form" style={{display:"none"}} onSubmit={handleSubmit}>
                                        <div id="add-form">
                                            <input
                                                className="app-input"
                                                type="text"
                                                name="github-link"
                                                placeholder="GitHub Link"
                                                required
                                                onChange={handleChange}
                                            /><br/>
                                            <input className="submit-application-button" type="submit" value="Submit" />
                                        </div>
                                        <button className="close-application-button" onClick={closeApplication}>Cancel Application</button>
                                    </form>
                                </div>
                            </div> */}
                </div>
                <div className="right-panel">
                        <div className="nav-header">CLEARANCE APPLICATIONS</div>
                        <div className="app-views">
                                <Link to={`/student`} id="active-link"><span id="nav-link" className="active-link">All</span></Link>
                                <Link to={`/open-applications`} id="link"><span id="nav-link">Open</span></Link>
                                <Link to={`/pending-applications`} id="link"><span id="nav-link">Pending</span></Link>
                                <Link to={`/cleared-applications`} id="link"><span id="nav-link">Cleared</span></Link>
                                <Link to={`/closed-applications`} id="link"><span id="nav-link">Closed</span></Link>
                        </div>
                        <div className="all-applications">
                        {
                            allStudentApplications.map((application)=>{ 
                                return <div className="applications">
                                    <div id="application">
                                        <text id="app-id">{application._id}</text>
                                        <div id="app-status">
                                            <text id="status">{application.status.toUpperCase()}</text>
                                        </div>
                                        <div id="student-nav-section">
                                            <button id="student-nav-button" onClick={event => goToApp(event, application._id)}>View</button>
                                            {/* <button id="student-nav-button" onClick={event => closeApplication(event, application._id)}>Close</button> */}
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
