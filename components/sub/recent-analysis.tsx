"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import PatientCardSmall from "./patient-card-small";

export function RecentAnalysis() {
  const [recentPatients, setRecentPatients] = useState([]);

  useEffect(() => {
    fetch("/api/patients/recent")
      .then((res) => res.json())
      .then((data) => setRecentPatients(data.patients));

    console.log(recentPatients);
  }, []);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>View Recent Analyses</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {recentPatients.map((patient: any) => (
          <div key={patient.id} className="col-span-1 ">
            <PatientCardSmall {...patient} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
