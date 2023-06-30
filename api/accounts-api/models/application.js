import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  status: { type: String, required: true }, // open || pending || closed || cleared
  step: { type: Number, required: true }, // 1 - Pre adviser || 2 - Adviser || 3 - Clearance officer,
  remarks: [{
    remark: { type: String },
    remarkDate: { type: Date },
    commenter: { type: String },
  }],
  submission: [{
    link: { type: String, required: true },
    submissionDate: { type: Date, required: true }, 
    stepGiven: { type: Number, required: true },
  }]
});

mongoose.model("Application", ApplicationSchema);