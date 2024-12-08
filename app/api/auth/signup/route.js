import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseConfig";
import { db } from "@/lib/firebaseAdmin";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const POST = async (req) => {
  const { email, password, first_name, last_name } = await req.json();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDocRef = db.collection("users").doc(user.uid);

    await userDocRef.set({
      email,
      first_name,
      last_name,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "User added successfully" },
      { status: 201 }
    );
  } catch (error) {
    let errorMessage = "An error occurred";
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "This email is already in use.";
        break;
      case "auth/invalid-email":
        errorMessage = "The email address is invalid.";
        break;
      case "auth/weak-password":
        errorMessage = "The password is too weak.";
        break;
      default:
        errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
};
