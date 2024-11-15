import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface PatientCardSmallProps {
  patientID: string;
  patientName: string;
  diagnosis: string;
  last_scan_date: string;
}

export default function PatientCardSmall({
  patientID,
  patientName,
  diagnosis,
  last_scan_date,
}: PatientCardSmallProps) {
  return (
    <Link href={`patients/${patientID}`}>
      <Card>
        <CardContent className="py-4">
          <div className="grid grid-cols-2 ">
            <div>
              <CardDescription>Patient ID #{patientID}</CardDescription>
              <h2 className="text-lg font-semibold">{patientName}</h2>
              <p className="text-gray-500">{diagnosis}</p>
            </div>
            <div>
              <CardDescription>Last Scan:</CardDescription>
              <CardDescription className="text-black">
                {last_scan_date}
              </CardDescription>
              <Button
                variant="outline"
                onClick={() => {}}
                className="mt-2 bg-brand"
              >
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
