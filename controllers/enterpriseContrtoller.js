import User from "../models/userModel.js";
import EnterpriseProfile from "../models/enterpriseProfile.js";
import ProfessionalProfile from "../models/professionalProfile.js";
import InternProfile from "../models/internProfile.js";
import Application from "../models/applicationModel.js";
import InvestorProfile from "../models/investorProfile.js";
import NetworkingCommunity from "../models/networkingCommunity.js";

export const fetchEnterpriseProfileByUid = async (req, res) => {
  const userId = req.user.uid; // User's unique identifier from middleware

  try {
    const user = await User.findOne({ uid: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let profile;
    if (user.role === "Enterprise") {
      profile = await EnterpriseProfile.findOne({ userId });
    } else if (user.role === "Professional") {
      profile = await ProfessionalProfile.findOne({ userId });
    } else if (user.role === "Intern") {
      profile = await InternProfile.findOne({ userId });
    } else if (user.role === "Investor") {
      profile = await InvestorProfile.findOne({ userId });
    } else if (user.role === "Networking Community") {
      profile = await NetworkingCommunity.findOne({ userId });
    } else {
      return res.status(400).json({ message: "User role not set" });
    }

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      profile,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params; // Extract application ID from URL
    const { status } = req.body; // Extract status from request body

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status provided." });
    }

    // Find and update the application status
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true } // Return the updated document
    );

    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    return res.status(200).json({
      message: `Application status updated to ${status}.`,
      application,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({ error: "Server error occurred." });
  }
};
//view all companies
export const viewAllEnterprises = async (req, res) => {
  try {
    // Fetch all enterprises from the database
    const enterprises = await EnterpriseProfile.find().populate("documents");

    // Return the data in the response
    return res.status(200).json({
      success: true,
      message: "Enterprises fetched successfully",
      data: enterprises,
    });
  } catch (error) {
    console.error("Error fetching enterprises:", error);

    // Handle errors and return a response
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching enterprises",
      error: error.message,
    });
  }
};
//get enterprise by id
export const getEnterpriseProfileById = async (req, res) => {
  try {
    const { id } = req.params; // Extract _id from request parameters
    const profile = await EnterpriseProfile.findById(id)
      .populate("documents") // Populate documents if needed
      .exec();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Enterprise profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("Error fetching enterprise profile:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the enterprise profile",
      error: error.message,
    });
  }
};
