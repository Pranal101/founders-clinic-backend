// import express from "express";
// import {
//   linkedinAuthorize,
//   linkedinRedirect,
// } from "../controller/userController.js";

// const router = express.Router();

// router.route("/authorize").get(linkedinAuthorize);
// router.route("/redirect").get(linkedinRedirect);

// export default router;
import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";
const router = express.Router();

// LinkedIn Client Info
const CLIENT_ID = process.env.LINKDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKDIN_CLIENT_SECRET;
const REDIRECT_URI = process.env.LINKDIN_REDIRECT_URL;

// Step 1: Redirect to LinkedIn Authorization
router.get("/authorize", (req, res) => {
  const linkedInAuthURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${process.env.LINKDIN_SCOPE}`;
  res.redirect(linkedInAuthURL);
});

// router.get("/redirect", async (req, res) => {
//   const { code } = req.query;

//   if (!code) {
//     console.error("Authorization code missing in the request.");
//     return res.status(400).send("Authorization code is missing");
//   }

//   console.log("Received LinkedIn authorization code:", code); // Log the received code

//   try {
//     // Exchange authorization code for access token
//     const tokenResponse = await axios.post(
//       "https://www.linkedin.com/oauth/v2/accessToken",
//       new URLSearchParams({
//         grant_type: "authorization_code",
//         code,
//         redirect_uri: REDIRECT_URI,
//         client_id: CLIENT_ID,
//         client_secret: CLIENT_SECRET,
//       }).toString(),
//       { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//     );

//     console.log("LinkedIn token exchange response:", tokenResponse.data); // Log token exchange response
//     console.log("LinkedIn id_token", tokenResponse.data.id_token);

//     const { access_token } = tokenResponse.data;
//     if (!access_token) {
//       console.error("Access token missing in the token response.");
//       return res.status(400).send("Access token is missing");
//     }
//     const userResponse = await axios.get(
//       "https://api.linkedin.com/v2/userinfo",
//       {
//         headers: { Authorization: `Bearer ${access_token}` },
//       }
//     );

//     console.log("LinkedIn user data response:", userResponse.data);

//     // Send user data to the frontend
//     res
//       .status(200)
//       .json({ id_token: tokenResponse.data.id_token, user: userResponse.data });
//   } catch (error) {
//     console.error(
//       "Error during LinkedIn redirect:",
//       error.response?.data || error.message
//     ); // Log any errors
//     res.status(500).send("Failed to fetch LinkedIn data");
//   }
// });

router.get("/redirect", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    console.error("Authorization code missing in the request.");
    return res.status(400).send("Authorization code is missing");
  }

  console.log("Received LinkedIn authorization code:", code); // Log the received code

  try {
    // Exchange authorization code for access token
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    console.log("LinkedIn token exchange response:", tokenResponse.data); // Log token exchange response
    console.log("LinkedIn id_token", tokenResponse.data.id_token);

    const { access_token, id_token } = tokenResponse.data;

    if (!access_token || !id_token) {
      console.error("Access token or id_token missing in the token response.");
      return res.status(400).send("Access token or id_token is missing");
    }

    // Optionally: Fetch user profile (optional, already part of id_token)
    const userResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    console.log("LinkedIn user data response:", userResponse.data);

    // Redirect back to the frontend with the id_token
    const FRONTEND_URL = "http://localhost:3000"; // Replace with your actual frontend URL
    res.redirect(`${FRONTEND_URL}?id_token=${id_token}`);
  } catch (error) {
    console.error(
      "Error during LinkedIn redirect:",
      error.response?.data || error.message
    ); // Log any errors
    res.status(500).send("Failed to fetch LinkedIn data");
  }
});
export default router;
