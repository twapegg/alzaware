"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import SharedCard from "./shared-card";

export default function SharedScans() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("/api/patients/shared")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((error) =>
        console.error("Error fetching shared patients:", error)
      );
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Shared Scans</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {patients.map((patient: any) => (
          <SharedCard key={patient.id} patient={patient} />
        ))}
      </CardContent>
    </Card>
  );
}
