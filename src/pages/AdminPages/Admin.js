import { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import Logo from "../../assets/app-logo.png";
import "./Admin.css";

export default function Admin(){
    const username = localStorage.getItem("fname") + " " + localStorage.getItem("mname") + " " + localStorage.getItem("lname");
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData())
    const navigate = useNavigate();
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

    const [studentRequests, setStudentRequests] = useState([]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/")
        }

        if(initialFetch.current){
            fetch('http://localhost:3001/showStudentAccountApplications')
            .then(response => response.json())
            .then(body=>{
                console.log(body)
                setStudentRequests(body)
            })
        
            initialFetch.current = false;
        }
    }, [isLoggedIn, navigate, studentRequests])

    function approveRequest(event, id){
        fetch('http://localhost:3001/validateStudentAccount',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        }).then(response=>response.json())
        .then(body=>{
            console.log(body.success)
            if(body.success){
                alert("Approved account request!")
            }
            else
                alert("Failed to approve request ;(")
        })
        .then(refresh=>{
            fetch('http://localhost:3001/showStudentAccountApplications')
            .then(response => response.json())
            .then(body=>{
                console.log(body)
                setStudentRequests(body)
            })
        })
    }

    function rejectRequest(event, id) {
        fetch('http://localhost:3001/removeStudentAccountApplication',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        }).then(response=>response.json())
        .then(body=>{
            console.log(body.success)
            if(body.success){
                alert("Rejected account request!")
            }
            else
                alert("Failed to reject request ;(")
        })
        .then(refresh=>{
            fetch('http://localhost:3001/showStudentAccountApplications')
            .then(response => response.json())
            .then(body=>{
                console.log(body)
                setStudentRequests(body)
            })
        })
    }

    function sortByName(){
        const sorted = [...studentRequests].sort((a, b) => {
            const fa = a.fname.toLowerCase() + " " + a.mname.toLowerCase() + " " + a.lname.toLowerCase();
            const fb =  b.fname.toLowerCase() + " " + b.mname.toLowerCase() + " " + b.lname.toLowerCase();

            if (fa > fb) {
                return 1;
            }
            if (fa < fb) {
                return -1;
            }
            return 0;
        })
        setStudentRequests(sorted);
    }

    function sortByStudNo(){
        const sorted = [...studentRequests].sort((a, b) => {
            return  a.stdno - b.stdno;
        })

        setStudentRequests(sorted);
    }
    
    return(
        <div className="admin-home"> 
            {/* Navigation Bar */}
            <div className="navigation-bar">
                <img src={Logo}></img>
                <button onClick={logout}>Log Out</button>
            </div>

            {/* Admin Page */}
            <div className="admin-body">

                {/* Admin Sidebar */}
                <div className="admin-left">
                    <h1 id="site-name">ICAS</h1>
                    <div id="welcome">
                        <h3>Welcome,</h3>
                        <h2 id="user-name">{username}</h2>
                    </div>
                    {/* Admin Sidebar - Buttons */}
                    <div className="admin-left-buttons">
                        <Link to={`/admin`}>
                            <button id="active">
                                Manage Students
                            </button>
                        </Link>
                        <Link to={`/manage-approvers`}>
                            <button>
                                Manage Approvers
                            </button>
                        </Link>
                    </div>
                </div> 

                {/* Admin Manage Student - Student Account Applications */}
                <div className="admin-right">
                    <h1 id="admin-panel">Admin Panel</h1>

                    {/* Admin Manage Students - Navigation Buttons */}
                    <div className="admin-right-buttons">
                        <Link to={`/admin`} id="active-link">
                            <span id="admin-link" className="active-link">
                                Student Account Applications
                            </span>
                        </Link>
                        <Link to={`/manage-students`} id="link">
                            <span id="admin-link">
                                Verified Student Accounts
                            </span>
                        </Link>
                    </div>
                    
                    {/* Admin Manage Students - Data */}
                    <div className="stud-reqs">
                        {studentRequests.map((account, i) => {
                            return (
                                <div className="student-requests">
                                    {/* Data - Student Informations */}
                                    <div className="student-info">
                                        <span>Name: {account.fname} {account.mname} {account.lname}</span>
                                        <span>Student number: {account.stdno} </span>
                                        <span>Email: {account.upmail}</span>
                                    </div>
                                    
                                    {/* Data - Response Buttons */}
                                    <div className="student-buttons">
                                        <button className="res-button" onClick={event => approveRequest(event, account._id)}>Approve</button>
                                        <button className="res-button" onClick={event => rejectRequest(event, account._id)}>Reject</button>
                                    </div>
                                    
                                </div>
                            )
                        })}
                    </div>
                    
                    {/* Admin Manage Students - Sorting Options */}
                    <div className="sorting">
                        <h3>Sort by:</h3>
                        <button onClick={sortByName}>Name</button>
                        <button onClick={sortByStudNo}>Student Number</button>
                    </div>
                </div>   
            </div>
        </div>
    )
}