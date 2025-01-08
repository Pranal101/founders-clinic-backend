import express from "express";
import { authenticateUser, authorizeAdmin } from "../middleware/auth.js";
import {
  approveJob,
  getAllJobs,
  approveProfile,
  getAllProfiles,
  getAllEvents,
  approveEvent,
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

//events
router.get("/events", getAllEvents);
router.patch("/events/:eventId/approve", approveEvent);
export default router;
