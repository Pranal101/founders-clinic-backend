import app from "./app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";

// Import the scheduler to deactivate expired coupons
import "./utils/couponScheduler.js";

dotenv.config();

//connect database
connectDatabase();

//server start
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server started on http://0.0.0.0:${process.env.PORT}`);
});
