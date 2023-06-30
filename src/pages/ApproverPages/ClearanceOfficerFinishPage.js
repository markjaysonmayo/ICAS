import React from "react";
import './ClearanceOfficerPage.css';
import { Link } from 'react-router-dom';

export default function ClearanceOfficerFinishPage() {
    
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
                            <Link to={`/approver/application`} id="application-link"><span id="app-nav-link" >Application</span></Link>
                            <Link to={`/approver/adviser`} id="application-link"><span id="app-nav-link">Adviser</span></Link>
                            <Link to={`/approver/clearance-officer`} id="application-link"><span id="app-nav-link">Clearance Officer</span></Link>
                            <Link to={`/approver/finish`} id="active-link"><span id="app-nav-link" className="active-link">Finish</span></Link>
                        </div>

                        <div id="application-finish-tab">
                            <text id="approved-text">This application is already APPROVED.</text>
                        </div>

                        <div id="application-buttons">
                            <Link to={`/approver`} id="navigation-button">Exit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}