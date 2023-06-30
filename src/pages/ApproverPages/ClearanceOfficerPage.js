import React from "react";
import { Link } from 'react-router-dom';
import "./ClearanceOfficerPage.css"

export default function ClearanceOfficerPage() {

    function handleChange() {

    }

    return(
        <>
            <div className="navigation-bar">
                <button>Log Out</button>
            </div>
            <div className="approver-body">
                <div className="approver-page">
                    <div className="approver-left-panel">
                        <div className="info">
                            <div id="site-name">
                                ICAS
                            </div>
                            <div id="welcome">
                                Welcome,
                                <text id="user-name">USER'S NAME!</text>
                            </div>
                            <Link to={`/approver`} className="navigation-button">Back to Home</Link>
                        </div>
                    </div>
                    <div className="approver-right-panel">
                    <div className="nav-header">CLEARANCE APPLICATIONS</div>
                        <div className="application-views">
                            <Link to={`/approver/application`} id="active-link"><span id="app-nav-link" className="active-link">Application</span></Link>
                            <Link to={`/approver/adviser`} id="application-link"><span id="app-nav-link">Adviser</span></Link>
                            <Link to={`/approver/clearance-officer`} id="application-link"><span id="app-nav-link">Clearance Officer</span></Link>
                            <Link to={`/approver/finish`} id="application-link"><span id="app-nav-link">Finish</span></Link>
                        </div>
                        <div id="approver-view-link">
                                <text id="link-input-title">
                                    LINK
                                </text>
                                <div id="approver-link">
                                <a href="https://github.com/CMSC100/cmsc-100-project-100-uv3l-group-4" target="_blank" id="info-link">https://github.com/CMSC100/cmsc-100-project-100-uv3l-group-4</a>
                                </div>
                        </div>
                        <div id="application-buttons">
                        <Link to={`/approver/adviser`} id="navigation-button">Next</Link>
                    </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}