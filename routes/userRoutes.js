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
} from "../controllers/userController.js";
import { fetchEnterpriseProfileByUid } from "../controllers/enterpriseContrtoller.js";
import {
  deleteEducation,
  deleteExperience,
} from "../controllers/professionalController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
// User registration or login
router.route("/register").post(registerUser);
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

/*ENTERPIRSE ROUTES*/
router
  .route("/company-profile")
  .get(authenticateUser, fetchEnterpriseProfileByUid);
export default router;

/*PROFESSIOANL ROUTES*/
router.patch("/profile/education", deleteEducation);

router.patch("/profile/experience", deleteExperience);
