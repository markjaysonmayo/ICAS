import React from "react";
import "./Application.css";
import { Link } from 'react-router-dom';
import Logo from "../../assets/app-logo.png";
import notif from "../../assets/notif.png";


export default function ApplicationAdviserTab() {
    
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
                            <Link to={`/student/application/adviser`} id="active-link"><span id="app-nav-link" className="active-link">Adviser</span></Link>
                            <Link to={`/student/application/clearance-officer`} id="application-link"><span id="app-nav-link">Clearance Officer</span></Link>
                            <Link to={`/student/application/finish`} id="application-link"><span id="app-nav-link">Finish</span></Link>
                        </div>

                        <div id="adviser-tab">

                            <div id="adviser-status">
                                <text id="title-status">Status</text>
                                <div id="info-status">OPEN</div>
                            </div>

                            <div id="adviser-link">
                                <text id="title-status">Link</text>
                                <a href="https://github.com/CMSC100/cmsc-100-project-100-uv3l-group-4" target="_blank" id="info-link">https://github.com/CMSC100/cmsc-100-project-100-uv3l-group-4</a>
                            </div>

                            <div id="adviser-remarks">
                                <text id="title-remarks">Remarks</text>
                                <div id="info-remark">Mali yung pinasang link ng applicant</div>
                            </div>

                            <div id="adviser-date">
                                <text id="title-date">Date</text>
                                <div id="info-date">June 5, 2023</div>
                            </div>

                        </div>

                        <form id="adviser-application-form-buttons">
                                    <div id="adviser-application-add-form">
                                        <text id="link-input-title">
                                            LINK
                                        </text>
                                        <input
                                            id="application-link-input"
                                            type="text"
                                            name="github-link"
                                            placeholder="Enter GitHub Link"
                                            required
                                            onChange={handleChange}
                                            
                                        />
                                            <input className="submit-link-button" type="submit" value="Submit"/>
                                        
                                    </div>

                                    
                                </form>

                        <div id="application-buttons">
                            <Link to={`/student/application/clearance-officer`} id="navigation-button">Next</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}