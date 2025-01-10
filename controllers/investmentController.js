import Investement from "../models/investementModel.js";

// Create a new investment
export const createInvestment = async (req, res) => {
  try {
    const {
      businessName,
      businessType,
      foundedYear,
      coFounderName,
      country,
      city,
      emailAddress,
      contactNumber,
      websiteLink,
      socialMediaLinks,
      industryType,
      businessDescription,
      currentBusninessStage,
      servicesOffered,
      targetMarket,
      teamSize,
      hasRaisedFunding,
      fundingAmount,
      fundingStage,
      seekingFunding,
      seekingFundingAmount,
      platformServices,
      platformExpectations,
      acceptTerms,
      documents,
    } = req.body;

    const userId = req.user.uid; // Get userId (uid) from req.user, which is set by the authenticateUser middleware

    // Create a new investment document
    const newInvestment = new Investement({
      enterpriseId: userId,
      businessName,
      businessType,
      foundedYear,
      coFounderName,
      country,
      city,
      emailAddress,
      contactNumber,
      websiteLink,
      socialMediaLinks,
      industryType,
      businessDescription,
      currentBusninessStage,
      servicesOffered,
      targetMarket,
      teamSize,
      hasRaisedFunding,
      fundingAmount,
      fundingStage,
      seekingFunding,
      seekingFundingAmount,
      platformServices,
      platformExpectations,
      acceptTerms,
      documents,
    });

    // Save the new investment
    await newInvestment.save();

    return res.status(201).json({
      message: "Investment created successfully",
      investment: newInvestment,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error creating investment", error: error.message });
  }
};

// Get all investments
export const getAllInvestments = async (req, res) => {
  try {
    const investments = await Investement.find({ enterpriseId: req.user.uid }); // Fetch all investments for the authenticated user
    return res.status(200).json(investments);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching investments", error: error.message });
  }
};

// Get investment by _id
// export const getInvestmentById = async (req, res) => {
//   try {
//     const investmentId = req.params.id; // Get the investment ID from the request parameters
//     const investment = await Investement.findOne({
//       _id: investmentId,
//       enterpriseId: req.user.uid,
//     }); // Ensure the investment belongs to the authenticated user

//     if (!investment) {
//       return res.status(404).json({
//         message: "Investment not found or you do not have access to it",
//       });
//     }

//     return res.status(200).json(investment);
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ message: "Error fetching investment", error: error.message });
//   }
// };
export const getInvestmentById = async (req, res) => {
  try {
    const investmentId = req.params.id; // Get the investment ID from the request parameters

    // Find the investment by ID
    const investment = await Investement.findById(investmentId);

    if (!investment) {
      return res.status(404).json({
        message: "Investment not found",
      });
    }

    return res.status(200).json(investment);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching investment", error: error.message });
  }
};

//get investements for a user
export const getInvestmentsbyUid = async (req, res) => {
  const userId = req.user.uid; // Assuming `req.user` is populated by middleware

  try {
    // Find all investments for the authenticated user
    const investments = await Investement.find({ enterpriseId: userId });

    if (!investments || investments.length === 0) {
      return res
        .status(404)
        .json({ message: "No investments found for this user." });
    }

    res.status(200).json(investments);
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({
      message: "An error occurred while fetching investments.",
      error,
    });
  }
};
// Controller to list all investments
export const listInvestments = async (req, res) => {
  try {
    // Fetch all investments from the database
    const investments = await Investement.find().populate("documents");

    // Respond with the list of investments
    res.status(200).json({
      success: true,
      data: investments,
    });
  } catch (error) {
    console.error("Error fetching investments:", error);

    // Handle errors gracefully
    res.status(500).json({
      success: false,
      message: "Failed to fetch investments. Please try again later.",
    });
  }
};

//get investement by ID
export const getInvestementById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Investement.findById(id);

    if (!event) {
      return res.status(404).json({ error: "Investement not found" });
    }

    res.status(200).json({ event });
  } catch (error) {
    console.error("Error fetching investement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
