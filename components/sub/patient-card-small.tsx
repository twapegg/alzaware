import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface PatientCardSmallProps {
  id: string;
  mriData: any;
  personalInfo: {
    full_name: string;
  };
}

export default function PatientCardSmall({
  id,
  mriData,
  personalInfo,
}: PatientCardSmallProps) {
  return (
    <Link href={`patients/${id}`}>
      <Card>
        <CardContent className="py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <div>
                <CardDescription>Patient Name</CardDescription>
                <h2 className="text-md font-semibold">
                  {personalInfo.full_name}
                </h2>
              </div>
              <div>
                <CardDescription>Classification</CardDescription>
                <h2 className="text-md">
                  {mriData[0].prediction?.predicted_class}
                </h2>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div>
                <CardDescription>Last Scan</CardDescription>
                <h2 className="text-md">
                  {new Date(mriData[0].scanDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h2>
              </div>
              <div>
                <CardDescription>Probability</CardDescription>
                <h2 className="text-md">
                  {" "}
                  {mriData[0].prediction?.probability !== undefined
                    ? `${(mriData[0].prediction.probability * 100).toFixed(2)}%`
                    : "N/A"}
                </h2>
              </div>

              {/* <Button
                variant="outline"
                onClick={() => {}}
                className="mt-2 bg-brand"
              >
                View Details
              </Button> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
