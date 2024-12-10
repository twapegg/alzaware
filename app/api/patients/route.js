import { NextResponse } from "next/server";
import { db, auth as adminAuth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

const removeCookies = async () => {
  (await cookies()).delete("token");
};

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

    // Fetch patients created by the user
    const createdBySnapshot = await db
      .collection("patients")
      .where("createdBy", "==", userId)
      .get();
    createdBySnapshot.forEach((doc) => {
      patients.push({ id: doc.id, ...doc.data() });
    });

    // Fetch patients shared to the user
    const snapshot = await db.collection("patients").get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      const isSharedToDoctor = data.sharedTo?.some(
        (shared) => shared.to === userId && shared.status === "accepted"
      );

      if (isSharedToDoctor) {
        patients.push({ id: doc.id, ...data });
      }
    });

    return NextResponse.json({ patients }, { status: 200 });
  } catch (error) {
    console.error(error);
    await removeCookies();
    return NextResponse.redirect(new URL("/", req.url));
  }
};
