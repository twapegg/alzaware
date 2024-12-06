import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    fetch("https://alzaware-api.onrender.com/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  } catch (error) {
    console.error("Error waking up API:", error);
    return NextResponse.json(
      { error: "Failed to wake up API" },
      { status: 500 }
    );
  }
};
