"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";

interface PatientModalProps {
  patientID: string;
}

const categories = {
  Lifestyle: ["alcohol", "smoking", "sedentary_lifestyle"],
  "Mental Health": [
    "bipolar_schizophrenia",
    "depression_anxiety",
    "increased_anxiety",
    "mood_changes",
  ],
  Cognition: [
    "confusion",
    "conversation_issues",
    "forgetfulness",
    "memory_issues",
    "problem_solving_issues",
    "language_issues",
    "losing_track",
  ],
  "Medical History": [
    "brain_injuries",
    "brain_surgeries",
    "stroke",
    "parkinsons",
  ],
  "Family History": [
    "family_alzheimers",
    "family_dementias",
    "family_genetic_disorders",
  ],

  Other: ["other"],
};

const formatFieldName = (field: any) =>
  field.replace(/_/g, " ").replace(/^\w/, (c: string) => c.toUpperCase());

export default function PatientModal({ patientID }: PatientModalProps) {
  interface Patient {
    personalInfo: {
      full_name: string;
      email: string;
      contact_number: string;
      date_of_birth: string;
      sex: string;
    };
    mriData: Array<{
      mriUrl: string;
      prediction: {
        predicted_class: string;
        probability: number;
      };
    }>;
    medicalHistory: {
      [key: string]: string | boolean;
    };
  }

  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetch(`/api/patients/${patientID}`)
      .then((response) => response.json())
      .then((data) => setPatient(data));

    console.log(patient);
  }, []);

  const mriData = patient?.mriData[0];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[64rem]">
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
          <DialogDescription>Details of the patient.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4">
          <Card className="text-sm">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3">
              {patient && patient.personalInfo ? (
                <>
                  <div className="flex flex-col gap-4">
                    <div>
                      <CardDescription>Full Name</CardDescription>
                      <span>{patient.personalInfo.full_name}</span>
                    </div>
                    <div>
                      <CardDescription>Email Address</CardDescription>
                      <span>{patient.personalInfo.email}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <CardDescription>Contact Number</CardDescription>
                      <span>{patient.personalInfo.contact_number}</span>
                    </div>
                    <div>
                      <CardDescription>Date of Birth</CardDescription>
                      <span>{patient.personalInfo.date_of_birth}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <CardDescription>Sex</CardDescription>
                      <span>{patient.personalInfo.sex}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div>Loading...</div>
              )}
            </CardContent>
          </Card>
          {patient && mriData ? (
            <Card className="">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>MRI & Diagnosis Prediction</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 ">
                <div className="flex flex-col gap-4 ">
                  <CardDescription>MRI Scan</CardDescription>
                  <div className="">
                    <Image
                      src={mriData.mriUrl}
                      alt="MRI Scan"
                      width={150}
                      height={150}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <CardDescription>Diagnosis</CardDescription>
                  <span className="font-bold">
                    {mriData.prediction?.predicted_class || "N/A"}
                  </span>
                  <CardDescription>Confidence Level</CardDescription>
                  <span className="font-bold">
                    {mriData.prediction?.probability !== undefined
                      ? `${(mriData.prediction.probability * 100).toFixed(2)}%`
                      : "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ) : null}
          {patient && patient.medicalHistory ? (
            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Medical History</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-6 gap-4 text-sm">
                {Object.entries(categories).map(([category, fields]) => (
                  <div key={category}>
                    <CardDescription>{category}</CardDescription>
                    <ul>
                      {fields.map((field) => {
                        const value = patient.medicalHistory[field];
                        if (typeof value === "boolean") {
                          return (
                            <li key={field}>
                              {value ? "✅" : "❌"} {formatFieldName(field)}
                            </li>
                          );
                        } // Check for "other" field or empty strings
                        if (field === "other" && value === "") {
                          return <li key={field}>N/A</li>;
                        }

                        // Display non-empty string fields
                        if (typeof value === "string" && value !== "") {
                          return <li key={field}>{value}</li>;
                        }
                        return null; // Hide fields with false/empty values
                      })}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
