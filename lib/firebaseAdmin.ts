import { cert, getApps } from "firebase-admin/app";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_ADMIN_SDK_JSON || "{}" // Ensure this is only available on the server
);

let app;

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  admin.initializeApp({
    credential: cert(serviceAccount),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
} else {
  app = getApps()[0];
}

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
