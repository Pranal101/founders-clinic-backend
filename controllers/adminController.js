import Job from "../models/jobModel.js";
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

//PROFILE
// Approve or reject a profile
export const approveProfile = async (req, res) => {
  const { profileId, role } = req.params;
  const { isApproved } = req.body;

  try {
    let profile;

    if (role === "enterprise") {
      profile = await EnterpriseProfile.findByIdAndUpdate(
        profileId,
        { isApproved },
        { new: true }
      ).populate("userId", "name email");
    } else if (role === "professional") {
      profile = await ProfessionalProfile.findByIdAndUpdate(
        profileId,
        { isApproved },
        { new: true }
      ).populate("userId", "name email");
    } else if (role === "intern") {
      profile = await InternProfile.findByIdAndUpdate(
        profileId,
        { isApproved },
        { new: true }
      ).populate("userId", "name email");
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
