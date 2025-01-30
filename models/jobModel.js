import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  enterpriseId: {
    type: String,
  },
  logoUrl: { type: String },
  title: { type: String },
  description: { type: String },
  entityName: { type: String },
  emailAddress: { type: String },
  contactNumber: { type: String },
  bussinessSupport: { type: [String], default: [] }, // Array of strings
  otherbussinessSupport: { type: String },
  supportDescription: { type: String },
  supportDuration: {
    type: String,
  },
  // skillsRequired: { type: [String], default: [] },
  industry: { type: String },
  foundedYear: { type: String },
  experience: {
    type: String,
  },
  genderPreference: { type: String },
  currency: { type: String },
  budget: { type: String },
  budgetFlexibility: {
    type: String,
  },
  expectedStartDate: { type: Date },
  completionTimeline: { type: Date },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
