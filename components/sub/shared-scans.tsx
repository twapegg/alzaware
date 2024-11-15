import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import SharedCard from "./shared-card";

const dummy = [
  {
    patientID: "1234",
    patientName: "John Doe",
    sender: "Dr. Jane Doe",
    scan: "2021-07-01",
  },
  {
    patientID: "5678",
    patientName: "Jane Doe",
    sender: "Dr. John Doe",
    scan: "2021-07-01",
  },
  {
    patientID: "1235",
    patientName: "John Doe",
    sender: "Dr. Jane Doe",
    scan: "2021-07-01",
  },
];

export default function SharedScans() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shared Scans</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        {dummy.map((scan) => (
          <div key={scan.patientID} className="col-span-1 ">
            <SharedCard {...scan} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
