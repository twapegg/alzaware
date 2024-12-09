import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const GET = async (req) => {
  const snapshot = await db.collection("patients").get();
  const patientCount = snapshot.size;

  return NextResponse.json(
    {
      patientCount,
    },
    { status: 200 }
  );
};
