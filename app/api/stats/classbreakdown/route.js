import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const GET = async (req) => {
  const snapshot = await db.collection("patients").get();

  const classBreakdown = [
    { class: "Non Demented", count: 0, fill: "#DDD8B8" },
    { class: "Very Mild Demented", count: 0, fill: "#BC9EC1" },
    { class: "Mild Demented", count: 0, fill: "#5D4A66" },
    { class: "Moderate Demented", count: 0, fill: "#DC90F5" },
  ];

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (Array.isArray(data.mriData)) {
      data.mriData.forEach((mri) => {
        // Access prediction class
        const predictionClass = mri.prediction?.predicted_class;

        // Increment the count of the class
        const classIndex = classBreakdown.findIndex(
          (item) => item.class === predictionClass
        );
        classBreakdown[classIndex].count += 1;
      });
    }
  });

  return NextResponse.json(
    {
      classBreakdown,
    },
    { status: 200 }
  );
};
