"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import SharedCard from "./shared-card";
import { Separator } from "../ui/separator";

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

  const handleRemovePatient = (id: string) => {
    setPatients((prevPatients) =>
      prevPatients.filter((patient: any) => patient.id !== id)
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Shared Scans</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {patients.length > 0 ? (
          patients.map((patient: any) => (
            <SharedCard
              key={patient.id}
              patient={patient}
              onRemove={handleRemovePatient}
            />
          ))
        ) : (
          <div className="pt-12 flex flex-col gap-4 justify-center items-center">
            <CardTitle>All clear! 🎉</CardTitle>
            <CardDescription className="text-md">
              No shared scans available right now.
            </CardDescription>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
