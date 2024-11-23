import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin"; 
import { cookies } from "next/headers"; 
import { getFirestore } from "firebase-admin/firestore"; 

export const POST = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  try {
    // Verify the token using firebase-admin
    const decodedToken = await adminAuth.verifyIdToken(token.value);

    const userId = decodedToken.uid;

    // Fetch the user's profile information from Firestore
    const db = getFirestore();
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
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
