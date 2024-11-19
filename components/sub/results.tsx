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
        <CardTitle>Results Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <h3>Personal Information</h3>
          <p>Full Name: {personalInfo.full_name}</p>
          <p>Date of Birth: {personalInfo.date_of_birth}</p>
          <p>Sex: {personalInfo.sex}</p>
          <p>Email: {personalInfo.email}</p>
          <p>Contact Number: {personalInfo.contact_number}</p>
        </CardDescription>
        <CardDescription>
          <h3>Medical History</h3>
          <p>Diabetes: {medicalHistory.diabetes ? "Yes" : "No"}</p>
          <p>Hypertension: {medicalHistory.hypertension ? "Yes" : "No"}</p>
          <p>Heart Disease: {medicalHistory.heart_disease ? "Yes" : "No"}</p>
          <p>Asthma: {medicalHistory.asthma ? "Yes" : "No"}</p>
          <p>Cancer: {medicalHistory.cancer ? "Yes" : "No"}</p>
          <p>Kidney Disease: {medicalHistory.kidney_disease ? "Yes" : "No"}</p>
        </CardDescription>
        <CardDescription>
          <h3>MRI Scan</h3>
          <p>Scan Date: {mri.scan_date.toString()}</p>
          <p>MRI File: 
            {/* <Image src={mri.mri} alt="MRI Scan" width={200} height={200} /> */}
          </p>
        </CardDescription>
        <CardDescription>
          <h3>Model Prediction</h3>
          <p>Predicted Class: {mri.prediction?.predicted_class}</p>
          <p>Probability: {mri.prediction?.probability}</p>
        </CardDescription>
      </CardContent>
    </CardContent>

  );
}
