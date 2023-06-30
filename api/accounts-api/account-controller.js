import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// get user model registered in Mongoose
const Account = mongoose.model("Account");


// =================== METHODS ===================

// store new account's details in the database
// Output: { "success": Boolean }
const signUpNewAccount = async (req, res) => {
    const newAccount = new Account({
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname,
        stdno: req.body.stdno,
        type: req.body.type,
        isValidated: false,
        isClearanceOfficer: false,
        upmail: req.body.upmail,
        password: req.body.password,
        adviser: "",
        application: []
    });
    const account = await Account.findOne({ upmail: req.body.upmail });
    const account2 = await Account.findOne({ stdno: req.body.stdno });
    if (account && account2) {
        return res.send({ success: false });
    }

    const result = await newAccount.save();

    if (result._id) {
        res.send({ success: true })
    } else {
        res.send({ success: false })
    }
}

// login a user
// OUTPUT: { "success": false, "message": String } OR { "success": true, token, upmail: account.upmail }
const loginAccount = async (req, res) => {
    const upmail = req.body.upmail.trim();
    const password = req.body.password;

    const account = await Account.findOne({ upmail: req.body.upmail });

    // Check if email exists
    if (!account) {
        return res.send({ success: false, message: "!email" });
    }

    // Check if account is validated by admin
    if (!account.isValidated) {
        return res.send({ success: false, message: "!isValidated" });
    }

    // Check if password is correct using the Schema method defined in Account Schema
    account.comparePassword(password, (err, isMatch) => {
        if (err || !isMatch) {
            // Wrong password
            return res.send({ success: false, message: "!password" });
        }

        // successful login
        const tokenPayload = {
            _id: account._id
        }

        const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");

        // return the token to the client
        return res.send({ success: true, token, upmail: account.upmail, fname: account.fname, mname: account.mname, lname: account.lname, type: account.type });
    });
}


// check if logged in
// OUTPUT: { "isLoggedIn": Boolean }
const checkifLoggedIn = async (req, res) => {

    // no cookies / no authToken cookie sent
    if (!req.cookies || !req.cookies.authToken) {
        return res.send({ isLoggedIn: false });
    }

    try {
        // try to verify the token
        const tokenPayload = jwt.verify(req.cookies.authToken, 'THIS_IS_A_SECRET_STRING');

        // check if the _id in the payload is an existing account id
        const account = await Account.findById(tokenPayload._id);


        if (account) {
            // success - user found
            return res.send({ isLoggedIn: true,  type: account.type})
        } else {
            // token is valid but account id not found
            return res.send({ isLoggedIn: false });
        }
    } catch {
        // error in validating token / token is not valid
        return res.send({ isLoggedIn: false });
    }
}

// show all accounts that has not been validated by admin
// OUTPUT: list of student account applications
const showStudentAccountsApplications = async (req, res) => {
    return res.send(await Account.find({ isValidated: false, type: "student" }));
}

// allow admin to validate student accounts
// OUTPUT: {"success": Boolean}
const validateStudentAccount = async (req, res) => {
    var data = await Account.findOne({ _id: req.body.id });

    if (data) {
        await Account.updateOne(data, {$set: {isValidated: true}});
        res.send({ success: true });
    } else {
        res.send({ success: false });
    }
}

// delete pending student account application from the database
// OUTPUT: {"success": Boolean}
const removeStudentAccountApplication = async (req, res) => {
    var data = await Account.findOne({ _id: req.body.id });

    if (data) {
        await Account.deleteOne({ _id: req.body.id });
        res.send({ success: true });
    } else {
        res.send({ success: false });
    }
}

// show list of all student accounts that has already been validated
// OUTPUT: list of validated student accounts
const showValidatedStudentAccounts = async (req, res) => {
    res.send(await Account.find({ isValidated: true, type: "student" }));
}

// assign adviser to a student, and add the student as one of the adviser's advisee
// OUTPUT: {"success": Boolean}
const assignAdviserToStudent = async (req, res) => {
    var data = await Account.findOne({ _id: req.body.id });
    var adviserData = await Account.findOne({ _id: req.body.adviserID });

    if (data) {
        await Account.updateOne(data, {$set: {adviser: req.body.adviserID}});
        await Account.updateOne({_id: req.body.adviserID}, {$push: {advisee: req.body.id}});
        res.send({ success: true });
    } else {
        res.send({ success: false });
    }
}

