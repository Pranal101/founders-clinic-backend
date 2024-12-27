import mongoose from "mongoose";

const internProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  contactNumber: { type: Number },
  country: { type: String },
  city: { type: String },
  completeAddress: { type: String },
  acceptTerms: { type: Boolean, default: false },
  linkedinUrl: { type: String },
  educationStatus: {
    type: String,
  },
  institutionName: { type: String },
  major: { type: String },
  graduationDate: { type: Date },
  certifications: { type: String },
  internshipPreferences: [{ type: String }],
  preferredDuration: { type: String },
  preferredStartDate: { type: Date },
  preferredIndustries: [{ type: String }],
  preferredLocation: { type: String },
  skills: [{ type: String }],
  softwareProficiency: { type: String },
  workExperienceBoolean: { type: String },
  workExperience: [
    {
      companyName: String,
      role: String,
      duration: String,
      responsibilities: String,
    },
  ],
  workingEnvironment: { type: String },
  portfolioBoolean: { type: String },
  portfolioLink: { type: String },
  previousProjects: { type: String },
  references: [{ type: String }],
  additionalInfo: { type: String },
  specificExpectations: { type: String },
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
});

const InternProfile = mongoose.model("InternProfile", internProfileSchema);

export default InternProfile;
