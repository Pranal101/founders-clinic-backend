import EnterpriseProfile from "../models/enterpriseProfile.js";
import Events from "../models/Events.js";
import InternProfile from "../models/internProfile.js";
import InvestorProfile from "../models/investorProfile.js";
import Job from "../models/jobModel.js";
import NetworkingCommunity from "../models/networkingCommunity.js";
import ProfessionalProfile from "../models/professionalProfile.js";
import User from "../models/userModel.js";
//JOBS
// Get all Jobs (for ADMIN)
export const getAllJobs = async (req, res) => {
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find().populate("enterpriseId", "entityName");

    res.status(200).json({
      message: "All jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//Approve a job
export const approveJob = async (req, res) => {
  try {
    // Get the job ID from the request parameters
    const { jobId } = req.params;

    // Find the job by ID and update its isApproved field to true
    const job = await Job.findByIdAndUpdate(
      jobId,
      { isApproved: true },
      { new: true } // Return the updated document
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job approved successfully",
      job,
    });
  } catch (error) {
    console.error("Error approving job:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//Reject a Job
export const rejectJob = async (req, res) => {
  try {
    // Get the job ID from the request parameters
    const { jobId } = req.params;

    // Find the job by ID and update its isApproved field to false
    const job = await Job.findByIdAndUpdate(
      jobId,
      { isApproved: false },
      { new: true } // Return the updated document
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job rejected successfully",
      job,
    });
  } catch (error) {
    console.error("Error rejecting job:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//PROFILE
// Approve or reject a profile
export const approveProfile = async (req, res) => {
  const { profileId, role } = req.params;
  const { isApproved } = req.body;

  try {
    let profile;

    if (role === "Enterprise") {
      profile = await EnterpriseProfile.findByIdAndUpdate(
        profileId,
        { isApproved },
        { new: true }
      ).populate("userId");
    } else if (role === "Professional") {
      profile = await ProfessionalProfile.findByIdAndUpdate(
        profileId,
        { isApproved },
        { new: true }
      ).populate("userId");
    } else if (role === "Intern") {
      profile = await InternProfile.findByIdAndUpdate(
        profileId,
        { isApproved },
        { new: true }
      ).populate("userId");
    } else if (role === "Investor") {
      profile = await InvestorProfile.findByIdAndUpdate(
        profileId,
        { isApproved },
        { new: true }
      ).populate("userId");
    } else if (role === "Networking Community") {
      profile = await NetworkingCommunity.findByIdAndUpdate(
        profileId,
        { isApproved },
        { new: true }
      ).populate("userId");
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Update the user's `isApproved` status
    const user = await User.findByIdAndUpdate(
      profile.userId._id,
      { isApproved },
      { new: true }
    );

    res.status(200).json({
      message: "Profile approval status updated successfully",
      profile,
      user,
    });
  } catch (error) {
    console.error("Error approving profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Fetch all profiles (for admin review)
export const getAllProfiles = async (req, res) => {
  try {
    const enterprises = await EnterpriseProfile.find({}).populate(
      "userId",
      "name email isApproved"
    );
    const professionals = await ProfessionalProfile.find({}).populate(
      "userId",
      "name email isApproved"
    );
    const interns = await InternProfile.find({}).populate(
      "userId",
      "name email isApproved"
    );

    res.status(200).json({
      message: "All profiles fetched successfully",
      data: {
        enterprises,
        professionals,
        interns,
      },
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get all events
export const getAllEvents = async (req, res) => {
  try {
    // Fetch all events
    const events = await Events.find();

    if (events.length === 0) {
      return res.status(404).json({
        message: "No events found",
      });
    }

    res.status(200).json({
      message: "Events fetched successfully",
      events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Approve an Event
export const approveEvent = async (req, res) => {
  try {
    // Get the event ID from the request parameters
    const { eventId } = req.params;

    // Find the event by ID and update its isApproved field to true
    const event = await Events.findByIdAndUpdate(
      eventId,
      { isApproved: true },
      { new: true } // Return the updated document
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      message: "Event approved successfully",
      event,
    });
  } catch (error) {
    console.error("Error approving event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//Reject an Event
export const rejectEvent = async (req, res) => {
  try {
    // Get the event ID from the request parameters
    const { eventId } = req.params;

    // Find the event by ID and update its isApproved field to false
    const event = await Events.findByIdAndUpdate(
      eventId,
      { isApproved: false },
      { new: true } // Return the updated document
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      message: "Event rejected successfully",
      event,
    });
  } catch (error) {
    console.error("Error rejecting event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role isApproved");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};
//approve and reject users
export const updateUserApproval = async (req, res) => {
  const { userId, isApproved } = req.body;

  if (typeof isApproved !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "Invalid 'isApproved' value. It must be true or false.",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { isApproved },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User has been ${isApproved ? "approved" : "rejected"}`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user approval status",
      error: error.message,
    });
  }
};
// Controller to get the count of users by role
export const getUserCountsByRole = async (req, res) => {
  try {
    // Count the users for each role
    const roles = [
      "Enterprise",
      "Professional",
      "Intern",
      "Investor",
      "NetworkingCommunity",
    ];

    const roleCounts = {};

    for (let role of roles) {
      const count = await User.countDocuments({ role });
      roleCounts[role] = count;
    }

    return res.status(200).json({
      message: "User counts fetched successfully",
      data: roleCounts,
    });
  } catch (error) {
    console.error("Error fetching user counts:", error);
    return res.status(500).json({
      message: "Error fetching user counts",
      error: error.message,
    });
  }
};
// Generic function to fetch users by role
const getUsersByRole = async (req, res, role) => {
  try {
    const users = await User.find({ role });
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ error: `No users found for role: ${role}` });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Controllers for each role
export const getEnterpriseUsers = async (req, res) => {
  await getUsersByRole(req, res, "Enterprise");
};

export const getProfessionalUsers = async (req, res) => {
  await getUsersByRole(req, res, "Professional");
};

export const getInternUsers = async (req, res) => {
  await getUsersByRole(req, res, "Intern");
};

export const getInvestorUsers = async (req, res) => {
  await getUsersByRole(req, res, "Investor");
};

export const getNetworkingUsers = async (req, res) => {
  await getUsersByRole(req, res, "Networking Community");
};
//all closed jobs(admin)
export const getClosedJobCount = async (req, res) => {
  try {
    const closedJobCount = await Job.countDocuments({ isClosed: true });
    res.status(200).json({
      success: true,
      data: closedJobCount,
    });
  } catch (error) {
    console.error("Error fetching closed job count:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch closed job count",
    });
  }
};
//total job count
export const getTotalJobCount = async (req, res) => {
  try {
    const totalJobCount = await Job.countDocuments();
    res.status(200).json({
      success: true,
      data: totalJobCount,
    });
  } catch (error) {
    console.error("Error fetching total job count:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch total job count",
    });
  }
};
