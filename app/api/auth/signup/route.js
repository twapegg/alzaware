import { NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "@/lib/firebaseConfig";
import { db } from "@/lib/firebaseAdmin";
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

  const userDocRef = db.collection("users").doc();

  await userDocRef.set({
    uid: user.uid,
    email,
    first_name,
    last_name,
  });

  return NextResponse.json(
    { message: "User added successfully" },
    { status: 201 }
  );
  // } catch (error) {
  //   return NextResponse.json({ message: error.message }, { status: 500 });
  // }
};
