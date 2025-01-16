import express from "express";
import multer from "multer";
import { authenticateUser, authorizeAdmin } from "../middleware/auth.js";
import {
  addRole,
  registerUser,
  updateProfile,
  getRole,
  uploadDocuments,
  uploadLogo,
  createApplication,
  getAppliedJobs,
  getApplicantsForEnterprise,
  getAllInvestors,
  loginUser,
} from "../controllers/userController.js";
import {
  fetchEnterpriseProfileByUid,
  updateApplicationStatus,
  viewAllEnterprises,
} from "../controllers/enterpriseContrtoller.js";
import {
  deleteEducation,
  deleteExperience,
  getAllProfessionals,
} from "../controllers/professionalController.js";
import {
  createEvent,
  deleteEvent,
  getAllNetworkingCommunities,
  getEventById,
  getEvents,
} from "../controllers/networkingController.js";
import {
  createInvestment,
  getAllInvestments,
  getInvestmentById,
  getInvestmentsbyUid,
  listInvestments,
} from "../controllers/investmentController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
// User registration or login
router.route("/register").post(registerUser);
//User log in
router.route("/login").post(loginUser);
// Update user role
router.route("/role").patch(authenticateUser, addRole);
//get user role
router.route("/getRole").get(authenticateUser, getRole);
// Update or create profile
router.patch("/profile", authenticateUser, updateProfile);
//Upload documents
router.post("/upload", upload.single("file"), uploadDocuments);
//Upload Logo
router.post(
  "/upload-logo",
  authenticateUser,
  upload.single("file"),
  uploadLogo
);
//send job application
router.post(
  "/apply",
  authenticateUser,
  upload.single("resume"),
  createApplication
);
//get applied jobs
router.get("/applied-jobs", authenticateUser, getAppliedJobs);

/*ENTERPIRSE ROUTES*/
router
  .route("/company-profile")
  .get(authenticateUser, fetchEnterpriseProfileByUid);
router.put("/:applicationId/status", updateApplicationStatus);
router.get("/applicants", authenticateUser, getApplicantsForEnterprise);
router.get("/view-enterprises", viewAllEnterprises);
//investements
router.post("/investments", authenticateUser, createInvestment);
router.get("/all-investments", authenticateUser, getAllInvestments);
router.get("/investments/:id", authenticateUser, getInvestmentById);
router.get("/investments", authenticateUser, getInvestmentsbyUid);
router.get("/all-investors", authenticateUser, listInvestments);
router.get("/investement/:id", getInvestmentById);

/*PROFESSIOANL ROUTES*/
router.patch("/profile/education", deleteEducation);

router.patch("/profile/experience", deleteExperience);

router.get("/view-professionals", getAllProfessionals);
/*Networking Community ROUTES*/
router.post("/new-events", authenticateUser, createEvent);

// Get approved events
router.get("/get-events", authenticateUser, getEvents);
// Delete an event by ID
router.delete("/events/:eventId", deleteEvent);
router.get("/events/:eventId", getEventById);
//view all networking profiles
router.get("/view-networking", getAllNetworkingCommunities);

/*Investor ROUTES*/
router.get("/view-investors", getAllInvestors);
export default router;
