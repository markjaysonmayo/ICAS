import mongoose from "mongoose";

// get application model registered in Mongoose
const Application = mongoose.model("Application");
// get account model registered in Mongoose
const Account = mongoose.model("Account");


// =================== METHODS ===================

// open application
const openApplication = async (req, res) => {
  // check if student account exists
  var account = await Account.findOne({ upmail: req.body.upmail });

  const newApplication = new Application({
    status: "open",
    step: 0,
    remarks: [],
    submission: []
  });

  var studentApplications = [];

  // account saving the application DNE
  // if (account == null) {
  //   return res.send({ success: false });
  // }
  // user already has an application
  if (account.application) {
    studentApplications = account.application;
    // student can only have one application open at a time
    for (let i=0; i<account.application.length; i++) {
      var currApplication = await Application.findById(studentApplications[i]);
      // console.log(currApplication.status);
      if (currApplication != null) {
        if (currApplication.status == "open" || currApplication.status == "pending") {
          return res.send({ success: false });
        }
      }
    }
  }
  
  // if all applications of user are either closed or cleared, user can create a new application
  const result = await newApplication.save();
  if (result._id) {
    // add reference to application to the user's list of applications
    await Account.updateOne(
      {_id: account._id},
      { $push: {application: result._id} }
    );
    return res.send({ success: true });
  } else {
    return res.send({ success: false });
  }
}


const saveApplication = async (req, res) => {
  // check if student account and application exists
  var account = await Account.findOne({ upmail: req.body.upmail });
  var application = await Application.findOne({ _id: req.body.appliId });

  // account saving the application DNE or application DNE
  if (account == null || application == null) {
    return res.send({ success: false });
  }
  
  // add submission on application (place on step 1)
  await Application.updateOne(
    {_id: req.body.appliId},
    {$push: {
      submission: {
        link: req.body.link,
        submissionDate: req.body.submissionDate,
        stepGiven: 1
      }
    }}
  );
  // change application step also
  await Application.updateOne({_id: req.body.appliId}, {$set: {step: 1}});
  
  return res.send({ success: true });
}


const submitApplication = async (req, res) => {
  // check if student account and application exists
  var account = await Account.findOne({ upmail: req.body.upmail });
  var application = await Application.findOne({ _id: req.body.appliId });

  // account saving the application DNE or application DNE
  if (account == null || application == null) {
    return res.send({ success: false });
  }
  if (account.adviser == null || account.adviser == "") {
    return res.send({ success:false, message:"!adviser" });
  }

  // add submission on application (place on step 1)
  await Application.updateOne(
    {_id: req.body.appliId},
    {$push: {
      submission: {
        link: req.body.link,
        submissionDate: req.body.submissionDate,
        stepGiven: 2
      }
    }}
  );
  // change application step and status also
  await Application.updateOne({_id: req.body.appliId}, {$set: {step: 2}});
  await Application.updateOne({_id: req.body.appliId}, {$set: {status: "pending"}});
  
  return res.send({ success: true });
}


