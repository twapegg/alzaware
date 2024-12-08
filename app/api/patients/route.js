import { NextResponse } from "next/server";
import { db, auth as adminAuth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export const GET = async (req) => {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token");

    if (!token || !token.value) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    // Verify the token using firebase-admin
    const decodedToken = await adminAuth.verifyIdToken(token.value);

    // If the token is invalid, return an error
    if (!decodedToken) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userId = decodedToken.uid;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const patients = [];
    const createdBySnapshot = await db
      .collection("patients")
      .where("createdBy", "==", userId)
      .get();
    createdBySnapshot.forEach((doc) => {
      patients.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json(
      {
        patients,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
