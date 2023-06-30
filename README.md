[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/54Ojl46X)
# **ICAS (Integrated Clearance Application System)**
## *System for Clearance Approval in the Institute of Computer Science. The clearance application is required to go through a series of steps to get their clearance approved.*   
<img src="images\logo_header.png"  width="800" height="200">  

---   
## Contributors
* ### Cherry Contaoi
* ### Arawela Delmo
* ### Mark Jayson Mayo
* ### Rheana Mindo
---   
## Project Features
* **Built-in Administrative User**
    * manages student account applications
        * view pending student accounts
        * <img src="images\admin.png"  width="400" height="220">
        * approve/reject student accounts
        * view verified student accounts 
        * <img src="images\admin2.png"  width="400" height="220">
        * assign adviser to a student account
        * assign adviser through CSV
    * manages approver accounts
        * <img src="images\admin3.png"  width="400" height="220">
        * create/edit/delete accounts for approvers
        * search by Approver accounts by name  
        * sort approver accounts by name
* **Student Application for Clearance Approval**  
    * <img src="images\student.png"  width="400" height="220">
    * can open/close clearance application  
    * view status of clearance application
    * print PDF of cleared applications
    * submit needed requirements for approval
    * resubmit requirements if adviser or clearance officer returns application
* **Approver**
    * <img src="images\approver.png"  width="400" height="220">
    * approves students' applications
    * can see list of pending applications
    * see submitted links/info by student
    * see remarks given by the student
    * return application at current step with remark
---
## Usage guidelines  
* **Student**
1. Sign up and wait for Admin to approve you account application.
2. Once approved, you can login and start to open a clearance application  
3. Submit an application and wait for your adviser to either approve or reject it.  
        3.1. If approved, go to step 4  
        3.2. If rejected, resubmit and wait once again for feedback  
4. At this stage, your clearance application is pending to be approved by the clearance officer.   
    4.1. If approved, your clearance application is cleared. Congrats!  
    4.2. If rejected, resubmit and wait once again for feedback  
* **Adviser**  
1. Either choose to approve or reject the student's application.  
2. If you reject, you can give remarks why you didn't accept it.
* **Clearance Application**
1. Either choose to approve or reject the student's application.  
2. If you reject, you can give remarks why you didn't accept it.  
* **Admin**  
1. It is a built-in account that can approve student account applications and create approver accounts.  
2. You can also assign a certain approver account as adviser of a certain student.
---
## How To Run  
### API
1. Go to ``api\accounts-api``
2. run ``node .\index.js``
3. the terminal is supposed to display ``API listening to port 3001`` and you can try to run your website.
### Website 
1. make sure you have all the packages installed by running ``npm install`` 
2. run ``npm start``
--- 
## Milestones  
> ## Milestone 1
    > * screens without features
    > * mock-up
> ## Milestone 2   
    > * authentication  
    > * connecting to database
> ## Milestone 3
    > * API calls to display needed information on the screen  
    > * different user views for student, admin, and approvers
---
