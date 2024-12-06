import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    const patient = await db.collection("patients").doc(id).get();

    if (!patient.exists) {
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { id: patient.id, ...patient.data() },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
