import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  applicantId: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
  isShortlisted: {
    type: Boolean,
    default: false,
  },
  appliedDate: { type: Date, default: Date.now },
  resumeLink: { type: String },
  message: { type: String },
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
