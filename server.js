import app from "./app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";

dotenv.config();

//connect database
connectDatabase();

//server start
app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
