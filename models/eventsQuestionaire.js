import mongoose from "mongoose";

/**
 * Schema for Event Publishing Questionnaire
 */
const eventPublishingSchema = new mongoose.Schema({
  // Section 1: Event Basic Information
  eventBasicInfo: {
    eventTitle: { type: String, required: true }, // Event Title
    eventOrganizerName: { type: String, required: true }, // Event Organizer/Host Name
    organizationName: { type: String }, // Organization/Company Name (optional)
    contactInfo: {
      email: { type: String, required: true }, // Organizer's Email
      phoneNumber: { type: String, required: true }, // Organizer's Phone Number
      website: { type: String }, // Event Website (optional)
      socialMediaLinks: { type: [String] }, // Social Media Links (optional)
    },
    eventLocation: {
      type: String,
      enum: ["In-person", "Virtual", "Hybrid"],
      required: true,
    }, // Event Location type (in-person, virtual, hybrid)
    venueDetails: { type: String }, // Venue details if event is in-person
    onlineEventLink: { type: String }, // Online platform link for virtual events
    hybridEventDetails: { type: String }, // Hybrid event details (both physical and virtual)
  },

  // Section 2: Event Type and Theme
  eventTypeAndTheme: {
    eventType: {
      type: [String],
      enum: [
        "Conference",
        "Workshop",
        "Seminar",
        "Webinar",
        "Networking Event",
        "Product Launch",
        "Panel Discussion",
        "Trade Show",
        "Roundtable",
        "Other",
      ],
      required: true,
    }, // Type of event
    otherEventType: {
      type: String, // Details for "Other" event type
      required: function () {
        return this.eventTypeAndTheme?.eventType.includes("Other");
      },
    },
    eventTheme: { type: String, required: true }, // Event theme or focus area
  },

  // Section 3: Event Description
  eventDescription: {
    description: { type: String, required: true }, // Brief description of the event
    keyObjectives: { type: String }, // Key objectives or goals of the event
    keySpeakers: { type: String }, // Key speakers or presenters (bios if available)
    agenda: { type: String }, // Outline of the event agenda
  },

  // Section 4: Target Audience
  targetAudience: {
    audience: {
      type: [String],
      enum: [
        "Entrepreneurs",
        "Startups",
        "Small Business Owners",
        "Corporations",
        "Investors",
        "Industry Experts",
        "Students",
        "General Public",
        "Other",
      ],
      required: true,
    }, // Primary target audience for the event
    otherAudience: {
      type: String, // Details for "Other" audience
      required: function () {
        return this.targetAudience?.audience.includes("Other");
      },
    },
    expectedAttendees: { type: Number, required: true }, // Expected number of attendees
    prerequisites: { type: String }, // Prerequisites or qualifications for attending
  },

  // Section 5: Event Logistics and Schedule
  eventLogistics: {
    eventDates: { type: [Date], required: true }, // Event date(s)
    startTime: { type: Date, required: true }, // Start time (with timezone)
    endTime: { type: Date, required: true }, // End time (with timezone)
    isRecurring: { type: Boolean, required: true }, // Whether it's a recurring event
    recurrenceFrequency: { type: String }, // Recurrence frequency if applicable
    isRecorded: { type: Boolean, required: true }, // Whether the event is recorded for later access
  },

  // Section 6: Registration and Fees
  registrationAndFees: {
    isRegistrationRequired: { type: Boolean, required: true }, // Is registration required?
    registrationLink: { type: String }, // Registration link (if applicable)
    registrationProcess: { type: String }, // Registration process details
    isFeeRequired: { type: Boolean, required: true }, // Is there a fee to attend?
    feeDetails: { type: String }, // Fee details or ticket options if applicable
    hasDiscounts: { type: Boolean, required: true }, // Whether discounts or early bird offers are available
    discountDetails: { type: String }, // Discount details (if applicable)
  },

  // Section 7: Sponsorship and Partnerships
  sponsorshipAndPartnerships: {
    areSponsorsInvolved: { type: Boolean, required: true }, // Are sponsors involved in the event?
    sponsors: { type: String }, // List of sponsors and their roles in the event
    areYouSeekingSponsors: { type: Boolean, required: true }, // Are you seeking sponsors for the event?
  },

  // Section 8: Event Promotion
  eventPromotion: {
    promotionMethods: {
      type: [String],
      enum: [
        "Social Media",
        "Email Marketing",
        "Partner/Network Promotion",
        "Paid Ads",
        "PR and Media Outreach",
        "Other",
      ],
      required: true,
    }, // Methods used to promote the event
    otherPromotionMethod: {
      type: String, // Details for "Other" promotion method
      required: function () {
        return this.eventPromotion?.promotionMethods.includes("Other");
      },
    },
    promotionalVideo: { type: String }, // Link to promotional video or media kit
  },

  // Section 9: Additional Resources and Materials
  additionalResources: {
    additionalResourcesNeeded: { type: Boolean, required: true }, // Do you need additional resources from the platform?
    resourcesDetails: { type: String }, // Additional resource details
    downloadableResources: { type: [String] }, // Links to downloadable resources for attendees (e.g., brochures, presentations)
  },
});

const EventPublishing = mongoose.model(
  "EventPublishing",
  eventPublishingSchema
);

export default EventPublishing;
