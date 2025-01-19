import User from "../models/userModel.js";
import EnterpriseProfile from "../models/enterpriseProfile.js";
import ProfessionalProfile from "../models/professionalProfile.js";
import InternProfile from "../models/internProfile.js";
import InvestorProfile from "../models/investorProfile.js";
import NetworkingCommunityProfile from "../models/networkingCommunity.js";
import Document from "../models/documentModel.js";
import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import multer from "multer";
import bcrypt from "bcrypt";
import NetworkingCommunity from "../models/networkingCommunity.js";
import Skill from "../models/skillModel.js";
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
  const { name, email, uid, authProvider, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ uid });

    if (!user) {
      // Create a new user
      user = new User({
        name,
        email,
        uid,
        authProvider,
        password,
        role: null,
        isApproved: false,
      });
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
//login user
export const loginUser = async (req, res) => {
  const { uid, email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ uid, email });

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please sign up first.",
      });
    }

    // Validate the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password. Please try again.",
      });
    }

    // Return user details
    res.status(200).json({
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
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
    } else if (role === "Investor") {
      formFields = InvestorProfile.schema.obj;
    } else if (role === "Networking Community") {
      formFields = NetworkingCommunityProfile.schema.obj;
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
  console.log(req.body);
  const userId = req.user.uid; // User's unique identifier from middleware
  console.log("userid:", userId);

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
    } else if (user.role === "Networking Community") {
      profile = await NetworkingCommunity.findOneAndUpdate(
        { userId },
        { ...profileData },
        { new: true, upsert: true }
      );
    } else if (user.role === "Investor") {
      profile = await InvestorProfile.findOneAndUpdate(
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
//send job application
export const createApplication = async (req, res) => {
  try {
    const { message, jobId } = req.body;

    // Validate the request body
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required." });
    }

    // Generate the resume file path
    const resumeLink = `/uploads/${req.file.filename}`; // Using multer upload destination

    // Create a new job application
    const newApplication = new Application({
      jobId,
      applicantId: req.user.uid, // User's UID from middleware
      message,
      resumeLink,
    });

    await newApplication.save();

    res.status(201).json({
      message: "Application submitted successfully.",
      application: newApplication,
    });
  } catch (error) {
    console.error("Error creating application:", error);
    res
      .status(500)
      .json({ message: "Failed to submit application. Try again later." });
  }
};

//get all applied jobs by a user
export const getAppliedJobs = async (req, res) => {
  try {
    const uid = req.user.uid; // User ID from authenticated request

    // Fetch applications for the logged-in user
    const applications = await Application.find({ applicantId: uid }).populate(
      "jobId"
    );

    if (!applications.length) {
      return res.status(404).json({ message: "No applications found." });
    }

    // Format the response with necessary job details
    const formattedApplications = applications.map((app) => ({
      _id: app._id,
      appliedDate: app.appliedDate,
      status: app.status,
      job: {
        _id: app.jobId._id,
        title: app.jobId.title,
        logoUrl: app.jobId.logoUrl,
        description: app.jobId.description,
        location: app.jobId.jobLocation,
      },
    }));

    res.status(200).json({
      success: true,
      applications: formattedApplications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
//get all applicants
// export const getApplicantsForEnterprise = async (req, res) => {
//   try {
//     const uid = req.user.uid;

//     if (!uid) {
//       return res.status(400).json({ message: "User ID is missing in request" });
//     }

//     // Step 1: Get all jobs posted by the enterprise
//     const jobs = await Job.find({ enterpriseId: uid });

//     if (!jobs.length) {
//       return res
//         .status(404)
//         .json({ message: "No jobs found for this enterprise" });
//     }

//     // Extract job IDs
//     const jobIds = jobs.map((job) => job._id);

//     // Step 2: Get all applications for the jobs
//     const applications = await Application.find({ jobId: { $in: jobIds } })
//       .populate("jobId") // Optional: Populate job details if needed
//       .exec();

//     if (!applications.length) {
//       return res
//         .status(404)
//         .json({ message: "No applications found for the jobs" });
//     }

//     // Step 3: Format the response
//     const result = applications.map((application) => ({
//       applicationId: application._id,
//       jobTitle: application.jobId?.title || "N/A",
//       applicantId: application.applicantId,
//       status: application.status,
//       appliedDate: application.appliedDate,
//       resumeLink: application.resumeLink,
//       message: application.message,
//     }));

//     res.status(200).json({ applicants: result });
//   } catch (error) {
//     console.error("Error fetching applicants:", error);
//     res
//       .status(500)
//       .json({ message: "Unable to fetch applicants for the enterprise" });
//   }
// };
// get applicants for a job
export const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params; // Get jobId from request params
    const uid = req.user.uid; // Get the user ID from the request (enterprise user)

    if (!uid) {
      return res.status(400).json({ message: "User ID is missing in request" });
    }

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // Step 1: Check if the job belongs to the enterprise
    const job = await Job.findOne({ _id: jobId, enterpriseId: uid });

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found or doesn't belong to the enterprise" });
    }

    // Step 2: Get all applications for the specified job
    const applications = await Application.find({ jobId })
      .populate("jobId")
      .exec();

    if (!applications.length) {
      return res
        .status(404)
        .json({ message: "No applications found for this job" });
    }

    // Step 3: Fetch applicant profiles and format the response
    const result = await Promise.all(
      applications.map(async (application) => {
        const professionalProfile = await ProfessionalProfile.findOne({
          userId: application.applicantId,
        });
        const internProfile = await InternProfile.findOne({
          userId: application.applicantId,
        });

        let profileData = {};

        if (professionalProfile) {
          profileData = {
            name: `${professionalProfile.firstName} ${professionalProfile.lastName}`,
            phone: professionalProfile.phone,
            email: professionalProfile.emailAddress,
            country: professionalProfile.country,
            city: professionalProfile.city,
            address: professionalProfile.completeAddress,
            entityName: professionalProfile.entityName,
            role: professionalProfile.organizationRole,
            portfolio: professionalProfile.portfolio,
            website: professionalProfile.websiteLink,
            experienceYears: professionalProfile.experienceYears,
          };
        } else if (internProfile) {
          profileData = {
            name: `${internProfile.firstName} ${internProfile.lastName}`,
            phone: internProfile.phone,
            email: internProfile.emailAddress,
            country: internProfile.country,
            city: internProfile.city,
            address: internProfile.completeAddress,
            entityName: internProfile.entityName,
            role: internProfile.organizationRole,
            portfolio: internProfile.portfolio,
            website: internProfile.websiteLink,
            experienceYears: internProfile.experienceYears,
          };
        }

        return {
          applicationId: application._id,
          jobTitle: application.jobId?.title || "N/A",
          applicantId: application.applicantId,
          status: application.status,
          appliedDate: application.appliedDate,
          resumeLink: application.resumeLink,
          message: application.message,
          applicant: profileData, // Include full profile data
        };
      })
    );

    res.status(200).json({ applicants: result });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({
      message: "Unable to fetch applicants for the specified job",
    });
  }
};

export const getApplicantsForEnterprise = async (req, res) => {
  try {
    const uid = req.user.uid;

    if (!uid) {
      return res.status(400).json({ message: "User ID is missing in request" });
    }

    // Step 1: Get all jobs posted by the enterprise
    const jobs = await Job.find({ enterpriseId: uid });

    if (!jobs.length) {
      return res
        .status(404)
        .json({ message: "No jobs found for this enterprise" });
    }

    // Extract job IDs
    const jobIds = jobs.map((job) => job._id);

    // Step 2: Get all applications for the jobs
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("jobId")
      .exec();

    if (!applications.length) {
      return res
        .status(404)
        .json({ message: "No applications found for the jobs" });
    }

    // Step 3: Fetch applicant profiles and format the response
    const result = await Promise.all(
      applications.map(async (application) => {
        const professionalProfile = await ProfessionalProfile.findOne({
          userId: application.applicantId,
        });
        const internProfile = await InternProfile.findOne({
          userId: application.applicantId,
        });

        let profileData = {};

        if (professionalProfile) {
          profileData = {
            name: `${professionalProfile.firstName} ${professionalProfile.lastName}`,
            phone: professionalProfile.phone,
            email: professionalProfile.emailAddress,
            country: professionalProfile.country,
            city: professionalProfile.city,
            address: professionalProfile.completeAddress,
            entityName: professionalProfile.entityName,
            role: professionalProfile.organizationRole,
            portfolio: professionalProfile.portfolio,
            website: professionalProfile.websiteLink,
            experienceYears: professionalProfile.experienceYears,
          };
        } else if (internProfile) {
          profileData = {
            name: `${internProfile.firstName} ${internProfile.lastName}`,
            phone: internProfile.phone,
            email: internProfile.emailAddress,
            country: internProfile.country,
            city: internProfile.city,
            address: internProfile.completeAddress,
            entityName: internProfile.entityName,
            role: internProfile.organizationRole,
            portfolio: internProfile.portfolio,
            website: internProfile.websiteLink,
            experienceYears: internProfile.experienceYears,
          };
        }

        return {
          applicationId: application._id,
          jobTitle: application.jobId?.title || "N/A",
          applicantId: application.applicantId,
          status: application.status,
          appliedDate: application.appliedDate,
          resumeLink: application.resumeLink,
          message: application.message,
          applicant: profileData, // Include full profile data
        };
      })
    );

    res.status(200).json({ applicants: result });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res
      .status(500)
      .json({ message: "Unable to fetch applicants for the enterprise" });
  }
};
//view all investors
export const getAllInvestors = async (req, res) => {
  try {
    const investors = await InvestorProfile.find();
    res.status(200).json({ success: true, data: investors });
  } catch (error) {
    console.error("Error fetching investors:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getSkills = async (req, res) => {
  try {
    const skillDoc = await Skill.findOne({});
    if (!skillDoc) {
      return res.status(200).json([]); // Return an empty array if no document exists
    }
    res.status(200).json(skillDoc.skills);
  } catch (error) {
    res.status(500).json({ error: "Error fetching skills" });
  }
};

export const addSkill = async (req, res) => {
  try {
    const { skills } = req.body; // Expecting an array of skill names
    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ error: "Invalid skills data" });
    }

    // Normalize skills to lowercase to handle case insensitivity
    const normalizedSkills = skills.map((skill) => skill.trim().toLowerCase());

    const skillDoc = await Skill.findOneAndUpdate(
      {},
      {
        $addToSet: { skills: { $each: normalizedSkills } }, // Add unique skills to the array
      },
      { upsert: true, new: true } // Create document if it doesn't exist
    );

    res.status(201).json(skillDoc.skills);
  } catch (error) {
    res.status(500).json({ error: "Error adding skills" });
  }
};

export const addUserSkills = async (req, res) => {
  try {
    const { uid } = req.user;
    const { skills } = req.body;

    if (!uid) {
      return res.status(400).json({ error: "User ID (uid) is required." });
    }

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res
        .status(400)
        .json({ error: "No skills provided or invalid format." });
    }

    // Normalize skills to lowercase
    const normalizedSkills = skills.map((skill) => skill.trim().toLowerCase());

    // Find the skill document (assuming a single document structure for all skills)
    let skillDocument = await Skill.findOne();
    if (!skillDocument) {
      skillDocument = new Skill();
    }

    // Extract the existing skills and userSkills for processing
    const existingGlobalSkills = skillDocument.skills || [];
    const userSkills = skillDocument.userSkills || [];

    // Add new global skills (if any)
    const newGlobalSkills = normalizedSkills.filter(
      (skill) => !existingGlobalSkills.includes(skill)
    );
    if (newGlobalSkills.length > 0) {
      skillDocument.skills = [...existingGlobalSkills, ...newGlobalSkills];
    }

    // Add/update user-specific skills
    const userIndex = userSkills.findIndex((user) => user.uid === uid);
    if (userIndex >= 0) {
      // User exists, update their skills
      userSkills[userIndex].skills = Array.from(
        new Set([...userSkills[userIndex].skills, ...normalizedSkills])
      );
    } else {
      // User does not exist, create a new entry
      userSkills.push({ uid, skills: normalizedSkills });
    }

    // Update the skillDocument
    skillDocument.userSkills = userSkills;
    await skillDocument.save();

    return res.status(200).json({ message: "Skills added successfully!" });
  } catch (error) {
    console.error("Error adding user-specific skills:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const getUserSkills = async (req, res) => {
  try {
    const { uid } = req.user; // Extract `uid` from the authenticated user
    const skillDoc = await Skill.findOne({}); // Fetch the single skill document

    const userSkills = skillDoc?.userSkills.find((user) => user.uid === uid);

    res.status(200).json(userSkills ? userSkills.skills : []);
  } catch (error) {
    console.error("Error fetching user-specific skills:", error);
    res.status(500).json({ message: "Failed to fetch user-specific skills." });
  }
};
export const removeUserSkills = async (req, res) => {
  try {
    const { uid } = req.user;
    const { skills } = req.body;

    if (!uid || !skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ error: "Invalid user ID or skills." });
    }

    const skillDocument = await Skill.findOne();
    if (!skillDocument) {
      return res.status(404).json({ error: "Skill document not found." });
    }

    // Find the user in the `userSkills` array
    const userIndex = skillDocument.userSkills.findIndex(
      (user) => user.uid === uid
    );
    if (userIndex >= 0) {
      // Remove specified skills from the user's skill list
      skillDocument.userSkills[userIndex].skills = skillDocument.userSkills[
        userIndex
      ].skills.filter((skill) => !skills.includes(skill));

      // Save the updated skill document
      await skillDocument.save();
      return res.status(200).json({ message: "Skills removed successfully!" });
    }

    return res.status(404).json({ error: "User not found in skill document." });
  } catch (error) {
    console.error("Error removing user-specific skills:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//shortlist people
export const toggleShortlistedStatus = async (req, res) => {
  try {
    const { applicationId } = req.params; // Get application ID from params

    const application = await Application.findById(applicationId); // Find the application
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Toggle the isShortlisted status
    application.isShortlisted = !application.isShortlisted;
    await application.save(); // Save the updated application

    res.status(200).json({
      message: `Application has been ${
        application.isShortlisted ? "shortlisted" : "removed from shortlist"
      }`,
      application,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating shortlisted status", error });
  }
};
