import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import PatientCardSmall from "./patient-card-small";

// dummy data
const recentAnalysis = [
  {
    patientID: "1234",
    patientName: "John Doe",
    diagnosis: "Non-Demented",
    last_scan_date: "2021-07-01",
  },
  {
    patientID: "5678",
    patientName: "Jane Doe",
    diagnosis: "Demented",
    last_scan_date: "2021-07-01",
  },
  {
    patientID: "1235",
    patientName: "John Doe",
    diagnosis: "Non-Demented",
    last_scan_date: "2021-07-01",
  },
];

export function RecentAnalysis() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>View Recent Analyses</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {recentAnalysis.map((analysis) => (
          <div key={analysis.patientID} className="col-span-1 ">
            <PatientCardSmall {...analysis} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
