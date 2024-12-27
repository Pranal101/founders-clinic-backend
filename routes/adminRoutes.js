import express from "express";
import { authenticateUser, authorizeAdmin } from "../middleware/auth.js";
import {
  approveJob,
  getAllJobs,
  approveProfile,
  getAllProfiles,
} from "../controllers/adminController.js";
const router = express.Router();

router.get("/profiles", getAllProfiles);
router.patch(
  "/profiles/:role/:profileId",
  authenticateUser,
  authorizeAdmin,
  approveProfile
);
router.get("/jobs", getAllJobs);
router.patch("/jobs/:jobId/approve", approveJob);
export default router;
