import cron from "node-cron";
import Coupon from "../models/couponModel.js";

const deactivateExpiredCoupons = async () => {
  try {
    const result = await Coupon.updateMany(
      { expirationDate: { $lt: new Date() }, isActive: true },
      { $set: { isActive: false } }
    );
    if (result.modifiedCount > 0) {
      console.log(`${result.modifiedCount} expired coupons deactivated.`);
    }
  } catch (error) {
    console.error("Error deactivating expired coupons:", error);
  }
};

// Schedule this job to run every night at 12:00 AM
cron.schedule("0 0 * * *", () => {
  console.log("Running coupon expiration check...");
  deactivateExpiredCoupons();
});

export default deactivateExpiredCoupons;
// import cron from "node-cron";
// import Coupon from "../models/couponModel.js";

// const deactivateExpiredCoupons = async () => {
//   try {
//     const result = await Coupon.updateMany(
//       { expirationDate: { $lt: new Date() }, isActive: true },
//       { $set: { isActive: false } }
//     );
//     if (result.modifiedCount > 0) {
//       console.log(`${result.modifiedCount} expired coupons deactivated.`);
//     } else {
//       console.log("No expired coupons found.");
//     }
//   } catch (error) {
//     console.error("Error deactivating expired coupons:", error);
//   }
// };

// // ✅ Run once on startup to test immediately
// (async () => {
//   console.log("Running initial coupon expiration check...");
//   await deactivateExpiredCoupons();
// })();

// // Schedule this job to run every night at 12:00 AM
// cron.schedule("0 0 * * *", () => {
//   console.log("Running scheduled coupon expiration check...");
//   deactivateExpiredCoupons();
// });

// export default deactivateExpiredCoupons;
