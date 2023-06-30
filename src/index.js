import React from 'react';
import ReactDOM from 'react-dom/client';
import { redirect } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./index.css"
import Root from "./pages/Root.js";
import SignUp from './pages/SignUp.js';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import Admin from './pages/AdminPages/Admin.js';
import AdminManageApprovers from './pages/AdminPages/AdminManageApprovers.js'
import AdminViewStudents from './pages/AdminPages/AdminViewStudents.js'
import AdminCreateApprover from './pages/AdminPages/AdminCreateApprover.js';
import AdminEditApprover from './pages/AdminPages/AdminEditApprover.js';
import Student from './pages/StudentPages/Student.js';
import StudentOpenApplications from './pages/StudentPages/StudentOpenApplications.js';
import StudentPendingApplications from './pages/StudentPages/StudentPendingApplications.js';
import StudentClearedApplications from './pages/StudentPages/StudentClearedApplications.js';
import StudentClosedApplications from './pages/StudentPages/StudentClosedApplications.js';
import Approver from './pages/ApproverPages/Approver.js';
import Application from './pages/StudentPages/Application.js';
import ApplicationAdviserTab from './pages/StudentPages/ApplicationAdviserTab.js';
import ApplicationClearanceOfficerTab from './pages/StudentPages/ApplicationClearanceOfficerTab.js';
import ApplicationFinishTab from './pages/StudentPages/ApplicationFinishTab.js';
import ClearanceOfficerPage from './pages/ApproverPages/ClearanceOfficerPage.js';
import ClearanceOfficerAdviserPage from './pages/ApproverPages/ClearanceOfficerAdviserPage.js';
import ClearanceOfficerApproverPage from './pages/ApproverPages/ClearanceOfficerApproverPage.js';
import ClearanceOfficerFinishPage from './pages/ApproverPages/ClearanceOfficerFinishPage.js';

// Send a POST request to API to check if the user is logged in. Redirect the user to /dashboard if already logged in
const checkIfLoggedInOnHome = async () => {
  const res = await fetch("http://localhost:3001/checkifloggedin",
    {
      method: "POST",
      credentials: "include" 
    });

  const payload = await res.json();
  
    if (payload.isLoggedIn && payload.type == "student") {
      return redirect("/student")
    } else if (payload.isLoggedIn && payload.type == "admin") {
      return redirect("/admin")
    }  else if (payload.isLoggedIn && payload.type == "approver") {
      return redirect("/approver")
    } else {

      return 0
    }
}

// Send a POST request to API to check if the user is logged in. Redirect the user back to / if not logged in
const checkIfLoggedInOnView = async () => {
  const res = await fetch("http://localhost:3001/checkifloggedin",
    {
      method: "POST",
      credentials: "include" 
    });


  const payload = await res.json();
    if (payload.isLoggedIn) {
      return true
    } else {
      return redirect("/")
    }
}

const router = createBrowserRouter([
  {path: '/sign-up', element: <SignUp />},
  {path: '/', element: <Login />, loader: checkIfLoggedInOnHome},
  {path: '/admin', element: <Admin />, loader: checkIfLoggedInOnView},
  {path: '/manage-approvers', element: <AdminManageApprovers />, loader: checkIfLoggedInOnView},
  {path: '/manage-students', element: <AdminViewStudents />, loader: checkIfLoggedInOnView},
  {path: '/create-approver', element: <AdminCreateApprover />, loader: checkIfLoggedInOnView},
  {path: '/edit-approver', element: <AdminEditApprover />, loader: checkIfLoggedInOnView},
  {path: '/student', element: <Student />, loader: checkIfLoggedInOnView},
  {path: '/open-applications', element: <StudentOpenApplications />, loader: checkIfLoggedInOnView},
  {path: '/pending-applications', element: <StudentPendingApplications />, loader: checkIfLoggedInOnView},
  {path: '/cleared-applications', element: <StudentClearedApplications />, loader: checkIfLoggedInOnView},
  {path: '/closed-applications', element: <StudentClosedApplications />, loader: checkIfLoggedInOnView},
  // {path: '/approver', element: <Approver />, loader: checkIfLoggedInOnView},
  {path: '/logout', element: <Logout />},
  {path: '/student/application', element: <Application />, loader: checkIfLoggedInOnView},
  {path: '/student/application/adviser', element: <ApplicationAdviserTab />, loader: checkIfLoggedInOnView},
  {path: '/student/application/clearance-officer', element: <ApplicationClearanceOfficerTab />, loader: checkIfLoggedInOnView},
  {path: '/student/application/finish', element: <ApplicationFinishTab />, loader: checkIfLoggedInOnView},
  {path: '/approver', element: <Approver />},
  {path: '/approver/application', element: <ClearanceOfficerPage />, loader: checkIfLoggedInOnView},
  {path: '/approver/adviser', element: <ClearanceOfficerAdviserPage />, loader: checkIfLoggedInOnView},
  {path: '/approver/clearance-officer', element: <ClearanceOfficerApproverPage />, loader: checkIfLoggedInOnView},
  {path: '/approver/finish', element: <ClearanceOfficerFinishPage />, loader: checkIfLoggedInOnView},
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

