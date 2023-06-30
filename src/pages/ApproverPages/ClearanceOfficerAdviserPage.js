import React from "react";
import { Link } from 'react-router-dom';
import "./ClearanceOfficerPage.css"

export default function ClearanceOfficerAdviserPage() {

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
                            <Link to={`/approver/adviser`} id="active-link"><span id="app-nav-link" className="active-link">Adviser</span></Link>
                            <Link to={`/approver/clearance-officer`} id="application-link"><span id="app-nav-link">Clearance Officer</span></Link>
                            <Link to={`/approver/finish`} id="application-link"><span id="app-nav-link">Finish</span></Link>
                        </div>
                        <div id="approver-view-adviser">
                        <div id="adviser-link">
                                <text id="title-status">Link</text>
                                <a href="https://github.com/CMSC100/cmsc-100-project-100-uv3l-group-4" target="_blank" id="info-link">https://github.com/CMSC100/cmsc-100-project-100-uv3l-group-4</a>
                            </div>

                            <div id="adviser-date">
                                <text id="title-date">Date Submitted</text>
                                <div id="info-date">June 5, 2023</div>
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
                            <Link to={`/approver/clearance-officer`} id="navigation-button">Next</Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}