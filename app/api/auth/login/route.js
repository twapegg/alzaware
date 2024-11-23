import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export const POST = async (req) => {
  const { email, password } = await req.json();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken(); // Get the ID token

    // Set the token in cookies
    const response = NextResponse.json(user, { status: 200 });
    response.cookies.set("token", token, { httpOnly: true, secure: true });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
