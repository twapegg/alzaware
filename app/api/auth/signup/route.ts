import { NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const POST = async (req: any) => {
  const { email, password, first_name, last_name } = await req.json();

  //
  console.log(email, password, first_name, last_name);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      first_name,
      last_name,
      email,
    });
    return NextResponse.json(
      { message: "User added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
