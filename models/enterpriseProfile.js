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
  businessType: {
    type: String,
    enum: ["Sole Proprietorship", "Partnership", "LLP", "OPC", "Pvt. Ltd."],
  },
  foundedYear: { type: Number },
  industryType: { type: String },
  businessDescription: { type: String },
  contactNumber: { type: String },
  emailAddress: { type: String },
  websiteLink: { type: String },
  socialMediaLinks: [{ type: String }],
  country: { type: String },
  city: { type: String },
  completeAddress: { type: String },
  teamSize: {
    type: String,
  },
  currentBusninessStage: {
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
  targetMarket: { type: String }, // New field for specifying target market
  platformServices: [{ type: String }], // New field for services expected from the platform
  platformExpectations: { type: String }, // New field for key expectations from the platform
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
