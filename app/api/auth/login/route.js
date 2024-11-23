import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";

export const POST = async (req) => {
  const cookieStore = await cookies();
  const { email, password } = await req.json();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken(); // Get the ID token

    // Set the token in cookies
    cookieStore.set({
      name: "token",
      value: token,
      options: {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
