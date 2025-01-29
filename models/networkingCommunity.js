import mongoose from "mongoose";

const networkingCommunityProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  communityName: { type: String },
  founderName: { type: String },
  yearFounded: { type: String },
  email: { type: String },
  contactNumber: { type: Number },
  country: { type: String },
  city: { type: String },
  websiteUrl: { type: String },
  completeAddress: { type: String },
  acceptTerms: { type: Boolean, default: false },
  gst: { type: String },
  primaryFocus: [{ type: String }],
  primaryFocusOther: { type: String },
  numberOfMembers: {
    type: String,
  },
  geographicReach: { type: String },
  servicesOffered: [{ type: String }],
  servicesOfferedOther: { type: String },
  notablePrograms: { type: String },
  membershipType: { type: String },
  eligibilityCriteria: { type: String },
  membersEngagement: [{ type: String }],
  membersEngagementOnline: { type: String },
  membersEngagementOther: { type: String },
  // collaborationBool: { type: String },
  // collaboration: { type: String },
  // featuresRequirement: { type: String },
  // uniquePoint: { type: String },
  // painPoints: { type: String },
  futureGoals: { type: String },
  // upcomingPrograms: { type: String },
  featureTestimonials: { type: String },
  // successStories: { type: String },
  additionalInfo: { type: String },
});

const NetworkingCommunity = mongoose.model(
  "NetworkingCommunity",
  networkingCommunityProfileSchema
);

export default NetworkingCommunity;
