import React from "react";
import "./Application.css";
import { Link } from 'react-router-dom';
import Logo from "../../assets/app-logo.png";
import notif from "../../assets/notif.png";
export default function ApplicationClearanceOfficerTab() {
    
    function handleChange() {

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
            <div className="application-body">
                <div className="application-page">
                    <div className="application-left-panel">
                        <div className="info">
                            <div id="site-name">
                                ICAS
                            </div>
                            <div id="welcome">
                                Welcome,
                                <text id="user-name">USER'S NAME!</text>
                            </div>
                            <Link to={`/student`} className="navigation-button">Back to Home</Link>
                        </div>
                    </div>
                    <div className="application-right-panel">
                        <div className="nav-header">CLEARANCE APPLICATIONS</div>
                        <div className="application-views">
                            <Link to={`/student/application`} id="application-link"><span id="app-nav-link">Application</span></Link>
                            <Link to={`/student/application/adviser`} id="application-link"><span id="app-nav-link">Adviser</span></Link>
                            <Link to={`/student/application/clearance-officer`} id="active-link"><span id="app-nav-link" className="active-link">Clearance Officer</span></Link>
                            <Link to={`/student/application/finish`} id="application-link"><span id="app-nav-link">Finish</span></Link>
                        </div>

                        <div id="application-remarks-tab">
                            <div id="remarks-container">
                                OFFICER'S REMARKS
                                <div id="officer-remarks">
                                    <text>No remarks</text>
                                </div>
                            </div>
                            
                            <div id="remarks-container">
                                STUDENT'S REMARKS
                                <div id="student-remarks">
                                    <text>No remarks</text>
                                </div>
                            </div>
                        </div>

                        <form id="adviser-application-form-buttons">
                                    <div id="adviser-application-add-form">
                                        <text id="link-input-title">
                                            REMARK
                                        </text>
                                        <input
                                            id="application-link-input"
                                            type="text"
                                            name="github-link"
                                            placeholder="Enter remark"
                                            required
                                            onChange={handleChange}
                                            
                                        />
                                            <input className="submit-link-button" type="submit" value="Submit"/>
                                        
                                    </div>

                                    
                                </form>

                        <div id="application-buttons">
                            <Link to={`/student/application/finish`} id="navigation-button">Next</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}