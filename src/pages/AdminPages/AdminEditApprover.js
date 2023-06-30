import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import Logo from "../../assets/app-logo.png";
import "./Admin.css";

export default function AdminEditApprover(){
    const username = localStorage.getItem("fname") + " " + localStorage.getItem("mname") + " " + localStorage.getItem("lname");
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData())
    const navigate = useNavigate()
    const [account, setAccount] = useState({fname: localStorage.getItem("edit_aprFname"), mname: localStorage.getItem("edit_aprMname"), lname: localStorage.getItem("edit_aprLname")});
    
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

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/")
        }

        fetch('http://localhost:3001/showApprovers')
        .then(response => response.json())
        .then(body=>{
            console.log(body)
            setApproverAccounts(body)
        })
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
    }

    function sortByAscending(){
        setApproverAccounts(
            approverAccounts.sort((a, b) => {
                let fa = a.fname.toLowerCase(), fb = b.fname.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            })
        )
        console.log(approverAccounts);
    }


    function sortByDescending(){
        setApproverAccounts(
            approverAccounts.sort((a, b) => {
                let fa = a.fname.toLowerCase(), fb = b.fname.toLowerCase();

                if (fa > fb) {
                    return -1;
                }
                if (fa < fb) {
                    return 1;
                }
                return 0;
            })
        )
        console.log(approverAccounts);
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
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSUbmit");
        addApproverAccount(account);
    }

    function addApproverAccount(account){
        console.log(account);

        fetch('http://localhost:3001/addApprover',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fname: account.fname, mname: account.mname, lname: account.lname, upmail: account.email, password: account.password})
        }).then(response=>response.json())
        .then(body=>{
            console.log(body.success)
            if(body.success)
                alert("Successfully added approver account!")
            else
                alert("Failed to add approver account ;(")
        })
    }

    const handleEdit = (event) => {
        event.preventDefault();
        editApproverAccount(account);
    }

    function editApproverAccount(account){
        console.log(account);

        fetch('http://localhost:3001/editApprover',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: localStorage.getItem("edit_aprId"), fname: account.fname, mname: account.mname, lname: account.lname})
        }).then(response=>response.json())
        .then(body=>{
            console.log(body.success)
            if(body.success)
                alert("Successfully edited approver account!")
            else
                alert("Failed to edit approver account ;(")
        })

        localStorage.removeItem("edit_aprId");
        localStorage.removeItem("edit_aprFname");
        localStorage.removeItem("edit_aprMname"); 
        localStorage.removeItem("edit_aprLname");
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
                </div> 

                <div className="admin-right">
                    <h1 id="admin-panel">Admin Panel</h1>
                    
                    {/* Admin Manage Students - Navigation Buttons */}
                    <div className="admin-right-buttons">
                        <Link to={`/manage-approvers`} id="link">
                            <span id="admin-link">
                                View Approver Accounts
                            </span>
                        </Link>
                        <Link to={`/create-approver`} id="active-link">
                            <span id="admin-link" className="active-link">
                                Editing Approver Account
                            </span>
                        </Link>
                    </div>

                    {/* Admin Manage Approvers - Edit Data */}
                    <form className="sign-up" id="approver-form"onSubmit={handleEdit}>
                        <div className="signup-form">
                            <input 
                                className="input-box"
                                type="text" 
                                name="fname"
                                value={account.fname || ""} 
                                required
                                placeholder="First name"
                                onChange={handleChange}
                            />

                            <input 
                                className="input-box"
                                type="text" 
                                name="mname"  
                                value={account.mname || ""} 
                                required
                                placeholder="Middle name"
                                onChange={handleChange}
                            />
                        
                            <input 
                                className="input-box"
                                type="text" 
                                name="lname"  
                                value={account.lname || ""} 
                                required
                                placeholder="Last name"
                                onChange={handleChange}
                            />
                        </div>
                        
                        {/* Conditional Buttons */}
                        <div className="edit-buttons">
                            <input className="login-button" type="submit" value="Edit"/>
                            <Link to={`/manage-approvers`} id="link">
                                <button className="login-button" onClick={event => {
                                        localStorage.removeItem("edit_aprId");
                                        localStorage.removeItem("edit_aprFname");
                                        localStorage.removeItem("edit_aprMname");
                                        localStorage.removeItem("edit_aprLname");
                                    }
                                }>Cancel</button>
                            </Link>
                        </div>    
                    </form>
                </div>   
            </div>
        </div>
    )
}