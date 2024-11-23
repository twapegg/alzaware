import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(); // Initialize Firestore

const removeCookies = async () => {
  (await cookies()).delete("token");
};

export const POST = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token || !token.value) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  try {
    // Verify the token using firebase-admin
    const decodedToken = await adminAuth.verifyIdToken(token.value);

    // If the token is invalid, return an error
    if (!decodedToken) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userId = decodedToken.uid;

    // Fetch the user's profile information from Firestore
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userProfile = userDoc.data();
    return NextResponse.json(
      { ...decodedToken, ...userProfile },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying token:", error);

    // delete the token cookie if verification fails
    removeCookies();
    // redirect to login page
    return NextResponse.redirect("/login");
  }
};
