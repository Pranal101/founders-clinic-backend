// import qs from "querystring";
import axios from "axios";
import admin from "firebase-admin";

export const Authorization = () => {
  return encodeURI(
    `https://linkedin.com/oauth/v2/authorization?client_id=${process.env.LINKDIN_CLIENT_ID}&response_type=code&scope=${process.env.LINKDIN_SCOPE}&redirect_uri=${process.env.LINKDIN_REDIRECT_URL}`
  );
};

export const Redirect = async (code) => {
  const payload = {
    client_id: process.env.LINKDIN_CLIENT_ID,
    client_secret: process.env.LINKDIN_CLIENT_SECRET,
    redirect_uri: process.env.LINKDIN_REDIRECT_URL,
    grant_type: "authorization_code",
    code: code,
  };

  // Exchange authorization code for LinkedIn access token
  const { data } = await axios({
    url: `https://linkedin.com/oauth/v2/accessToken?${qs.stringify(payload)}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return data.access_token; // Return the LinkedIn access token
};

export const getLinkedInUser = async (accessToken) => {
  const { data } = await axios({
    url: "https://api.linkedin.com/v2/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data; // Return LinkedIn user profile
};

export const generateFirebaseToken = async (linkedInUser) => {
  const firebaseUID = `linkedin:${linkedInUser.id}`; // Create a unique UID for Firebase

  // Additional custom claims can be added here if needed
  const customClaims = {
    platform: "linkedin",
  };

  const token = await admin.auth().createCustomToken(firebaseUID, customClaims);
  return token; // Return Firebase custom token
};
