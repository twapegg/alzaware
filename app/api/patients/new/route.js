import { NextResponse } from "next/server";
import { z } from "zod";
import { db, auth } from "@/lib/firebaseAdmin";

import { cookies } from "next/headers";

const personalInfoSchema = z.object({
  full_name: z.string(),
  date_of_birth: z.string(),
  sex: z.enum(["M", "F"]),
  email: z.string().email(),
  contact_number: z.string(),
});

const medicalHistorySchema = z.object({
  smoking: z.boolean(),
  alcohol: z.boolean(),
  sedentary_lifestyle: z.boolean(),
  brain_surgeries: z.boolean(),
  medications_affecting_cognition: z.boolean(),
  family_alzheimers: z.boolean(),
  family_dementias: z.boolean(),
  family_genetic_disorders: z.boolean(),
  memory_issues: z.boolean(),
  problem_solving_issues: z.boolean(),
  language_issues: z.boolean(),
  confusion: z.boolean(),
  stroke: z.boolean(),
  parkinsons: z.boolean(),
  brain_injuries: z.boolean(),
  depression_anxiety: z.boolean(),
  bipolar_schizophrenia: z.boolean(),
  forgetfulness: z.boolean(),
  conversation_issues: z.boolean(),
  losing_track: z.boolean(),
  mood_changes: z.boolean(),
  increased_anxiety: z.boolean(),
  other: z.string().optional(),
});

const mriSchema = z.object({
  mri_url: z.string(),
  scan_date: z.string(),
  prediction: z
    .object({
      predicted_class: z.string(),
      probability: z.number(),
    })
    .optional(),
});

const patientSchema = z.object({
  personalInfo: personalInfoSchema,
  medicalHistory: medicalHistorySchema,
});

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || !token.value) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    // Verify the token using firebase-admin
    const decodedToken = await auth.verifyIdToken(token.value);

    // If the token is invalid, return an error
    if (!decodedToken) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userId = decodedToken.uid;

    const body = await request.json();

    const mriData = mriSchema.parse(body.mriData);

    const patientData = patientSchema.parse(body);

    // Create a new patient document in the "patients" collection
    const patientDocRef = db.collection("patients").doc();

    await patientDocRef.set({
      ...patientData,
      mriData: [
        {
          mriID: 0,
          mriUrl: mriData.mri_url,
          scanDate: mriData.scan_date,
          prediction: mriData.prediction,
          createdBy: userId,
        },
      ],
      createdBy: userId,
      createdAt: new Date().toISOString(),
      sharedTo: [],
    });

    //

    return NextResponse.json({
      message: "Patient created successfully",
      patientId: patientDocRef.id,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
