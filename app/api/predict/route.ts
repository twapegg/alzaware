import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  // get image_url from request
  const { imageUrl } = await req.json();

  try {
    // go to the model and get the prediction
    const response = await fetch(
      "https://literate-umbrella-9x95wr5rq692qg7-5000.app.github.dev/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      }
    );

    // parse the response
    const data = await response.json();

    return NextResponse.json({ message: data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
