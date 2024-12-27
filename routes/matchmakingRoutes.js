// NOT IMPORTED IN APP.JS YET

import express from "express";
import {
  getInternMatchesForJobs,
  getProfessionalMatchesForJobs,
  getJobMatchesForIntern,
  getJobMatchesForProfessional,
} from "../controllers/matchmakingController.js";

const router = express.Router();

// Matchmaking for interns
router.get("/intern-matches", getInternMatchesForJobs);
router.get("/intern-job-matches/:userId", getJobMatchesForIntern);

// Matchmaking for professionals
router.get("/professional-matches", getProfessionalMatchesForJobs);
router.get("/professional-job-matches/:userId", getJobMatchesForProfessional);

export default router;