// adviser approves application
// OUTPUT: { "success": Boolean }
const adviserApproveApplication = async (req, res) => {
  var account = await Account.findOne({ upmail: req.body.upmail });
  var application = await Application.findById(req.body.appliId);
  
  if (account && application) {
    // move the application to clearance officer for checking
    await Application.updateOne({_id: req.body.appliId}, {$set: {step: 3}});
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
}


// clearance officer approves application
// OUTPUT: { "success": Boolean }
const clearanceOfficerApproveApplication = async (req, res) => {
  var account = await Account.findOne({ upmail: req.body.upmail });
  var application = await Application.findById(req.body.appliId);
  
  if (account && application) {
    // set application as cleared
    await Application.updateOne({_id: req.body.appliId}, {$set: {step: 4}});
    await Application.updateOne({_id: req.body.appliId}, {$set: {status: "cleared"}});
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
}


// return an application
// OUTPUT: { "success": Boolean }
const returnWithRemarks = async (req, res) => {
  var application = await Application.findById(req.body.appliId);

  if (application) {
    // remark details
    var remark = {
      remark: req.body.remark,
      remarkDate: req.body.remarkDate,
      commenter: req.body.commenter
    };
    await Application.updateOne(
      {_id: req.body.appliId},
      { $push: {remarks: remark} }
    );
  }
}


const resubmitWithLink = async (req, res) => {
  // check if student account and application exists
  var account = await Account.findOne({ upmail: req.body.upmail });
  var application = await Application.findOne({ _id: req.body.appliId });

  // account saving the application DNE or application DNE
  if (account == null || application == null) {
    return res.send({ success: false });
  }

  // add submission on application 
  await Application.updateOne(
    {_id: req.body.appliId},
    {$push: {
      submission: {
        link: req.body.link,
        submissionDate: req.body.submissionDate,
        stepGiven: 2
      }
    }}
  );

  return res.send({ success: true });
}


// close clearance application
// Output: { "success": Boolean } 
const closeApplication = async (req, res) => {
  var data = await Application.findOne({ _id: req.body.appliId });

  if (data) {
    await Application.updateOne({_id: req.body.appliId}, {$set: {status: "closed"}});
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
  console.log()
}

// fetch clearance applications made by a user (filter by status)
// OUTPUT: array of applications
const fetchApplications = async (req, res) => {
  var account = await Account.findOne({ upmail: req.body.upmail });
  var application = []; 
  
  if(account == null || account.application == []){
    return res.send(null);
  }
  else{
    application = account.application;
  }

  var applicationList = [];
  for (let i=0; i<account.application.length; i++) {
    var currApplication = await Application.findById(application[i]);
    if (req.body.status == "open") {
      if (currApplication != null) {
      if (currApplication.status == "open") {
          applicationList.push(currApplication);
        }
      }
    } else if (req.body.status == "pending") {
      if (currApplication != null) {
      if (currApplication.status == "pending") {
          applicationList.push(currApplication);;
        }
      }
    } else if (req.body.status == "closed") {
      if (currApplication != null) {
      if (currApplication.status == "closed") {
          applicationList.push(currApplication);
        }
      }
    } else if (req.body.status == "cleared") {
      if (currApplication != null) {
      if (currApplication.status == "cleared") {
          applicationList.push(currApplication);
        }
      }
    } else {
      if (currApplication != null) {
        applicationList.push(currApplication);
      }
    }
  }
  console.log(applicationList);
  res.send(applicationList);
}



// filter application by date (note: also returns application where revise date is the given date)
// OUTPUT: list of applications
const filterApplicationByDate = async (req, res) => {
  res.send(
    await Application.find({ "submission.submissionDate": req.query.date })
  );
}

// filter application by adviser
const filterApplicationByAdviser = async (req, res) => {
  var students = await Account.find({ type: "student" });
  if (students == null) return res.send([]);

  var applicationList = [];
  for (let i=0; i<students.length; i++) {
    // get all applications of the student if adviser in query matches
    if (students[i].adviser == req.query.adviser) {
      currStudentApplis = students[i].application;
      currStudentApplis.forEach(appli => {
        applicationList.push(appli);
      });
    }
  }
  res.send(applicationList);
}

// filter application by step
// OUTPUT: list of applications
const filterApplicationByStep = async (req, res) => {
  res.send(
    await Application.find({ step: req.query.step })
  );
}

// filter application by status
// OUTPUT: list of applications
const filterApplicationByStatus = async (req, res) => {
  res.send(
    await Application.find({ status: req.query.status })
  );
}


const fetchLink = async (req, res) => {
  var application = await Application.findById(req.body.appliId);

  if(application == null || application.submission == null){
    return "";
  }

  var len = application.submission.length;
  if(len>1){
    var link = application.submission[len-1].link;
    if (link || link != null) {
      return link;
    }
  }
  else if(len==1)
    return application.submission[0].link
  else
    return ""
}

const fetchStep = async (req, res) => {
  var application = await Application.findById(req.body.appliId);

  return application.step
}

export { 
  openApplication, saveApplication, submitApplication, 
  adviserApproveApplication, clearanceOfficerApproveApplication,
  returnWithRemarks, resubmitWithLink,
  closeApplication, fetchApplications, fetchStep,
  filterApplicationByDate, filterApplicationByAdviser, filterApplicationByStep, filterApplicationByStatus,
  fetchLink
}; 