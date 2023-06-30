import { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import Logo from "../../assets/app-logo.png";
import "./Admin.css";

export default function AdminViewStudents(){
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
    
    const [studentAccounts, setStudentAccounts] = useState([]);
    const [advisers, setAdvisers] = useState([]);
    const [curAdviser, setCurAdviser] = useState("");

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/")
        }

        if(initialFetch.current){
            fetch('http://localhost:3001/showValidatedStudentAccounts')
            .then(response => response.json())
            .then(body=>{
                console.log(body)
                setStudentAccounts(body)
            })
            
            fetch('http://localhost:3001/showApprovers')
            .then(response => response.json())
            .then(body=>{
                console.log(body)
                setAdvisers(body)
            })
        
            initialFetch.current = false;
        }
    }, [isLoggedIn, navigate, studentAccounts, advisers])
    
    const handleChange = (event) => {
        const value = event.target.value;
        setCurAdviser(value);
        console.log(curAdviser);
    }

    function assignAdviser(event, id, advId){
        event.preventDefault();
        fetch('http://localhost:3001/assignAdviserToStudent',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, adviserID: advId})
        }).then(response=>response.json())
        .then(body=>{
            console.log(body.success)
            if(body.success){
                alert("Successfully assigned adviser to student :>")

            }
            else
                alert("Assignment of adviser has failed </3")
        })
        .then(refresh=>{
            fetch('http://localhost:3001/showValidatedStudentAccounts')
            .then(response => response.json())
            .then(body=>{
                console.log(body)
                setStudentAccounts(body)
            })
        })
    }

    function sortByName(){
        const sorted = [...studentAccounts].sort((a, b) => {
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
        setStudentAccounts(sorted);
    }

    function sortByStudNo(){
        const sorted = [...studentAccounts].sort((a, b) => {
            return  a.stdno - b.stdno;
        })

        setStudentAccounts(sorted);
    }
    
    const [file, setFile] = useState("");
	const [isFilePicked, setIsFilePicked] = useState(false);
    const inputFile = useRef(null);

    const handleFileChange = (event) => {
		setFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    // const [advisers, setAdvisers] = useState([]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(file)
        if(inputFile.current!=null && file != ""){    
            const reader = new FileReader();
            var studentsL = []
            var advisersL = []
            reader.onload = function (e) {
                const text = e.target.result;
                var val = text.split("\n")
                for(let i = 0; i<val.length; i++){
                    const data = val[i].split(",")
                    studentsL.push(data[0]);
                    advisersL.push(data[1]);
                }
                assign(studentsL, advisersL)
            };
            reader.readAsText(file);
        }

    }

    function assign(studentsL, advisersL){
        console.log(studentsL)
        console.log(advisersL)

        fetch('http://localhost:3001/assignAdviserToStudentFromCSV',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({stdnoList: studentsL, advisersList: advisersL})
        }).then(response=>response.json())
        .then(body=>{
            console.log(body.success)
            if(body.success){
                alert("Successfully assigned advisers to students :>")

            }
            else
                alert("Assignment of advisers has failed </3")
        })
        .then(refresh=>{
            fetch('http://localhost:3001/showValidatedStudentAccounts')
            .then(response => response.json())
            .then(body=>{
                console.log(body)
                setStudentAccounts(body)
            })
        })
        cancelUpload("");
    }

    // function handleSubmit() {
    //     // event.preventDefault();
    //     // const reader = new FileReader();
    //     // reader.readAsText(inputFile.files[0]);
    //     // console.log(reader.result);

    //     const csvForm = document.getElementById("new-csv");
    //     const csvFile = document.getElementById("csvFile");

    //     csvForm.addEventListener("submit", function (e) {
    //         e.preventDefault();
    //         const input = csvFile.files[0];
    //         const reader = new FileReader();
    //         // reader.onload = function (e) {
    //         // const text = e.target.result;
    //         // document.write(text);
    //         // };
    //         reader.readAsText(input);
    // });
    // }

    const cancelUpload = e => {
        document.getElementById("new-csv").style.display = "none";
        document.getElementById("new-csv").reset();
        setFile("");
        setIsFilePicked(false);
    }

    function uploadNewCSV() {
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

                    {/* Uploading CSV */}
                    <div className="upload-csv">
                        <button id="application-button" className="app-button" onClick={uploadNewCSV}>Assign Adviser thru CSV</button>
                        <form id = "new-csv" style={{display:"none"}} onSubmit={handleSubmit}>
                            <div id="csv">
                                <div className="uploading-csv">                
                                    <input
                                        id="csvFile"
                                        type="file"
                                        accept=".csv"
                                        onChange={handleFileChange}
                                        ref={inputFile} />

                                    <div className="uploaded-files">
                                        {isFilePicked ? (
                                                <div>
                                                    <strong>Uploaded File: </strong> 
                                                    <span>{file.name}</span>    
                                                </div>
                                            ) : (
                                                <p>Select a file</p>
                                        )}
                                        
                                    </div>
                                    <button className="res-button" id="browse" accept=".csv" onClick={() => inputFile.current.click()}>Browse</button>
                                </div>
                                <input className="submit-application-button" type="submit" value="Upload"/>
                                <button className="close-application-button" onClick={cancelUpload} type="reset">Cancel</button>
                            </div>
                        </form>    
                    </div>
                </div> 

                {/* Admin Manage Students - View Verified Students */}
                <div className="admin-right">
                    <h1 id="admin-panel">Admin Panel</h1>

                    {/* Admin Manage Students - Navigation Buttons */}
                    <div className="admin-right-buttons">
                        <Link to={`/admin`} id="link">
                            <span id="admin-link" className="link">
                                Student Account Applications
                            </span>
                        </Link>
                        <Link to={`/manage-students`} id="active-link">
                            <span id="admin-link" className="active-link">
                                Verified Student Accounts
                            </span>
                        </Link>
                    </div>
                    
                    {/* Admin Manage Students - Data */}
                    <div className="app-accs">
                        {studentAccounts.map((account, i) => {
                            let fullname;
                            if(account.mname!=null)
                                fullname = account.fname + " " + account.mname + " " + account.lname;
                            else
                                fullname = account.fname + " " + account.lname;
                            return (
                                <div className="student-requests" id="verified-students">
                                    <div className="student-info">
                                        <div>Name: {fullname}</div>
                                        <span>Student number: {account.stdno} </span>
                                        <span>Email: {account.upmail}</span>

                                        {advisers.map((adviser, i) => {
                                            if(account.adviser == adviser._id) return <span>Adviser: {adviser.fname} {adviser.mname} {adviser.lname}</span>
                                        })}
                                    </div>
                                    
                                    {/* Data - Response Buttons */}
                                    <div className="student-buttons">
                                        {account.adviser == "" ?
                                            <>
                                                <select name="cars" id="cars" placeholder="hsahs" onChange={handleChange}>
                                                    <option value="" disabled selected hidden>Assign Adviser</option>
                                                    {advisers.map((adviser, i) => {
                                                        return (
                                                            <option id={i} value={adviser._id}>{adviser.fname} {adviser.mname} {adviser.lname}</option>
                                                            )
                                                        })}
                                                </select>
                                                <button className="res-button" onClick={event => assignAdviser(event, account._id, curAdviser)}>Submit</button>
                                            </>

                                            : null
                                        } 
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