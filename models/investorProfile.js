import mongoose from "mongoose";

const investorProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: { type: String },
  entityName: { type: String },
  investmentFirmName: { type: String },
  position: { type: String },
  email: { type: String },
  contactNumber: { type: Number },
  websiteUrl: { type: String },
  linkedinUrl: { type: String },
  country: { type: String },
  city: { type: String },
  completeAddress: { type: String },
  acceptTerms: { type: Boolean, default: false },
  investorType: [{ type: String }],
  otherInvestorType: { type: String },
  investmentYears: {
    type: String,
  },
  investmentExperience: { type: String },
  otherInvestmentExperience: { type: String },
  notableInvestments: { type: String },
  preferredIndustries: [{ type: String }],
  otherPreferredIndustries: { type: String },
  preferredBusinessStage: { type: String },
  preferredGeography: { type: String },
  investmentThesis: { type: String },
  investmentTimeline: { type: String },
  involvementType: { type: String },
  exitStrategy: { type: String },
  otherExitStrategy: { type: String },
  successfulExits: { type: String },
  currentInvestmentNetworks: { type: String },
  specificInvestmentNetworks: { type: String },
  interestedInMentoring: { type: String },
  requiredServices: { type: String },
  otherRequiredServices: { type: String },
  keyExpectations: { type: String },
  otherKeyExpectations: { type: String },
  notableAchievements: { type: String },
  successStories: { type: String },
  additionalInfo: { type: String },
});

const InvestorProfile = mongoose.model(
  "InvestorProfile",
  investorProfileSchema
);

export default InvestorProfile;
