import React from "react";
import "./Application.css";
import { Link } from 'react-router-dom';
import jsPDF from "jspdf";
import Logo from "../../assets/app-logo.png";

import notif from "../../assets/notif.png";

export default function ApplicationFinishTab() {
    const tempData = {fname: "mark", mname: "legion", lname: "mayo", stdno: "20202020", adviser: "beili", clearance: "cepe" };
    function handleChange() {

    }

    function getCurrentDate(separator='-'){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

    function generatePDF(props) {
        let doc = new jsPDF('p', 'pt'), verticalOffset = 40;
            
        let date = getCurrentDate();
        let fullName = tempData.fname + " " + tempData.mname + " " +tempData.lname

        doc.text(20,30,'University of the Philippines Los Baños');
        doc.text(20,50,'College of Arts and Sciences');
        doc.text(20,70,'Institute of Computer Science');

        doc.text(20,110,date);
        
        doc.text(20,150, 'This document certifies that ' + fullName + ', ' + tempData.stdno + ' has satisfied');
        doc.text(20,170, 'the clearance requirements of the institute.')

        doc.text(20,210, 'Verified:');
        doc.text(20,250, 'Academic Adviser: ' + tempData.adviser);
        doc.text(20,270, 'Clearance Officer: ' + tempData.clearance);
;
        doc.setFont('arial');
        doc.save("generated.pdf");
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
                            <Link to={`/student/application/clearance-officer`} id="application-link"><span id="app-nav-link">Clearance Officer</span></Link>
                            <Link to={`/student/application/finish`} id="active-link"><span id="app-nav-link" className="active-link">Finish</span></Link>
                        </div>

                        <div id="application-finish-tab">
                            <text id="approved-text">Your application has been APPROVED!</text>
                            <text id="print-copy-text">You may now print a copy</text>
                            <button id="print-pdf-button" onClick={generatePDF}>Print PDF</button>
                        </div>

                        <div id="application-buttons">
                            <Link to={`/student`} id="navigation-button">Exit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
