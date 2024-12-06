import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinaryConfig";
import { Readable } from "stream";
import crypto from "crypto";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("mri");

    if (!file) {
      return NextResponse.json(
        { error: "MRI scan is required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const hash = crypto.createHash("md5").update(buffer).digest("hex");

    // Check if an image with the same hash already exists
    const existingImage = await cloudinary.search
      .expression(`resource_type:image AND tags:${hash}`)
      .execute();

    if (existingImage.total_count > 0) {
      return NextResponse.json({ url: existingImage.resources[0].secure_url });
    }

    const stream = Readable.from(buffer);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "alzaware/mri_scans",
          public_id: hash,
          unique_filename: false,
          tags: [hash],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.pipe(uploadStream);
    });

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to upload MRI scan" },
      { status: 500 }
    );
  }
};
