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
  educationBackground: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      degree: { type: String },
      school: { type: String },
      year: { type: String },
      description: { type: String },
    },
  ],
  workExperienceBoolean: { type: String },
  // workExperience: [
  //   {
  //     companyName: String,
  //     role: String,
  //     duration: String,
  //     responsibilities: String,
  //   },
  // ],
  workExperience: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      position: { type: String },
      company: { type: String },
      year: { type: String },
      description: { type: String },
    },
  ],
  workingEnvironment: { type: String },
  portfolioBoolean: { type: String },
  portfolioLink: { type: String },
  previousProjects: { type: String },
  references: [{ type: String }],
  additionalInfo: { type: String },
  specificExpectations: { type: String },
  isShortlisted: { type: Boolean, default: false },
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
});

const InternProfile = mongoose.model("InternProfile", internProfileSchema);

export default InternProfile;