// assign adviser to student 
// OUTPUT: { "success": BOOLEAN }
const assignAdviserToStudentFromCSV = async(req, res) => {
    var stdnoList = req.body.stdnoList;
    var advisersList = req.body.advisersList;
    console.log(stdnoList)
    console.log(advisersList)

    var advisersdb = await Account.find({ type: "approver" });
    // console.log(advisersdb)
    var adv_id = new Map()

    for(let i=0; i<advisersdb.length; i++){
        var f = advisersdb[i].fname.substring(0,1);
        var m = advisersdb[i].mname.substring(0,1);
        var lname = advisersdb[i].lname;
        var adviser = (f + m + lname).toUpperCase();

        adv_id.set(adviser, advisersdb[i]._id);
    }

    console.log(adv_id)

    for(let j=0; j<stdnoList.length; j++){
        var stdnum = parseInt(stdnoList[j].replace(/\D/g,''));
        console.log(stdnum)
        var foundStudent = await Account.findOne({stdno: stdnum, isValidated: true});
        if (foundStudent == null) {
            continue;
        }

        if(adv_id.has(advisersList[j])){
            await Account.updateOne(foundStudent, {$set: {adviser: adv_id.get(advisersList[j])}});
            await Account.updateOne({_id: adv_id.get(advisersList[j])}, {$push: {advisee: foundStudent._id}});
        }
    }
    res.send({ success: true })
}


// show list of all approvers
// OUTPUT: list of approvers
const showApprovers = async (req, res) => {
    res.send(await Account.find({ type: "approver" }));
}

// add approver
// Output: { "success": Boolean }  
const addApprover = async (req, res) => {
    const newApprover = new Account ({
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname,
        type: "approver",
        isValidated: true,
        isClearanceOfficer: false,
        upmail: req.body.upmail,
        password: req.body.password,
        advisee: []
    });

    const account = await Account.findOne({ upmail: req.body.upmail });
    if (account) {
        return res.send({ success: false });
    }

    const result = await newApprover.save();

    if (result._id) {
        res.send({ success: true })
    } else {
        res.send({ success: false })
    }
}

// edit approver
// Output: { "success": true }
const editApprover = async (req, res) => {
    const approver = await Account.findById(req.body.id);

    if (approver) {
        await Account.updateOne(approver, {$set: {fname: req.body.fname}});
        await Account.updateOne(approver, {$set: {mname: req.body.mname}});
        await Account.updateOne(approver, {$set: {lname: req.body.lname}});
        res.send({ success: true });
    } else {
        res.send({ success: false });
    }
}

// delete approver (fix: adviser field of the student should be turned back to "")
// Output: { "success": Boolean }  
const deleteApprover = async (req, res) => {
    var data = await Account.findOne({ _id: req.body.id });

    if (data) {
        await Account.deleteOne({ _id: req.body.id });
        res.send({ success: true });
    } else {
        res.send({ success: false });
    }
}

// search approver given a name
// OUTPUT: one or more approvers
const searchByNameApprover = async (req, res) => {
    var fname = req.query.fname.substring(0,1).toUpperCase() + req.query.fname.substring(1).toLowerCase()
    var mname = req.query.mname.substring(0,1).toUpperCase() + req.query.mname.substring(1).toLowerCase()
    var lname = req.query.lname.substring(0,1).toUpperCase() + req.query.lname.substring(1).toLowerCase()
    res.send(
        await Account.find(
            {
                type: "approver",  
                fname: fname, mname: mname, lname: lname
            }
        )
    );
}

// search student given a student number
const searchByStudentNoStudent = async (req, res) => {
    res.send(
        await Account.find(
            {
                type: "student", 
                stdno: req.query.stdno
            }
        )
    );
}

// search student given a name
const searchByNameStudent = async (req, res) => {
    var fname = req.query.fname.substring(0,1).toUpperCase() + req.query.fname.substring(1).toLowerCase()
    var mname = req.query.mname.substring(0,1).toUpperCase() + req.query.mname.substring(1).toLowerCase()
    var lname = req.query.lname.substring(0,1).toUpperCase() + req.query.lname.substring(1).toLowerCase()
    res.send(
        await Account.find(
            {
                type: "student", 
                fname: fname, mname: mname, lname: lname
            }
        )
    );
}


export { 
    signUpNewAccount, loginAccount, checkifLoggedIn,
    showStudentAccountsApplications, validateStudentAccount, removeStudentAccountApplication,
    showValidatedStudentAccounts, assignAdviserToStudent, assignAdviserToStudentFromCSV,
    showApprovers, addApprover, editApprover, deleteApprover, 
    searchByNameApprover, searchByNameStudent, searchByStudentNoStudent
};

