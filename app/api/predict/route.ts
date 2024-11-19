import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  // get image_url from request
  const { imageUrl } = await req.json();
  console.log(imageUrl);

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

    // Check if the response is OK and has JSON content
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error from prediction API: ${errorText}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await response.text();
      throw new Error(`Unexpected content type: ${contentType}, body: ${errorText}`);
    }

    // parse the response
    const data = await response.json();

    return NextResponse.json({ message: data }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
};
