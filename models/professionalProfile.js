import mongoose from "mongoose";

const professionalProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true, // Links to User model
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  emailAddress: { type: String },
  contactNumber: { type: String },
  country: { type: String },
  city: { type: String },
  completeAddress: { type: String },
  //form-2
  entityName: { type: String },
  organizationRole: { type: String },
  portfolio: { type: String },
  websiteLink: { type: String },
  socialMediaLinks: [{ type: String }],
  experienceYears: { type: Number },
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
  certifications: [{ type: String }],
  associations: { type: String },
  servicesOffered: [{ type: String }],
  primaryClients: [{ type: String }],
  serviceDelivery: [{ type: String }],
  processDescription: { type: String },
  customizedSolutions: { type: String },
  pricingModel: [{ type: String }],
  differentiators: { type: String },
  painPoints: { type: String },
  industryExpertise: { type: String },
  contribution: { type: String },
  availability: { type: String },
  businessExpectations: { type: String },
  availability: { type: String },
  freeConsultation: { type: String },
  contactPreference: { type: String },
  acceptTerms: { type: Boolean, default: false },
  isShortlisted: { type: Boolean, default: false },
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
});

const ProfessionalProfile = mongoose.model(
  "ProfessionalProfile",
  professionalProfileSchema
);

export default ProfessionalProfile;
