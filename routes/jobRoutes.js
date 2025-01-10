import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobById,
  getEnterpriseIdByJobId,
} from "../controllers/jobController.js";

const router = express.Router();

// Route to create a job posting
router.post("/create-job", authenticateUser, createJob);

// Route to get all jobs for professionals and interns
router.get("/get-all-jobs", authenticateUser, getAllJobs);

// Route to fetch job postings (all or by enterprise)
router.get("/all-jobs", authenticateUser, getJobs);

// Route to fetch a job by ID
router.get("/:jobId", authenticateUser, getJobById);

// Route to update a job posting
router.patch("/:jobId", updateJob);

// Route to delete a job posting
router.delete("/:jobId", deleteJob);

// Route to fetch enterpriseId for chats
router.get("/:jobId/enterpriseId", getEnterpriseIdByJobId);

export default router;
