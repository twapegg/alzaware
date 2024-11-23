import { NextResponse } from "next/server";

export const POST = async (req) => {
  // get image_url from request
  const { imageUrl } = await req.json();
  console.log(imageUrl);

  try {
    // go to the model and get the prediction
    const response = await fetch("https://alzaware-api.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    // Check if the response is OK and has JSON content
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error from prediction API: ${errorText}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await response.text();
      throw new Error(
        `Unexpected content type: ${contentType}, body: ${errorText}`
      );
    }

    // parse the response
    const data = await response.json();

    return NextResponse.json({ message: data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
};
