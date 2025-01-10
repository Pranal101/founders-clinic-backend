import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    enterpriseId: { type: String, required: true },
    businessName: { type: String },
    businessType: { type: String },
    foundedYear: { type: String },
    coFounderName: { type: String },
    country: { type: String },
    city: { type: String },
    emailAddress: { type: String },
    contactNumber: { type: String },
    websiteLink: { type: String },
    socialMediaLinks: { type: String },
    industryType: { type: String },
    businessDescription: { type: String },
    currentBusninessStage: { type: String },
    servicesOffered: { type: String },
    targetMarket: { type: String },
    teamSize: { type: String },
    hasRaisedFunding: { type: String },
    fundingAmount: { type: String },
    fundingStage: { type: String },
    seekingFunding: { type: String },
    seekingFundingAmount: { type: String },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    documents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
      },
    ],
  },
  { timestamps: true }
);

const Investement = mongoose.model("Investement", investmentSchema);

export default Investement;
