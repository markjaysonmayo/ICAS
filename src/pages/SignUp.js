import React from "react";
import { useState, useEffect } from "react";
import "./SignUp.css"
import Logo from "../assets/app-logo.png";

export default function SignUp(){
    const [account, setAccount] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAccount(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addAccount(account);
    }

    function addAccount(account) {
        console.log(account);

        fetch('http://localhost:3001/sign-up',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fname: account.fname, mname: account.mname, lname: account.lname, stdno: account.stdno, type: "student", upmail: account.upmail, password: account.password})
        }).then(response=>response.json())
        .then(body=>{
            console.log(body.success)
            if(body.success)
                alert("Successfully signed up!")
            else
                alert("Failed to sign up ;(")
        })
    }


    return(
        <div className="signup-page">
            <div className="title-parent">
                <img src={Logo}></img>
                <h1 className="signup-title">New to ICAS?</h1>
            </div>
            <form className="sign-up" onSubmit={handleSubmit}>
                
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

                    <input 
                        className="input-box"
                        type="number" 
                        name="stdno" 
                        value={account.stdno || ""} 
                        required
                        placeholder="Student number"
                        onChange={handleChange}
                    />

                    <input 
                        className="input-box"
                        type="email" 
                        name="upmail"  
                        value={account.upmail || ""} 
                        required
                        placeholder="UP mail"
                        onChange={handleChange}
                    />


                    <input 
                        className="input-box"
                        type="password" 
                        name="password"  
                        value={account.password || ""} 
                        required
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </div>
                    
                    
                <input className="login-button" type="submit" value="Sign Up"/>
                <div className="login-text">
                    <span>Already have an account?</span>
                    <a href="http://localhost:3000/">Log in</a>
                </div>
            </form>
        </div>
        
    )
}