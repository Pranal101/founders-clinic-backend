import Coupon from "../models/couponModel.js";

// Create a new coupon
export const createCoupon = async (req, res) => {
  try {
    const { code, discount, userType, description, type, expirationDate } =
      req.body;

    // Validate input
    if (!code || discount === undefined || !type || !expirationDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists." });
    }

    // Validate the type field to be either 'fixed' or 'percentage'
    if (!["fixed", "percentage"].includes(type)) {
      return res.status(400).json({
        message: 'Discount type must be either "fixed" or "percentage".',
      });
    }

    // Create and save the coupon
    const coupon = new Coupon({
      code,
      discount,
      description,
      userType,
      type,
      expirationDate,
    });
    await coupon.save();

    res.status(201).json({ message: "Coupon created successfully.", coupon });
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// View all coupons
export const getAllCoupons = async (req, res) => {
  try {
    // Fetch all coupons from the database and sort by _id in descending order (latest first)
    const coupons = await Coupon.find().sort({ _id: -1 });

    res.status(200).json({ coupons });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a coupon by ID
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the coupon
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon not found." });
    }

    res.status(200).json({ message: "Coupon deleted successfully." });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Apply a coupon (to calculate discount)
export const applyCoupon = async (req, res) => {
  try {
    const { code, totalAmount } = req.body;

    // Find the coupon by code
    const coupon = await Coupon.findOne({ code, isActive: true });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found or inactive." });
    }

    // Check if the coupon is expired
    const currentDate = new Date();
    if (currentDate > new Date(coupon.expirationDate)) {
      return res.status(400).json({ message: "Coupon has expired." });
    }

    // Calculate the discount based on coupon type
    let discountAmount = 0;
    if (coupon.type === "percentage") {
      discountAmount = (totalAmount * coupon.discount) / 100;
    } else if (coupon.type === "fixed") {
      discountAmount = coupon.discount;
    }

    // Ensure discount does not exceed the total amount
    if (discountAmount > totalAmount) {
      discountAmount = totalAmount;
    }

    const finalAmount = totalAmount - discountAmount;

    res.status(200).json({
      message: "Coupon applied successfully.",
      discountAmount,
      finalAmount,
    });
  } catch (error) {
    console.error("Error applying coupon:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
//toggle coupon status
export const toggleCouponStatus = async (req, res) => {
  try {
    const { couponId } = req.params; // Get the coupon ID from the URL params

    // Find the coupon by its ID
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    // Toggle the isActive field
    coupon.isActive = !coupon.isActive;

    // Save the updated coupon
    await coupon.save();

    res.status(200).json({
      message: `Coupon status updated successfully. Now it is ${
        coupon.isActive ? "active" : "inactive"
      }.`,
      coupon,
    });
  } catch (error) {
    console.error("Error toggling coupon status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//get active coupons
export const getActiveCoupons = async (req, res) => {
  try {
    // Find all coupons where isActive is true
    const activeCoupons = await Coupon.find();

    if (activeCoupons.length === 0) {
      return res.status(404).json({ message: "No active coupons found" });
    }

    res.status(200).json({
      message: "Active coupons retrieved successfully",
      coupons: activeCoupons,
    });
  } catch (error) {
    console.error("Error retrieving active coupons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
