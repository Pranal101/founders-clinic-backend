import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import linkedinRoutes from "./routes/linkedinRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// Configure CORS
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://founder-s-clinic-2kb3.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/admin", adminRoutes);
app.use("/api/linkedin", linkedinRoutes);
app.use("/api/user", userRoutes);
app.use("/api/jobs", jobRoutes);

export default app;
