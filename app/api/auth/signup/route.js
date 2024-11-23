import { NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const POST = async (req) => {
  const { email, password, first_name, last_name } = await req.json();

  // try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Ensure the user document is created in the "users" collection
    await setDoc(doc(db, "users", user.uid), {
      first_name,
      last_name,
      email,
      createdAt: new Date().toISOString(), // Add a timestamp for when the user was created
    });
    return NextResponse.json(
      { message: "User added successfully" },
      { status: 201 }
    );
  // } catch (error) {
  //   return NextResponse.json({ message: error.message }, { status: 500 });
  // }
};
