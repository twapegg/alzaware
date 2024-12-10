import { NextResponse } from "next/server";
import { db, auth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export const PATCH = async (request, props) => {
  const { id } = await props.params;

  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token || !token.value) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  // try {
  const decodedToken = await auth.verifyIdToken(token.value);

  if (!decodedToken) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const userId = decodedToken.uid;

  const patientRef = db.collection("patients").doc(id);

  const patientDoc = await patientRef.get();

  if (!patientDoc.exists) {
    return NextResponse.json({ message: "Patient not found" }, { status: 404 });
  }

  const patientData = patientDoc.data();

  // Locate the sharedTo entry with the matching userId
  const sharedToIndex = patientData.sharedTo.findIndex((entry) => entry.to === userId);

  if (sharedToIndex === -1) {
    return NextResponse.json({ message: "Sharing not found for this user" }, { status: 404 });
  }

  // Update the status to "accepted"
  const updatedSharedTo = [...patientData.sharedTo];
  updatedSharedTo[sharedToIndex] = {
    ...updatedSharedTo[sharedToIndex],
    status: "accepted",
  };

  await patientRef.update({
    sharedTo: updatedSharedTo,
  });

  return NextResponse.json({ message: "Patient accepted" }, { status: 200 });
  // } catch (error) {
  //   console.error("Error verifying token or sharing patient:", error);
  //   return NextResponse.json(
  //     { message: "Error sharing patient" },
  //     { status: 500 }
  //   );
  // }
};
