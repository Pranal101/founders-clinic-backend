import mongoose from "mongoose";

/**
 * Schema for Networking Community Onboarding Questionnaire
 */
const networkingCommunitySchema = new mongoose.Schema({
  // Personal Information during sign-up
  signUpDetails: {
    communityName: { type: String, required: true }, // Community’s Name
    founderName: { type: String, required: true }, // Founder’s Name
    email: { type: String, required: true }, // Email address
    confirmEmail: { type: String, required: true }, // Confirmation of the email address
    contactNumber: { type: String, required: true }, // WhatsApp or contact number
    location: { type: String, required: true }, // Location of the community
    password: { type: String, required: true }, // Password for account creation
    termsAccepted: { type: Boolean, required: true }, // Acceptance of terms and conditions
  },
  // Section 1: Basic Information
  basicInformation: {
    communityName: { type: String, required: true }, // Community name
    founderContactName: { type: String, required: true }, // Founder or key contact name
    yearEstablished: { type: Number, required: true }, // Year the community was established
    headquartersLocation: { type: String, required: true }, // City/Country of headquarters
    contactInfo: {
      email: { type: String, required: true }, // Contact email
      phone: { type: String, required: true }, // Contact phone number
      website: { type: String }, // Website URL (if available)
    },
    socialMediaLinks: { type: [String] }, // List of social media links
  },
  // Section 2: Overview of the Community
  communityOverview: {
    missionStatement: { type: String }, // Mission statement of the community
    vision: { type: String }, // Vision of the community
    coreValues: { type: [String] }, // List of core values
    primaryFocus: {
      type: [String],
      enum: [
        "Industry-specific networking",
        "Professional development",
        "Entrepreneurship and startups",
        "Business matchmaking",
        "Other",
      ],
      required: true,
    }, // Primary focus areas
    otherPrimaryFocus: {
      type: String, // Details for "Other" focus area
      required: function () {
        return this.communityOverview?.primaryFocus.includes("Other");
      },
    },
    size: {
      numberOfMembers: { type: Number, required: true }, // Total number of members
      geographicReach: {
        type: String,
        enum: ["Local", "National", "International"],
        required: true,
      }, // Geographic reach
    },
  },
  // Section 3: Services Provided
  servicesProvided: {
    services: {
      type: [String],
      enum: [
        "Business networking events",
        "Webinars and workshops",
        "Mentorship programs",
        "Co-working spaces",
        "Investment opportunities",
        "Industry partnerships",
        "Job boards or career services",
        "Other",
      ],
      required: true,
    }, // Services offered by the community
    otherServices: {
      type: String, // Details for "Other" services
      required: function () {
        return this.servicesProvided?.services.includes("Other");
      },
    },
    notablePrograms: { type: String }, // Description of notable programs or initiatives
  },
  // Section 4: Membership Structure
  membershipStructure: {
    isMembershipFree: { type: Boolean, required: true }, // Free or paid membership
    membershipLevels: {
      level1: { type: String }, // Name of membership level 1
      level2: { type: String }, // Name of membership level 2 (optional)
      level3: { type: String }, // Name of membership level 3 (optional)
      benefits: { type: [String] }, // Benefits for each membership level
    },
    eligibilityCriteria: { type: String }, // Eligibility criteria for joining
  },
  // Section 5: Community Engagement and Interaction
  communityEngagement: {
    engagementMethods: {
      type: [String],
      enum: [
        "Online platforms",
        "In-person events",
        "Regular newsletters",
        "Social media engagement",
        "Forums/discussion groups",
        "Other",
      ],
      required: true,
    }, // Methods of engaging members
    otherEngagementMethods: {
      type: String, // Details for "Other" methods
      required: function () {
        return this.communityEngagement?.engagementMethods.includes("Other");
      },
    },
    collaborations: { type: String }, // Collaborations with other communities or businesses
  },
  // Section 6: Technology and Tools
  technologyTools: {
    digitalTools: { type: [String] }, // Digital tools used (e.g., Slack, Discord)
    desiredPlatformFeatures: { type: [String] }, // Features desired for enhancing networking
  },
  // Section 7: Value Proposition
  valueProposition: {
    uniqueness: { type: String }, // What makes the community unique
    painPointsAddressed: { type: String }, // Key issues addressed by the community
  },
  // Section 8: Future Plans and Expansion
  futurePlans: {
    goals: { type: String }, // Future goals for the community
    upcomingInitiatives: { type: String }, // Upcoming programs, partnerships, or initiatives
  },
  // Section 9: Testimonials and Case Studies
  testimonialsCaseStudies: {
    successStories: { type: [String] }, // List of success stories or case studies
    memberTestimonials: { type: [String] }, // Testimonials from community members
  },
  // Section 10: Additional Information
  additionalInformation: {
    additionalDetails: { type: String }, // Any other information about the community
    brochureUpload: { type: String }, // Path or URL to uploaded brochure
  },
  termsCheckbox: {
    accepted: { type: Boolean, required: true }, // Acceptance of terms and conditions
    overridesDNC: { type: Boolean, required: true }, // Overrides DNC/NDNC registry
  },
});

const NetworkingCommunity = mongoose.model(
  "NetworkingCommunity",
  networkingCommunitySchema
);

export default NetworkingCommunity;
