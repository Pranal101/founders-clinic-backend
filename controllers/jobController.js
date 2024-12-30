import moment from "moment-timezone";
import Job from "../models/jobModel.js";
import EnterpriseProfile from "../models/enterpriseProfile.js";

// 1. Create a Job Posting
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      entityName,
      emailAddress,
      contactNumber,
      bussinessSupport,
      otherbussinessSupport,
      supportDescription,
      supportDuration,
      skillsRequired,
      jobLocation,
      experience,
      genderPreference,
      budget,
      budgetFlexibility,
      expectedStartDate,
      completionTimeline,
    } = req.body;

    // Get the authenticated user's ID from the request
    const userId = req.user.uid;
    // Find the enterprise profile linked to this user
    const enterpriseProfile = await EnterpriseProfile.findOne({
      userId,
    });

    if (!enterpriseProfile) {
      return res.status(404).json({
        message: "Enterprise profile not found. Please try logging in.",
      });
    }

    // Create job with the enterpriseId from the found profile
    const newJob = new Job({
      enterpriseId: userId,
      logoUrl: enterpriseProfile.logoUrl,
      title,
      description,
      entityName,
      emailAddress,
      contactNumber,
      bussinessSupport,
      otherbussinessSupport,
      supportDescription,
      supportDuration,
      skillsRequired,
      jobLocation,
      experience,
      genderPreference,
      budget,
      budgetFlexibility,
      expectedStartDate,
      completionTimeline,
    });

    const savedJob = await newJob.save();

    res.status(201).json({
      message: "Job created successfully",
      job: savedJob,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// 2. Get Approved Job Postings ( For Enterprise)
export const getJobs = async (req, res) => {
  try {
    // Get the authenticated user's _id
    const userId = req.user.uid;

    // Find the enterprise profile for this user
    const enterpriseProfile = await EnterpriseProfile.findOne({ userId });

    if (!enterpriseProfile) {
      return res.status(404).json({
        message: "Enterprise profile not found. Please complete your profile.",
      });
    }

    // Fetch jobs for this enterprise profile
    const jobs = await Job.find({
      enterpriseId: userId,
      isApproved: true, // Ensure only approved jobs are fetched
    });

    res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 3. Update a Job Posting
export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updates = req.body;

    const updatedJob = await Job.findByIdAndUpdate(jobId, updates, {
      new: true,
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 4. Delete a Job Posting
export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job deleted successfully",
      job: deletedJob,
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// 5. Get Job by ID
export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Find job by ID and populate enterprise details
    const job = await Job.findById(jobId).populate(
      "enterpriseId",
      "entityName"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//Get all jobs for professionals and interns
export const getAllJobs = async (req, res) => {
  try {
    // Fetch all jobs with isApproved set to true
    const jobs = await Job.find({ isApproved: true }).populate(
      "enterpriseId",
      "entityName"
    );

    res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
