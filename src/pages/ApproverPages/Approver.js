import React from "react";
import Cookies from "universal-cookie";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import './Approver.css'
import { uuid } from "uuidv4";

// function for adding a unique element to the return field 

function handleChange() {
    // for the input field in surname
}

function closeSearchTabs() {
    document.getElementById("search-by-num").style.display = "none";
    document.getElementById("search-by-name").style.display = "none";
    document.getElementById("close-search-button").style.display = "none";
}

function searchStudentByName() {
    // to create new application
    document.getElementById("search-by-num").style.display = "none";
    document.getElementById("search-by-name").style.display = "block";
    document.getElementById("close-search-button").style.display = "block";
    
}

function searchStudentByNum() {
    // to create new application
    document.getElementById("search-by-name").style.display = "none";
    document.getElementById("search-by-num").style.display = "block";
    document.getElementById("close-search-button").style.display = "block";
}

function returnRemarks(){
    document.getElementById("return-remarks").style.display = "block";
    document.getElementById("show-return-button").style.display = "none";
    
}


export default function Approver(){
    const username = localStorage.getItem("fname") + " " + localStorage.getItem("mname") + " " + localStorage.getItem("lname");
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData())
    const navigate = useNavigate()
    const [account, setAccount] = useState({});
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
    
    const [pendingApplications, setPendingApplications] = useState([]);

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
                setPendingApplications(body)
            })
        
            initialFetch.current = false;
        }
    }, [isLoggedIn, navigate, pendingApplications])

    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAccount(values => ({...values, [name]: value}));
        console.log(value)
    }

    const handleSearch = (event) => {
        event.preventDefault();
        searchStudentByName(account);
    }

    const handleSearchbyStdno = (event) => {
        event.preventDefault();
        searchStudentByStdno(account);
    }

    function searchStudentByName(account){
        fetch(`http://localhost:3001/searchByNameStudent?fname=${account.fname}&mname=${account.mname}&lname=${account.lname}`)
        .then(response => response.json())
        .then(body=>{
            setPendingApplications(body)
        })
    }

    function searchStudentByStdno(account){
        fetch(`http://localhost:3001/searchByStudentNoStudent?stdno=${account.stdno}`)
        .then(response => response.json())
        .then(body=>{
            setPendingApplications(body)
        })
    }
    
    function sortByAscending(){
        const sorted = [...pendingApplications].sort((a, b) => {
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
        setPendingApplications(sorted);
    }

    function sortByDescending(){
        const sorted = [...pendingApplications].sort((a, b) => {
            const fa = a.fname.toLowerCase() + " " + a.mname.toLowerCase() + " " + a.lname.toLowerCase();
            const fb =  b.fname.toLowerCase() + " " + b.mname.toLowerCase() + " " + b.lname.toLowerCase();

            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        })
        //setApproverAccounts(sorted);
    }

    // let pendingStudentApplications = [
    //     {
    //         "id": "APPLICATION-NO-5",
    //         "status":"open", 
    //         "step": 1,
    //         "remarks": ["GitHub link not working", "Resubmit with working github link"],
    //         "links": "Github.com/efewfwfewfwe/plsfsefs"
    //         // to add remarks and other fields
    //     },
    //     {
    //         "id": "APPLICATION-NO-53",
    //         "status":"open", 
    //         "step": 3,
    //         "remarks": ["Adviser not found"],
    //         "links": "https://github.com/CMSC100/cmsc-100-project-100-uv3l-group-4"
    //         // to add remarks and other fields
    //     },
    //     {
    //         "id": "APPLICATION-NO-98",
    //         "status":"pending", 
    //         "step": 3,
    //         "remarks": ["Insufficient requirements submitted"],
    //         "links": "Github.com/efewfwfewfwe/plsfsefs"
    //         // to add remarks and other fields
    //     },
    // ]

    return(
        <>
            <div className="navigation-bar">
                <button onClick={logout}>Log Out</button>
            </div>
            <div className="approver-body">
                <div className="approver-page">
                    <div className="aprover-left-panel">
                        <div className="info">
                            <div id="site-name">
                                ICAS
                            </div>
                            <div id="welcome">
                                Welcome,
                                <text id="user-name">{username.toUpperCase()}!</text>
                                
                            </div>
                        </div>
                        <div className="search">
                            <button onClick={searchStudentByName} id="search-button">Search by Name</button>
                            <div id="search-by-name" style={{display:"none"}} onSubmit={handleSearch}>
                                <form id="search-name-form">
                                        <input
                                            className="search-input"
                                            type="text"
                                            name="fname"
                                            required
                                            onChange={handleChange}
                                            placeholder="First Name"
                                    />
                                    <input
                                            className="search-input"
                                            type="text"
                                            name="mname"
                                            required
                                            onChange={handleChange}
                                            placeholder="Middle Name"
                                    />
                                        <input
                                            className="search-input"
                                            type="text"
                                            name="lname"
                                            required
                                            onChange={handleChange}
                                            placeholder="Last Name"
                                    />
                                    <input className="search-button" type="submit" value="Search" />
                                </form>
                            </div>
                            <button onClick={searchStudentByNum} id="search-button">Search by Student Number</button>
                            <div id="search-by-num" style={{display:"none"}} onSubmit={handleSearchbyStdno}>
                                <form id="search-number-form">
                                        <input
                                            className="search-input"
                                            type="number"
                                            name="stdno"
                                            required
                                            onChange={handleChange}
                                            placeholder="Student Number"
                                    />
                                    <input className="search-button" type="submit" value="Search" />
                                </form>
                            </div>
                            <button onClick={closeSearchTabs} id="close-search-button" style={{display:"none"}}>Close Search</button>
                        </div>
                    </div>

                    <div className="approver-right-panel">
                        <div className="nav-header">PENDING APPLICATIONS</div>
                        <div id="sort-and-filter">
                            <div id="approver-filters">
                                <text>FILTER:</text>
                                <button>Date</button>
                                <button>Adviser</button>
                                <button>Step</button>
                                <button>Status</button>
                            </div>
                            <div id="approver-sort">
                                <text>SORT:</text>
                                <button>Date</button>
                                <button>Ascending</button>
                                <button>Descending</button>
                            </div>
                        </div>
                        
                        <div className="pending-applications">
                            {   
                                pendingApplications.map((application)=>{
                                    return <div className="applications">
                                        <div id={application.id}>
                                        <div className="view-application">
                                            <div className="pending-application" id={application.id}>
                                                
                                                <text id="app-id">{application.id}</text>
                                                <Link className="pending-button" to={`/approver/application`}>View</Link>
                                                {/* <button className="pending-button" id="view-application" onClick={() => {document.getElementById(`${application.id}`).style.display="none"; document.getElementById(`${application.id}-view`).style.display="block"}}>View</button> */}
                                                <button className="pending-button" id="approve-application">Approve</button>
                                                <button className="pending-button" id="reject-application">Reject</button>

                                                {/* <text id="status">{application.status.toUpperCase()}</text>
                                                step: {application.step}<br/>
                                                Student submissions: {application.links}<br/>
                                                Remark/s: <br/>
                                                {
                                                    application["remarks"].map((remark)=>{
                                                        return <ul>{remark}</ul>
                                                    })
                                                }
                                                <br/> */}
                                            
                                            </div>
                                        </div>
                                        </div>
                                        
                                        {/* <form id="return-remarks" style={{display:"none"}}>
                                            <label className="input-remarks">Remark:<br/>
                                            <input
                                            className="input-box"
                                            type="text"
                                            name="remarks"
                                            required
                                            onChange={handleChange}
                                            />
                                            </label><br/>
                                            <button id="return-with-remarks">Return</button><br/>
                                        </form> */}
                                        <div id={application.id+`-view`} style={{display: "none"}}>
                                            <div className="view-application">
                                                <div className="pending-application">
                                                    <text id="app-id">{application.id}</text>
                                                    <button className="active-pending-button" id="view-application" onClick={() => {document.getElementById(`${application.id}`).style.display="block"; document.getElementById(`${application.id}-view`).style.display="none"}}>Close</button>
                                                    <button className="pending-button" id="approve-application">Approve</button>
                                                    <button className="pending-button" id="reject-application">Reject</button>
                                                </div>
                                                <hr/>
                                                <div className="application-info">

                                                    <div id="pending-status">
                                                        <text id="title-status">Status</text>
                                                        <div id="info-status">Pending</div>
                                                    </div>

                                                    <div id="pending-step">
                                                        <text id="title-step">Step</text>
                                                        <div id="info-step">2</div>
                                                    </div>

                                                    <div id="submissions">
                                                        <text id="title-submission">Submissions</text>
                                                        <div id="submission-bin">{application.links}</div>
                                                    </div>

                                                    <div id="remarks">
                                                        <text id="title-remark">Remarks</text>
                                                        <div id="remark-bin">
                                                            {
                                                            application["remarks"].map((remark)=>{
                                                                return <div id="remark">{remark}</div>
                                                            })
                                                            }
                                                        </div>
                                                    </div>

                                                    
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