import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

const removeCookies = async () => {
  (await cookies()).delete("token");
};

export const POST = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 401 }
    );
  }

  try {
    removeCookies();

    signOut(auth)
      .then(() => {
        // remove cookies
        removeCookies();
        return NextResponse.json(
          { message: "Successfully logged out" },
          { status: 200 }
        );
      })
      .catch((error) => {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
      });

    return NextResponse.json(
      { message: "Successfully logged out" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
