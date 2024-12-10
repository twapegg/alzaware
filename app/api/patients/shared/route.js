// Get all patients shared to the doctor

import { NextResponse } from "next/server";
import { db, auth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export const GET = async (request, props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token || !token.value) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  try {
    //   Verify the token using Firebase Admin
    const decodedToken = await auth.verifyIdToken(token.value);

    if (!decodedToken) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userId = decodedToken.uid;

    const snapshot = await db.collection("patients").get();
    const sharedPatients = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const isSharedToDoctor = data.sharedTo?.some(
        (shared) => shared.to === userId && shared.status !== "accepted"
      );

      if (isSharedToDoctor) {
        sharedPatients.push({ id: doc.id, ...data });
      }
    });

    return NextResponse.json(sharedPatients, { status: 200 });
  } catch (error) {
    console.error(
      "Error verifying token or retrieving shared patients:",
      error
    );
    return NextResponse.json(
      { message: "Error retrieving shared patients" },
      { status: 500 }
    );
  }
};
