import User from "../models/userModel.js";
import EnterpriseProfile from "../models/enterpriseProfile.js";
import ProfessionalProfile from "../models/professionalProfile.js";
import InternProfile from "../models/internProfile.js";

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
