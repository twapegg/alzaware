import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const GET = async (req) => {
  // Parse the URL and extract the search query
  const url = new URL(req.url, `http://${req.headers.host}`);
  const search = url.searchParams.get("name") || "";

  const snapshot = await db.collection("users").get();
  const doctors = [];

  snapshot.forEach((doc) => {
    const data = doc.data();

    // Concatenate first_name and last_name for filtering
    const fullName = `${data.first_name} ${data.last_name}`;

    // Apply regex filtering on the combined name
    if (!search || new RegExp(search, "i").test(fullName)) {
      doctors.push({ id: doc.id, ...data });
    }
  });

  return NextResponse.json(doctors, { status: 200 });
};