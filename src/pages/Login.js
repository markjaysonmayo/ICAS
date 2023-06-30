import { useState, useEffect } from "react";
import "./Login.css"
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import Logo from "../assets/app-logo.png";

export default function Login() {
    const [account, setAccount] = useState({});
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [type, setType] = useState("");

    // redirect when login is successful
    useEffect(() => {
        if (isLoggedIn && type == "student") {
            navigate("/student")
        }
        else if (isLoggedIn && type == "admin") {
            navigate("/admin")
        }
        else if (isLoggedIn && type == "approver") {
            navigate("/approver")
        }
    }, [isLoggedIn, navigate])

    // placeholder
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAccount(values => ({ ...values, [name]: value }));
    }


    const handleLogin = (event) => {
        event.preventDefault();
        verifyAccount(account);
        // redirectPage();
    }

    function verifyAccount(account) {
        console.log(account);

        fetch('http://localhost:3001/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ upmail: account.upmail, password: account.password })
            }).then(response => response.json())
            .then(body => {
                console.log(body);
                if (body.success){
                    alert("Successfully logged in!");
                    setType(body.type)
                    setIsLoggedIn(true)
                    // successful log in. store the token as a cookie
                    const cookies = new Cookies()
                    cookies.set(
                        "authToken",
                        body.token,
                        {
                          path: "localhost:3001/",
                          sameSite: false
                        });
            
                    localStorage.setItem("upmail", body.upmail);
                    localStorage.setItem("fname", body.fname);
                    localStorage.setItem("mname", body.mname); 
                    localStorage.setItem("lname", body.lname);
                    localStorage.setItem("type", body.type);
                }
                else if (body.message == "!email" || body.message == "!password")
                    alert("Invalid email or password")
                else if (body.message == "!isValidated")
                    alert("Account not yet verified")
            })
    }

    return (
        <div className="login-container">
            <div className="login-field">
                <div className="login-site">
                    <img src={Logo}></img>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="login-form">
                        <input
                            className="input-field"
                            type="email"
                            name="upmail"
                            value={account.upmail || ""}
                            required
                            placeholder="Email"
                            onChange={handleChange}
                        /><br />
                        <input
                            className="input-field"
                            type="password"
                            name="password"
                            required
                            value={account.password || ""}
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </div>
                    <br />
                    <div className="login-navigators">
                        <input className="login-button" type="submit" value="Login" />
                        <br /><br />
                        <div className="signup-text">
                            <span>Don't have an account? </span>
                            <a id="signup-link" href="http://localhost:3000/sign-up">Sign up</a>
                        </div>
                    </div>


                </form>

            </div>


        </div>
    )
}