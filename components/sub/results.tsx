import React from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { z } from "zod";

import { CldImage } from 'next-cloudinary';




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
    mri: string;
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
      <CardTitle className="text-2xl font-semibold">Results Summary</CardTitle>
    </CardHeader>
    {/* Main content section */}
    <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      
      {/* Left Column (Personal Info & Medical History) */}
      <div className="space-y-6">
        {/* Personal Information Section */}
        <CardDescription className="p-5 border rounded-lg shadow-sm bg-white">
          <h3 className="pb-4 text-xl text-center font-semibold border-b mb-4">Personal Information</h3>
          <p><strong>Full Name:</strong> {personalInfo.full_name}</p>
          <p><strong>Date of Birth:</strong> {new Date(personalInfo.date_of_birth).toLocaleDateString('en-US')}</p>
          <p><strong>Sex:</strong> {personalInfo.sex}</p>
          <p><strong>Email:</strong> {personalInfo.email}</p>
          <p><strong>Contact Number:</strong> {personalInfo.contact_number}</p>
        </CardDescription>
  
        {/* Medical History Section */}
        <CardDescription className="p-5 border rounded-lg shadow-sm bg-white">
          <h3 className="pb-4 text-xl text-center font-semibold border-b mb-4">Medical History</h3>
          <p><strong>Diabetes:</strong> {medicalHistory.diabetes ? "Yes" : "No"}</p>
          <p><strong>Hypertension:</strong> {medicalHistory.hypertension ? "Yes" : "No"}</p>
          <p><strong>Heart Disease:</strong> {medicalHistory.heart_disease ? "Yes" : "No"}</p>
          <p><strong>Asthma:</strong> {medicalHistory.asthma ? "Yes" : "No"}</p>
          <p><strong>Cancer:</strong> {medicalHistory.cancer ? "Yes" : "No"}</p>
          <p><strong>Kidney Disease:</strong> {medicalHistory.kidney_disease ? "Yes" : "No"}</p>
        </CardDescription>
      </div>
  
      {/* Right Column (MRI Scan & Prediction) */}
      <div className="space-y-6">
        {/* MRI Scan Section */}
        <CardDescription className="p-5 border rounded-lg shadow-sm bg-white">
          <h3 className="pb-4 text-xl text-center font-semibold">MRI Scan</h3>
          <div className="flex justify-center mb-4">
            <CldImage className="rounded-xl" width="600" height="600" src={mri.mri} alt="MRI Scan" />
          </div>
          <p className="text-center border-b mb-4 pb-5"><strong>Scan Date:</strong> {new Date(mri.scan_date).toLocaleDateString('en-US')}</p>
        
  
        {/* Model Prediction Section */}
          <h3 className="pb-4 text-xl text-center font-semibold">Model Prediction</h3>
          <p className="text-lg"><strong>Predicted Class:</strong> {mri.prediction?.predicted_class}</p>
          <p className="text-lg"><strong>Probability:</strong> {mri.prediction?.probability}</p>
        </CardDescription>
      </div>
    </CardContent>
  </CardContent>
  
  );
}
