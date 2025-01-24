import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    userType: { type: String },
    description: {
      type: String,
    },
    discount: {
      type: Number, // for both fixed and percentage discount
      required: true,
      min: 0,
    },
    type: {
      type: String,
      required: true,
      enum: ["fixed", "percentage"], // Ensure the type is either 'fixed' or 'percentage'
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
