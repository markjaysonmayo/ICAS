import React from "react";
import { Link } from 'react-router-dom';
import './ClearanceOfficerPage.css'

export default function ClearanceOfficerApproverPage() {
    
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
                            <Link to={`/approver/clearance-officer`} id="active-link"><span id="app-nav-link" className="active-link">Clearance Officer</span></Link>
                            <Link to={`/approver/finish`} id="application-link"><span id="app-nav-link">Finish</span></Link>
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
                        <div id="application-buttons">
                            <button className="save-link-button">Return</button>
                            <input className="submit-link-button" type="submit" value="Approve"/>
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
                                            <input className="submit-link-button" type="submit" value="Return"/>
                                        
                                    </div>

                                    
                                </form>

                        <div id="application-buttons">
                            <Link to={`/approver/finish`} id="navigation-button">Next</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}