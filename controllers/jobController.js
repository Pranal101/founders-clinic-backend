import moment from "moment-timezone";
import Job from "../models/jobModel.js";
import Skill from "../models/skillModel.js";
import EnterpriseProfile from "../models/enterpriseProfile.js";
import InternProfile from "../models/internProfile.js";
import ProfessionalProfile from "../models/professionalProfile.js";

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
      skills,
      jobLocation,
      experience,
      genderPreference,
      budget,
      budgetFlexibility,
      expectedStartDate,
      completionTimeline,
      isClosed,
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
      skills,
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
    const jobs = await Job.find().populate("enterpriseId", "entityName");

    res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//getEnterpriseId for chats
export const getEnterpriseIdByJobId = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required." });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found." });
    }

    res.status(200).json({ enterpriseId: job.enterpriseId });
  } catch (error) {
    console.error("Error fetching enterpriseId:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching enterpriseId." });
  }
};
//get matchmaked jobs only
export const getMatchingJobsBySkills = async (req, res) => {
  try {
    const { uid } = req.user; // Get the user ID from the request

    if (!uid) {
      return res.status(400).json({ error: "User ID (uid) is required." });
    }

    // Fetch the user's skills from the Skill model
    const skillDocument = await Skill.findOne();
    if (!skillDocument) {
      return res.status(404).json({ error: "Skill document not found." });
    }

    // Find the user in the userSkills array
    const userSkillsObj = skillDocument.userSkills.find(
      (user) => user.uid === uid
    );

    if (!userSkillsObj) {
      return res.status(404).json({ error: "User skills not found." });
    }

    const userSkills = userSkillsObj.skills;

    // Fetch all approved jobs
    const jobs = await Job.find({ isApproved: true, isClosed: false });

    // Filter jobs based on skill match
    const matchedJobs = jobs.map((job) => {
      // Find the matching skills between the user's skills and the job's required skills
      const matchedSkills = job.skillsRequired.filter((skill) =>
        userSkills.includes(skill)
      );

      // Calculate the skill match score
      const matchScore = matchedSkills.length;

      return {
        job,
        matchScore,
      };
    });

    // Sort jobs based on match score (higher match score first)
    const sortedMatchedJobs = matchedJobs
      .filter((item) => item.matchScore > 0) // Only include jobs with at least 1 matched skill
      .sort((a, b) => b.matchScore - a.matchScore) // Sort jobs by match score in descending order
      .map((item) => item.job); // Extract only the job data

    res.status(200).json({
      message: "Jobs fetched successfully",
      jobs: sortedMatchedJobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const toggleJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Toggle the isClosed status
    job.isClosed = !job.isClosed;
    await job.save();

    res.status(200).json({
      message: `Job has been ${job.isClosed ? "closed" : "reopened"}`,
      job,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating job status", error });
  }
};
//count all jobs
export const countJobs = async (req, res) => {
  try {
    const jobCount = await Job.countDocuments();
    res.status(200).json({ success: true, count: jobCount });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error counting jobs", error });
  }
};

export const matchJobsToUsers = async (req, res) => {
  try {
    const { uid, role } = req.user; // Extracted from middleware

    let matchedJobs = [];

    if (role === "intern") {
      const intern = await InternProfile.findOne({ userId: uid });
      if (!intern) return res.status(404).json({ message: "Intern not found" });

      matchedJobs = await Job.find({
        bussinessSupport: "Intern",
        skills: { $in: intern.skills },
      });
    } else if (role === "professional") {
      const professional = await ProfessionalProfile.findOne({ userId: uid });
      if (!professional)
        return res.status(404).json({ message: "Professional not found" });

      matchedJobs = await Job.find({
        bussinessSupport: { $in: professional.skills },
      });
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }

    res.status(200).json(matchedJobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
