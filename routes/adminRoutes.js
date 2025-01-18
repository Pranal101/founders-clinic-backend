import express from "express";
import { authenticateUser, authorizeAdmin } from "../middleware/auth.js";
import {
  approveJob,
  getAllJobs,
  approveProfile,
  getAllProfiles,
  getAllEvents,
  approveEvent,
  rejectJob,
  rejectEvent,
  getAllUsers,
  updateUserApproval,
  getUserCountsByRole,
  getEnterpriseUsers,
  getProfessionalUsers,
  getInternUsers,
  getInvestorUsers,
  getNetworkingUsers,
} from "../controllers/adminController.js";
import {
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getEnterpriseSubscriptions,
  getInternSubscriptions,
  getProfessionalSubscriptions,
} from "../controllers/subscriptionController.js";
import {
  createCoupon,
  deleteCoupon,
  getActiveCoupons,
  getAllCoupons,
  toggleCouponStatus,
} from "../controllers/couponController.js";
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
router.patch("/jobs/:jobId/reject", rejectJob);
router.get("/users", getAllUsers); // Fetch all users
router.patch("/users/approve", updateUserApproval); // Approve or reject a user
// Route to get user counts by role
router.get("/user-counts", getUserCountsByRole);

//events
router.get("/events", getAllEvents);
router.patch("/events/:eventId/approve", approveEvent);
router.patch("/events/:eventId/reject", rejectEvent);

//subscriptions
router.post("/create-package", createSubscription);
router.get("/all-package", getAllSubscriptions);
router.delete("/package/:id", deleteSubscription);
// Route to get subscriptions for Enterprise users
router.get("/subscriptions/enterprise", getEnterpriseSubscriptions);

// Route to get subscriptions for Intern users
router.get("/subscriptions/intern", getInternSubscriptions);

// Route to get subscriptions for Professional users
router.get("/subscriptions/professional", getProfessionalSubscriptions);

//coupons
// Create a coupon
router.post("/create-coupon", createCoupon);
// View all coupons
router.get("/all-coupons", getAllCoupons);
// Delete a coupon by ID
router.delete("/coupon/:id", deleteCoupon);
// Get active coupons
router.get("/coupons/active", getActiveCoupons);
// Route to toggle coupon status
router.patch("/coupon/:couponId/toggle", toggleCouponStatus);
//get all users based on roles
router.get("/enterprise", getEnterpriseUsers);
router.get("/professional", getProfessionalUsers);
router.get("/intern", getInternUsers);
router.get("/investor", getInvestorUsers);
router.get("/networking", getNetworkingUsers);
export default router;
