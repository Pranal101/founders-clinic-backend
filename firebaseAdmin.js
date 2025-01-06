import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

// First decode the base64 string back into a JSON string, then parse it
const rawServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

const serviceAccount = JSON.parse(
  rawServiceAccount
    .replace(/\\n/g, "n") // First replace any existing escaped newlines
    .replace(/\n/g, "\\n") // Then escape any actual newlines
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const verifyToken = async (token) => {
  return admin.auth().verifyIdToken(token);
};
