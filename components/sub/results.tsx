import React from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { z } from "zod";

import Image from "next/image";



interface ResultsProps {
  personalInfo: {
    full_name: string;
    date_of_birth: string;
    sex: string;
    email: string;
    contact_number: string;
  };
  medicalHistory: {
    diabetes: boolean;
    hypertension: boolean;
    heart_disease: boolean;
    asthma: boolean;
    cancer: boolean;
    kidney_disease: boolean;
  };
  mri: {
    mri: File;
    scan_date: string;
    prediction?: {
      predicted_class: string;
      probability: number;
    };
  };
}
export default function Results({ personalInfo, medicalHistory, mri }: ResultsProps) {
  return (
    <CardContent>
      <CardHeader>
        <CardTitle className="text-2xl">Results Summary</CardTitle>
      </CardHeader>
      {/*  */}
      <CardContent className="grid grid-cols-2 gap-4">
        <CardDescription  className="pl-5 py-2.5 border rounded-lg shadow-sm">
          <h3 className="pb-5 text-xl text-center">Personal Information</h3>
          <p>Full Name: {personalInfo.full_name}</p>
          <p>Date of Birth: {personalInfo.date_of_birth}</p>
          <p>Sex: {personalInfo.sex}</p>
          <p>Email: {personalInfo.email}</p>
          <p>Contact Number: {personalInfo.contact_number}</p>
        </CardDescription>
        <CardDescription>
          <h3 className="text-xl text-center">MRI Scan</h3>
          <p>Scan Date: {mri.scan_date.toString()}</p>
          <p>MRI File: 
            {/* <Image src={mri.mri} alt="MRI Scan" width={200} height={200} /> */}
          </p>
        </CardDescription>
        <CardDescription className="pl-5 py-2.5 border rounded-lg shadow-sm">
          <h3 className="pb-5 text-xl text-center border-bottom">Medical History</h3>
          <p>Diabetes: {medicalHistory.diabetes ? "Yes" : "No"}</p>
          <p>Hypertension: {medicalHistory.hypertension ? "Yes" : "No"}</p>
          <p>Heart Disease: {medicalHistory.heart_disease ? "Yes" : "No"}</p>
          <p>Asthma: {medicalHistory.asthma ? "Yes" : "No"}</p>
          <p>Cancer: {medicalHistory.cancer ? "Yes" : "No"}</p>
          <p>Kidney Disease: {medicalHistory.kidney_disease ? "Yes" : "No"}</p>
        </CardDescription>
        <CardDescription  className="pl-5 py-2.5 flex flex-col items-center justify-center">
          {/* <h3 className="text-xl">Model Prediction</h3> */}
          <p className="text-xl">Predicted Class: {mri.prediction?.predicted_class}</p>
          <p className="text-xl">Probability: {mri.prediction?.probability}</p>
        </CardDescription>
      </CardContent>
    </CardContent>

  );
}
