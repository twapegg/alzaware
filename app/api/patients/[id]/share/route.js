import { NextResponse } from "next/server";
import { db, auth as adminAuth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export const PATCH = async (req, props) => {
  const params = await props.params;
  const { id } = params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token || !token.value) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  //   try {
  // Verify the token using Firebase Admin
  const decodedToken = await adminAuth.verifyIdToken(token.value);

  if (!decodedToken) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const userId = decodedToken.uid; // ID of the doctor who is sharing

  // Parse request body
  const { doctorID } = await req.json(); // `id` is the patient ID, `toDoctorId` is the receiver's doctor ID

  if (!id || !doctorID) {
    return NextResponse.json(
      { message: "Patient ID and target doctor ID are required" },
      { status: 400 }
    );
  }

  const patientRef = db.collection("patients").doc(id);
  const patient = await patientRef.get();

  if (!patient.exists) {
    return NextResponse.json({ message: "Patient not found" }, { status: 404 });
  }

  const currentSharedTo = patient.data().sharedTo || []; // Existing sharedTo array

  // Check if this doctor is already in the sharedTo array
  const alreadyShared = currentSharedTo.some(
    (share) => share.to === doctorID && share.from === userId
  );

  if (alreadyShared) {
    return NextResponse.json(
      { message: "Patient already shared with this doctor" },
      { status: 400 }
    );
  }

  // Update the sharedTo array
  await patientRef.update({
    sharedTo: [
      ...currentSharedTo,
      {
        to: doctorID,
        from: userId,
        status: "pending", // Default status is pending
        sharedAt: new Date().toISOString(),
      },
    ],
  });

  return NextResponse.json(
    { message: "Patient successfully shared", sharedTo: doctorID },
    { status: 200 }
  );
  //   } catch (error) {
  //     console.error("Error updating sharedTo array:", error);
  //     return NextResponse.json(
  //       { message: "Internal Server Error", error: error.message },
  //       { status: 500 }
  //     );
  //   }
};
