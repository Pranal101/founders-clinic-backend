import mongoose from "mongoose";

const enterpriseProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
  },
  firstName: { type: String },
  lastName: { type: String },
  companyRole: { type: String },
  whatsAppNumber: { type: String },
  entityName: { type: String, required: true },
  entitySize: {
    type: String,
  },
  businessName: {
    type: String,
  },
  businessType: {
    type: String,
  },
  foundedYear: { type: Number },
  businessCountry: { type: String },
  businessCity: { type: String },
  industryType: { type: String },
  businessDescription: { type: String },
  contactNumber: { type: String },
  emailAddress: { type: String },
  websiteLink: { type: String },
  socialMediaLinks: [{ type: String }],
  country: { type: String },
  city: { type: String },
  completeAddress: { type: String },
  currentBusninessStage: {
    type: String,
  },
  otherBusinessStage: {
    type: String,
  },
  fundingDetails: {
    hasRaisedFunding: { type: Boolean },
    fundingAmount: { type: Number },
    fundingStage: {
      type: String,
    },
    seekingFunding: { type: Boolean }, // New field for whether they are currently seeking funding
    seekingFundingAmount: { type: Number }, // New field for funding amount they are seeking
  },
  servicesOffered: { type: String }, // New field for mentioning products/services offered
  platformServices: [{ type: String }], // New field for services expected from the platform
  additionalInfo: { type: String },
  coFounderName: { type: String }, // New field for Founder/Co-founder Name
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
  termsAccepted: { type: Boolean, default: false }, // New field for terms acceptance
});

const EnterpriseProfile = mongoose.model(
  "EnterpriseProfile",
  enterpriseProfileSchema
);

export default EnterpriseProfile;
