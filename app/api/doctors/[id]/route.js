import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const GET = async (request, props) => {
  const params = await props.params;
  const { id } = params;

  try {
    const doctor = await db.collection("users").doc(id).get();

    if (!doctor.exists) {
      return NextResponse.json(
        { message: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { id: doctor.id, ...doctor.data() },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
