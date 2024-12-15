"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import PatientModal from "./patient-details-modal";

interface SharedCardProps {
  patient: {
    id: string;
    personalInfo: {
      full_name: string;
      date_of_birth: string;
      email: string;
    };
    mriData: Array<{
      mriUrl: string;
      scanDate: string;
      prediction: {
        predicted_class: string;
        probability: number;
      };
    }>;
    sharedTo: Array<{
      to: string;
      from: string;
      status: string;
      sharedAt: any;
    }>;
  };
  onRemove: (id: string) => void;
}

export default function SharedCard({ patient, onRemove }: SharedCardProps) {
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    // fetch the doctor's name from the server
    fetch(`/api/doctors/${patient.sharedTo[0].from}`)
      .then((res) => res.json())
      .then((data) => setDoctorName(`${data.first_name} ${data.last_name}`))
      .catch((error) => console.error("Error fetching doctor's name:", error));

    // console.log(patient);
  }, []);

  const AcceptShared = () => {
    fetch(`/api/patients/${patient.id}/share/accept`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        onRemove(patient.id); // Call the callback to remove the patient from the list
      })
      .catch((error) =>
        console.error("Error accepting shared patient:", error)
      );
  };

  return (
    <Card className=" w-full">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardDescription>Shared by</CardDescription>
            <span className="font-bold">{doctorName}</span>
          </div>
          <div>
            <CardDescription>Shared Date</CardDescription>
            <span>
              {new Date(patient.mriData[0].scanDate).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </span>
          </div>
        </div>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <CardDescription>Patient Name</CardDescription>
            <span>{patient.personalInfo.full_name}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <PatientModal patientID={patient.id} />
        <Button onClick={AcceptShared} className="bg-brand font-bold">
          Accept
        </Button>
      </CardFooter>
    </Card>
  );
}
