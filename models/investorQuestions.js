import mongoose from "mongoose";

/**
 * Schema for Investor Onboarding Questionnaire
 */
const investorQuestionnaireSchema = new mongoose.Schema({
  // Reference to the user submitting the questionnaire
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Links to the User model
    required: true,
  },
  // Personal Information during sign-up
  personalDetails: {
    firstName: { type: String, required: true }, // First name of the investor
    lastName: { type: String, required: true }, // Last name of the investor
    entityName: { type: String }, // Name of the entity or firm (optional)
    email: { type: String, required: true }, // Email address
    confirmEmail: { type: String, required: true }, // Confirmation of the email address
    contactNumber: { type: String, required: true }, // WhatsApp or contact number
    location: { type: String, required: true }, // Location of the investor (City/Country)
    password: { type: String, required: true }, // Password for account creation
    termsAccepted: { type: Boolean, required: true }, // Acceptance of terms and conditions
  },
  // Section 1: Basic Information
  basicInformation: {
    fullName: { type: String, required: true }, // Full name of the investor
    investmentFirmName: { type: String }, // Name of the investment firm (if applicable)
    positionTitle: { type: String }, // Investor's position or title
    contactInfo: {
      email: { type: String, required: true }, // Contact email
      phone: { type: String, required: true }, // Contact phone number
    },
    website: { type: String }, // Website URL (if applicable)
    linkedInProfile: { type: String }, // LinkedIn profile link (optional)
    location: { type: String, required: true }, // Current city or country
  },
  // Section 2: Investor Type and Experience
  investorTypeExperience: {
    investorType: {
      type: [String],
      enum: [
        "Angel Investor",
        "Venture Capitalist",
        "Private Equity",
        "Family Office",
        "Corporate Investor",
        "Crowdfunding Investor",
        "Other",
      ],
      required: true,
    }, // Type(s) of investor
    otherInvestorType: {
      type: String, // Additional details if "Other" is selected
      required: function () {
        return this.investorTypeExperience?.investorType.includes("Other");
      },
    },
    yearsInvesting: {
      type: String,
      enum: ["0-2 years", "3-5 years", "6-10 years", "10+ years"],
      required: true,
    }, // Years of investment experience
    investmentExperience: {
      type: [String],
      enum: [
        "Early-stage startups",
        "Growth-stage businesses",
        "Mature businesses",
        "Other",
      ],
    }, // Investment stages experienced
    otherInvestmentExperience: {
      type: String, // Additional details if "Other" is selected
      required: function () {
        return this.investorTypeExperience?.investmentExperience?.includes(
          "Other"
        );
      },
    },
    notableInvestments: { type: [String] }, // Notable investments or portfolio companies
  },
  // Section 3: Investment Preferences
  investmentPreferences: {
    industries: {
      type: [String],
      enum: [
        "Technology",
        "Healthcare",
        "Fintech",
        "Consumer Goods",
        "Manufacturing",
        "Real Estate",
        "Media and Entertainment",
        "Renewable Energy",
        "Other",
      ],
      required: true,
    }, // Industries of interest
    otherIndustries: {
      type: String, // Additional details if "Other" is selected
      required: function () {
        return this.investmentPreferences?.industries.includes("Other");
      },
    },
    businessStages: {
      type: [String],
      enum: [
        "Pre-seed",
        "Seed",
        "Series A",
        "Series B",
        "Growth-stage",
        "Mature businesses",
      ],
      required: true,
    }, // Business stages typically invested in
    investmentAmount: {
      type: String,
      enum: [
        "<$50000",
        "$50000 - $300,000",
        "$300,000 - $1M",
        "$1M - $5M",
        "$5M+",
      ],
      required: true,
    }, // Preferred investment amount
    geographicPreferences: {
      type: [String],
      enum: ["Local", "Regional", "International"],
      required: true,
    }, // Geographic investment preferences
  },
  // Section 4: Investment Strategy and Criteria
  investmentStrategy: {
    evaluationCriteria: {
      type: [String],
      enum: [
        "Team and leadership",
        "Market potential",
        "Product or service innovation",
        "Revenue model",
        "Traction and growth metrics",
        "Competitive landscape",
        "Social impact",
        "Exit potential",
        "Other",
      ],
      required: true,
    }, // Factors considered when evaluating investments
    otherCriteria: {
      type: String, // Additional details if "Other" is selected
      required: function () {
        return this.investmentStrategy?.evaluationCriteria.includes("Other");
      },
    },
    investmentThesis: { type: String }, // Specific investment focus areas or theses
    investmentTimeline: {
      type: String,
      enum: [
        "Short-term (<3 years)",
        "Medium-term (3-5 years)",
        "Long-term (5+ years)",
      ],
      required: true,
    }, // Preferred investment timeline
    involvementType: {
      type: String,
      enum: ["Active", "Passive", "Hybrid", "Other"],
      required: true,
    }, // Level of involvement preferred
    otherInvolvementType: {
      type: String, // Additional details if "Other" is selected
      required: function () {
        return this.investmentStrategy?.involvementType === "Other";
      },
    },
  },
  // Section 5: Exit Strategy
  exitStrategy: {
    preferredExits: {
      type: [String],
      enum: [
        "IPO",
        "Merger or acquisition",
        "Secondary sale",
        "Dividend distribution",
        "Other",
      ],
      required: true,
    }, // Preferred exit strategies
    otherPreferredExits: {
      type: String, // Additional details if "Other" is selected
      required: function () {
        return this.exitStrategy?.preferredExits.includes("Other");
      },
    },
    successfulExits: { type: [String] }, // Past successful exits (if any)
  },
  // Section 6: Collaboration and Networking
  collaborationNetworking: {
    collaborateWithOthers: { type: Boolean, required: true }, // Open to collaboration with other investors
    investmentNetworks: {
      isActive: { type: Boolean, required: true }, // Whether the user is part of any investment network
      details: {
        type: String,
        required: function () {
          return this.collaborationNetworking?.investmentNetworks?.isActive;
        },
      }, // Details of the investment network
    },
    mentorshipInterest: { type: Boolean, required: true }, // Interest in mentoring entrepreneurs
  },
  // Section 7: Investment Goals and Future Plans
  investmentGoals: {
    primaryGoals: { type: String, required: true }, // Primary investment goals
    diversificationInterest: { type: Boolean, required: true }, // Interest in portfolio diversification
    seekingOpportunities: { type: Boolean, required: true }, // Actively seeking new investment opportunities
  },
  // Section 8: Tools and Digital Presence
  toolsDigitalPresence: {
    managementTools: { type: [String] }, // Tools/platforms used to manage investments
    preferredDiscoveryMethod: {
      type: [String],
      enum: [
        "Personal network",
        "Investment platforms",
        "Referrals",
        "Conferences or events",
        "Other",
      ],
    },
    otherDiscoveryMethod: {
      type: String, // Additional details if "Other" is selected
      required: function () {
        return this.toolsDigitalPresence?.preferredDiscoveryMethod?.includes(
          "Other"
        );
      },
    },
  },
  // Section 9: Business Needs and Platform Expectations
  platformExpectations: {
    servicesLookingFor: {
      type: [String],
      enum: [
        "Access to startups",
        "Co-investment opportunities",
        "Market research",
        "Legal and due diligence",
        "Networking with investors",
        "Other",
      ],
      required: true,
    },
    otherServicesLookingFor: {
      type: String, // Additional details if "Other" is selected
      required: function () {
        return this.platformExpectations?.servicesLookingFor?.includes("Other");
      },
    },
    keyExpectations: {
      type: [String],
      enum: [
        "High-quality investment opportunities",
        "Streamlined deal flow",
        "Access to vetted startups",
        "Networking and co-investment options",
        "Mentorship opportunities",
        "Other",
      ],
      required: true,
    }, // Key expectations from the platform
    otherKeyExpectations: {
      type: String, // Additional details if "Other" is selected
      required: function () {
        return this.platformExpectations?.keyExpectations.includes("Other");
      },
    },
  },
  // Section 10: Success Stories and Achievements
  successStories: {
    notableAchievements: { type: [String] }, // Notable achievements
    caseStudies: { type: [String] }, // Investment success stories or case studies
  },
  // Terms and conditions checkbox
  termsCheckbox: {
    accepted: { type: Boolean, required: true }, // Acceptance of terms and conditions
    overridesDNC: { type: Boolean, required: true }, // Overrides DNC/NDNC registry
  },
});

// Export the model
export default mongoose.model(
  "InvestorQuestionnaire",
  investorQuestionnaireSchema
);
