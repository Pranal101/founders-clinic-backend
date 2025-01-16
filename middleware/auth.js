import { verifyToken } from "../firebaseAdmin.js";
import User from "../models/userModel.js";
// export const authenticateUser = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decodedToken = await verifyToken(token);
//     req.user = {
//       uid: decodedToken.uid,
//       name: decodedToken.name,
//       email: decodedToken.email,
//     };
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };
export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("Unauthorized: Missing or malformed token");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = await verifyToken(token);

    // Fetch user details from the database
    const user = await User.findOne({ uid: decodedToken.uid });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      _id: user._id,
      uid: user.uid,
      name: user.name,
      email: user.email,
      role: user.role, // Include the role
    };
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
// import { getAuth } from "firebase-admin/auth";

// export const authenticateUser = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   const idToken = authHeader.split(" ")[1]; // Extract token from header

//   try {
//     const decodedToken = await getAuth().verifyIdToken(idToken); // Verify token

//     // Attach user information to `req.user`
//     req.user = {
//       uid: decodedToken.uid,
//       name: decodedToken.name || "Anonymous",
//       email: decodedToken.email || "No Email",
//     };

//     next(); // Proceed to next middleware/controller
//   } catch (error) {
//     console.error("Authentication error:", error);
//     res.status(401).json({
//       message: "Invalid or expired token. Please sign in again.",
//     });
//   }
// };

//for admin role
export const authorizeAdmin = async (req, res, next) => {
  try {
    // Ensure `req.user` exists (set by `authenticateUser`)
    if (!req.user) {
      return res
        .status(403)
        .json({ message: "Access denied: No user information found" });
    }

    // Check if the user has an admin role
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    next(); // User is an admin; proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
