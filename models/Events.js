import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  eventTitle: { type: String },
  hostName: { type: String },
  companyName: { type: String },
  email: { type: String },
  contactNumber: { type: Number },
  websiteUrl: { type: String },
  country: { type: String },
  city: { type: String },
  completeAddress: { type: String },
  //form-2
  eventLocation: {
    type: String,
  },
  venueName: { type: String },
  venueAddress: { type: String },
  eventLink: { type: String },
  eventType: [{ type: String }],
  eventTypeOther: { type: String },
  eventTheme: { type: String },
  description: { type: String },
  keyObjectives: { type: String },
  presenters: { type: String },
  topicsPlanned: { type: String },
  targetAudience: [{ type: String }],
  targetAudienceOther: { type: String },
  expectedNumberOfAttendees: { type: String },
  prerequisites: { type: String },
  eventStartDate: { type: Date },
  eventEndDate: { type: Date },
  startTime: { type: String },
  endTime: { type: String },
  recurringEvent: { type: String },
  recurringEventOther: { type: String },
  eventRecording: { type: String },
  registrationRequired: { type: String },
  registrationLink: { type: String },
  registrationProcess: { type: String },
  eventFeeBool: { type: String },
  eventFee: { type: String },
  discountsBool: { type: String },
  discounts: { type: String },
  sponsorsBool: { type: String },
  sponsorsList: [{ type: String }],
  seekingSponsors: { type: String },
  eventPromotion: [{ type: String }],
  eventPromotionOther: { type: String },
  promotionalVideoBool: { type: String },
  promotionalVideo: { type: String },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

const Events = mongoose.model("Events", eventSchema);

export default Events;
