import User from "../models/userModel.js";
import EnterpriseProfile from "../models/enterpriseProfile.js";
import ProfessionalProfile from "../models/professionalProfile.js";
import InternProfile from "../models/internProfile.js";
import Document from "../models/documentModel.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
// Create a new user and corresponding profile
// export const registerUser = async (req, res) => {
//   const { name, email, uid, role, profileData } = req.body;

//   try {
//     // Check if the user already exists
//     let user = await User.findOne({ uid });

//     if (!user) {
//       // Create a new user
//       user = new User({ name, email, uid, role, isApproved: false });
//       await user.save();

//       // Create the corresponding profile
//       let profile;
//       if (role === "enterprise") {
//         profile = new EnterpriseProfile({ userId: user._id, ...profileData });
//       } else if (role === "professional") {
//         profile = new ProfessionalProfile({ userId: user._id, ...profileData });
//       } else if (role === "intern") {
//         profile = new InternProfile({ userId: user._id, ...profileData });
//       } else {
//         return res.status(400).json({ message: "Invalid role" });
//       }

//       await profile.save();

//       return res.status(201).json({
//         message: "User and profile created successfully",
//         user,
//         profile,
//       });
//     }

//     res.status(200).json({
//       message: "User already exists",
//       user,
//     });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

//**Latest**
export const registerUser = async (req, res) => {
  const { name, email, uid } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ uid });

    if (!user) {
      // Create a new user
      user = new User({ name, email, uid, role: null, isApproved: false });
      await user.save();

      return res.status(201).json({
        message: "User registered successfully",
        user,
        newUser: true,
      });
    }

    res.status(200).json({
      message: "User logged in successfully",
      user,
      newUser: false,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const addRole = async (req, res) => {
//   try {
//     console.log("Authenticated User:", req.user);

//     const { role } = req.body;

//     // if (!["enterprise", "professional", "intern"].includes(role)) {
//     //   return res.status(400).json({ message: "Invalid role" });
//     // }

//     const userId = req.user.uid;

//     const user = await User.findOneAndUpdate(
//       { uid: userId },
//       { role },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({
//       message: "Role updated successfully",
//       user,
//     });
//   } catch (error) {
//     console.error("Error updating role:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
export const addRole = async (req, res) => {
  const { role } = req.body; // Role: 'enterprise', 'professional', 'intern'
  const userId = req.user.uid; // User's unique identifier from middleware

  try {
    // Update user's role
    const user = await User.findOneAndUpdate(
      { uid: userId },
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return appropriate form fields based on role
    let formFields;
    if (role === "Enterprise") {
      formFields = EnterpriseProfile.schema.obj;
    } else if (role === "Professional") {
      formFields = ProfessionalProfile.schema.obj;
    } else if (role === "Intern") {
      formFields = InternProfile.schema.obj;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    res.status(200).json({
      message: "Role updated successfully",
      user,
      formFields,
    });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateProfile = async (req, res) => {
  const { profileData } = req.body; // Form data from the frontend
  const userId = req.user.uid; // User's unique identifier from middleware

  try {
    const user = await User.findOne({ uid: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let profile;
    if (user.role === "Enterprise") {
      profile = await EnterpriseProfile.findOneAndUpdate(
        { userId },
        { ...profileData },
        { new: true, upsert: true } // Create if not exists
      );
    } else if (user.role === "Professional") {
      profile = await ProfessionalProfile.findOneAndUpdate(
        { userId },
        { ...profileData },
        { new: true, upsert: true }
      );
    } else if (user.role === "Intern") {
      profile = await InternProfile.findOneAndUpdate(
        { userId },
        { ...profileData },
        { new: true, upsert: true }
      );
    } else {
      return res.status(400).json({ message: "User role not set" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRole = async (req, res) => {
  try {
    const { role } = req.user;
    res.status(200).json({ role });
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const uploadDocuments = async (req, res) => {
  console.log("File uploaded:", req.file);
  console.log("Request body:", req.body);

  const { userId, profileType, documentType, documentName } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  if (!userId || !profileType || !documentType || !documentName) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const document = new Document({
      userId,
      profileType,
      documentType,
      documentName,
      documentUrl: `/uploads/${req.file.filename}`, // Save the file path or URL
    });
    await document.save();
    res
      .status(201)
      .json({ message: "Document uploaded successfully!", document });
  } catch (error) {
    res.status(500).json({ message: "Error uploading document", error });
  }
};
//UPLOAD LOGO
export const uploadLogo = async (req, res) => {
  try {
    const userId = req.user.uid; // Extract userId from request body or authenticated user

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Check if the user and their profile exist
    const enterpriseProfile = await EnterpriseProfile.findOne({ userId });
    if (!enterpriseProfile) {
      return res.status(404).json({ message: "Enterprise profile not found" });
    }

    // Update the logo field in the enterprise profile
    enterpriseProfile.logoUrl = `/uploads/${req.file.filename}`;
    await enterpriseProfile.save();

    res.status(200).json({
      message: "Logo uploaded successfully",
      logoUrl: enterpriseProfile.logoUrl,
    });
  } catch (error) {
    console.error("Error uploading logo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
