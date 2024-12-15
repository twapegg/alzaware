"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import PatientCardSmall from "./patient-card-small";
import { Separator } from "../ui/separator";

export function RecentAnalysis() {
  const [recentPatients, setRecentPatients] = useState([]);

  useEffect(() => {
    fetch("/api/patients/recent")
      .then((res) => res.json())
      .then((data) => setRecentPatients(data.patients));

    console.log(recentPatients);
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>View Recent Analyses</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recentPatients.length !== 0 ? (
          recentPatients.map((patient: any) => (
            <div key={patient.id} className="col-span-1 ">
              <PatientCardSmall {...patient} />
            </div>
          ))
        ) : (
          <div className="h-[12rem] flex flex-col gap-4 justify-center items-center col-span-2">
            <CardTitle>All clear! 🎉</CardTitle>

            <CardDescription className="text-md">
              No recent analyses available. Upload a new scan!
            </CardDescription>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
