import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  appliedDate: { type: Date, default: Date.now },
  resumeLink: { type: String }, // New field
  coverLetter: { type: String }, // New field
  employerNotes: { type: String }, // New field
  interviewStatus: {
    // New field
    type: String,
    enum: ["Not Scheduled", "Scheduled", "Completed"],
    default: "Not Scheduled",
  },
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
