import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const GET = async () => {
  try {
    const patients = [];
    const snapshot = await db.collection("patients").get();
    snapshot.forEach((doc) => {
      patients.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ patients }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
