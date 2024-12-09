import { NextResponse } from "next/server";
import { db, auth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export const GET = async (req) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || !token.value) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    // Verify the token using firebase-admin
    const decodedToken = await auth.verifyIdToken(token.value);

    if (!decodedToken) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userId = decodedToken.uid;

    // Parse the URL and extract the search query
    const url = new URL(req.url, `http://${req.headers.host}`);
    const search = url.searchParams.get("name") || "";

    const snapshot = await db.collection("users").get();
    const doctors = [];

    snapshot.forEach((doc) => {
      const data = doc.data();

      // Skip the current user from the list
      if (doc.id === userId) return;

      // Concatenate first_name and last_name for filtering
      const fullName = `${data.first_name} ${data.last_name}`;

      // Apply regex filtering on the combined name
      if (!search || new RegExp(search, "i").test(fullName)) {
        doctors.push({ id: doc.id, ...data });
      }
    });

    return NextResponse.json(doctors, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching doctors" },
      { status: 500 }
    );
  }
};
