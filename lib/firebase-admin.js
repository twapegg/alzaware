import { initializeApp } from "firebase-admin/app";
import * as admin from "firebase-admin"; // Add this import

const serviceAccount = JSON.parse(
  process.env.FIREBASE_ADMIN_SDK_JSON || "{}" // Fallback if the variable isn't set
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminAuth = admin.auth(); // Export admin auth
export default admin;