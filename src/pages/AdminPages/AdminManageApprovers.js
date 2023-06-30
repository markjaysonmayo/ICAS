import { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import Logo from "../../assets/app-logo.png";
import "./Admin.css";

export default function AdminManageApprovers(){
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

    const [approverAccounts, setApproverAccounts] = useState([]);
    const [showCreateApproverModal, setShowCreateApproverModal] = useState(false);

    function closeSearchTabs() {
        fetch('http://localhost:3001/showApprovers')
        .then(response => response.json())
        .then(body=>{
            setApproverAccounts(body)
        })

        document.getElementById("new-csv").style.display = "none";
        document.getElementById("new-csv").reset();
    }
    
    function searchStudentByName() {
        // to create new application
        document.getElementById("search-by-name").style.display = "block";
        
    }

    
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/")
        }

        if(initialFetch.current){
            fetch('http://localhost:3001/showApprovers')
            .then(response => response.json())
            .then(body=>{
                setApproverAccounts(body)
            })
        
            initialFetch.current = false;
        }
    }, [isLoggedIn, navigate, approverAccounts])

    function deleteApprover(event, id){
        console.log(id)
        fetch('http://localhost:3001/deleteApprover',
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
                alert("Successfully deleted approver :>")
            }
            else
                alert("Approver account deletion has failed </3")
        })
        .then(refresh=>{
            fetch('http://localhost:3001/showApprovers')
            .then(response => response.json())
            .then(body=>{
                setApproverAccounts(body)
            })
        })
    }

    function sortByAscending(){
        const sorted = [...approverAccounts].sort((a, b) => {
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
        setApproverAccounts(sorted);
    }


    function sortByDescending(){
        const sorted = [...approverAccounts].sort((a, b) => {
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
        setApproverAccounts(sorted);
    }

    function createNewApprover() {
        // to create new application
        document.getElementById("new-approver-form").style.display = "block";
    }
    
    function closeApplication() {
        document.getElementById("new-approver-form").style.display = "none";
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAccount(values => ({...values, [name]: value}));
        console.log(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addApproverAccount(account);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        searchApprover(account);
    }

    function searchApprover(account){
        fetch(`http://localhost:3001/searchByNameApprover?fname=${account.fname}&mname=${account.mname}&lname=${account.lname}`)
        .then(response => response.json())
        .then(body=>{
            setApproverAccounts(body)
        })
    }

    function addApproverAccount(account){
        console.log(account);

        fetch('http://localhost:3001/addApprover',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fname: account.fname, mname: account.mname, lname: account.lname, upmail: account.upmail, password: account.password})
        }).then(response=>response.json())
        .then(body=>{
            console.log(body.success)
            if(body.success)
                alert("Successfully added approver account!")
            else
                alert("Failed to add approver account ;(")
        })
    }

    function showSearch() {
        // to create new application
            document.getElementById("new-csv").style.display = "block";
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
                            <button>
                                Manage Students
                            </button>
                        </Link>
                        <Link to={`/manage-approvers`}>
                            <button id="active">
                                Manage Approvers
                            </button>
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="search-app">
                        <button id="application-button" onClick={showSearch}>Search</button>
                        <form id = "new-csv" style={{display:"none"}} onSubmit={handleSearch}>

                            <div id="searching-app">
                                <input className="search-input" type="text" placeholder="First Name" name="fname" required onChange={handleChange}></input>
                                <input className="search-input" type="text" placeholder="Middle Name" name="mname" required onChange={handleChange}></input>
                                <input className="search-input" type="text" placeholder="Last Name" name="lname" required onChange={handleChange}></input>
                                
                                <input className="submit-application-button" type="submit" value="Submit" />
                                <Link to={`/manage-approvers`}>
                                    <button className="close-application-button" onClick={closeSearchTabs} type="reset">Reset</button>
                                </Link>
                            </div>         
                        </form>   
                    </div>  
                </div> 

                <div className="admin-right">
                    <h1 id="admin-panel">Admin Panel</h1>

                    {/* Admin Manage Students - Navigation Buttons */}
                    <div className="admin-right-buttons">
                        <Link to={`/manage-approvers`} id="active-link">
                            <span id="admin-link" className="active-link">
                                View Approver Accounts
                            </span>
                        </Link>
                        <Link to={`/create-approver`} id="link">
                            <span id="admin-link">
                                Create New Approver Account
                            </span>
                        </Link>
                    </div>

                    {/* Admin Manage Approvers - Data */}
                    <div className="app-accs">
                        {approverAccounts.map((account, i) => {
                            let fullname;
                            if(account.mname!=null)
                                fullname = account.fname + " " + account.mname + " " + account.lname;
                            else
                                fullname = account.fname + " " + account.lname;

                            return (
                                <div className="approver-accounts">
                                    {/* Data - Approver Information */}
                                    <div className="approver-info">
                                        <span>Name: {fullname}</span>
                                        <span>Email: {account.upmail}</span>
                                    </div>
                                    
                                    {/* Data - Response Buttons */}
                                    <div className="approver-buttons">
                                        <Link to={`/edit-approver`} id="link">
                                            <button className="res-button" onClick={event => {
                                                    localStorage.setItem("edit_aprId", account._id);
                                                    localStorage.setItem("edit_aprFname", account.fname);
                                                    localStorage.setItem("edit_aprMname", account.mname);
                                                    localStorage.setItem("edit_aprLname", account.lname);
                                                }
                                            }>Edit</button>
                                        </Link>
                                        <button className="res-button" onClick={event => deleteApprover(event, account._id)}>Delete</button>
                                    </div>
                                    
                                </div>
                                
                                )
                            })}
                    </div>
                    
                    {/* Admin Manage Approvers - Sorting Options */}
                    <div className="sorting">
                        <h3>Sort by:</h3>
                        <button onClick={sortByAscending}>Ascending</button>
                        <button onClick={sortByDescending}>Descending</button>
                    </div>
                </div>   
            </div>
        </div>
    )
}