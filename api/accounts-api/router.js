import {
    signUpNewAccount, loginAccount, checkifLoggedIn,
    showStudentAccountsApplications, validateStudentAccount, removeStudentAccountApplication,
    showValidatedStudentAccounts, assignAdviserToStudent, assignAdviserToStudentFromCSV,
    showApprovers, addApprover, editApprover, deleteApprover,
    searchByNameApprover, searchByNameStudent, searchByStudentNoStudent
} from "./account-controller.js";
import { 
    openApplication, saveApplication, submitApplication, 
    adviserApproveApplication, clearanceOfficerApproveApplication,
    returnWithRemarks, resubmitWithLink,
    closeApplication, fetchApplications,
    filterApplicationByDate, filterApplicationByAdviser, filterApplicationByStep, filterApplicationByStatus,
    fetchLink, fetchStep
} from "./application-controller.js";
import { createNotification, setNotificationToRead, showNotification } from './notification-controller.js'

export default function setUpRoutes(app) {
    app.get("/", (req, res) => { res.send("API Home") });
    app.post("/sign-up", signUpNewAccount);
    app.post("/login", loginAccount);
    app.post("/checkifloggedin", checkifLoggedIn);

    app.get("/showStudentAccountApplications", showStudentAccountsApplications);
    app.post("/validateStudentAccount", validateStudentAccount);
    app.post("/removeStudentAccountApplication", removeStudentAccountApplication);

    app.get("/showValidatedStudentAccounts", showValidatedStudentAccounts);
    app.post("/assignAdviserToStudent", assignAdviserToStudent);
    app.post("/assignAdviserToStudentFromCSV", assignAdviserToStudentFromCSV);

    app.get("/showApprovers", showApprovers);
    app.post("/addApprover", addApprover);
    app.post("/editApprover", editApprover);
    app.post("/deleteApprover", deleteApprover);

    app.get("/searchByNameApprover", searchByNameApprover);
    app.get("/searchByNameStudent", searchByNameStudent);
    app.get("/searchByStudentNoStudent", searchByStudentNoStudent);

    app.post("/openApplication", openApplication);
    app.post("/saveApplication", saveApplication);
    app.post("/submitApplication", submitApplication);
    
    app.post("/adviserApproveApplication", adviserApproveApplication);
    app.post("/clearanceOfficerApproveApplication", clearanceOfficerApproveApplication);
    
    app.post("/returnWithRemarks", returnWithRemarks);
    app.post("/resubmitWithLink", resubmitWithLink);

    app.post("/closeApplication", closeApplication);
    app.post("/fetchApplications", fetchApplications);

    app.get("/filterApplicationByDate", filterApplicationByDate);
    app.get("/filterApplicationByAdviser", filterApplicationByAdviser);
    app.get("/filterApplicationByStep", filterApplicationByStep);
    app.get("/filterApplicationByStatus", filterApplicationByStatus);

    app.post("/fetchLink", fetchLink);
    app.post("/fetchStep", fetchStep);

    app.post("/createNotification", createNotification);
    app.post("/setNotificationToRead", setNotificationToRead);
    app.post("/showNotification", showNotification);
}