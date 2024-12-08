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
      // set cookie to expire after 2 days
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    });

    // Upon login, wakeup backend model from inactivity
    fetch("https://alzaware-api.onrender.com/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    let errorMessage = "An error occurred during login";
    switch (error.code) {
      case "auth/user-not-found":
        errorMessage = "No account found with this email.";
        break;
      case "auth/invalid-credential":
        errorMessage = "Invalid credentials. Please try again.";
        break;
      case "auth/invalid-email":
        errorMessage = "The email address is invalid.";
        break;
      case "auth/user-disabled":
        errorMessage = "This account has been disabled. Contact support.";
        break;
      case "auth/missing-password":
        errorMessage = "Password is required.";
        break;
      default:
        errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
};
