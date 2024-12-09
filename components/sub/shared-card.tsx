"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

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
}

export default function SharedCard({ patient }: SharedCardProps) {
  const [doctorName, setDoctorName] = useState("");

  const latestMRI = patient.mriData?.[0]; // Assuming we display the latest MRI
  const sharedWith = patient.sharedTo.map((entry) => entry.to).join(", ");

  useEffect(() => {
    // fetch the doctor's name from the server
    fetch(`/api/doctors/${patient.sharedTo[0].from}`)
      .then((res) => res.json())
      .then((data) => setDoctorName(`${data.first_name} ${data.last_name}`))
      .catch((error) => console.error("Error fetching doctor's name:", error));

    // console.log(patient);
  }, []);

  return (
    <Card className="">
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

        {/* <p>
          <strong>Date of Birth:</strong> {patient.personalInfo.date_of_birth}
        </p>
        <p>
          <strong>Email:</strong> {patient.personalInfo.email}
        </p>
        {latestMRI && (
          <>
            <p>
              <strong>Latest MRI Prediction:</strong>{" "}
              {latestMRI.prediction.predicted_class}
            </p>
            <p>
              <strong>Probability:</strong>{" "}
              {latestMRI.prediction.probability.toFixed(2)}
            </p>
            <img
              src={latestMRI.mriUrl}
              alt="MRI Scan"
              className="w-full mt-2"
            />
          </>
        )}
        <p>
          <strong>Shared With:</strong> {sharedWith || "None"}
        </p> */}

        <Button className="mt-2">View Details</Button>
      </CardContent>
    </Card>
  );
}
