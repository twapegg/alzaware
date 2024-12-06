import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { CldImage } from "next-cloudinary";

interface ResultsProps {
  personalInfo: {
    full_name: string;
    date_of_birth: string;
    sex: string;
    email: string;
    contact_number: string;
  };
  medicalHistory: {
    smoking: boolean;
    alcohol: boolean;
    sedentary_lifestyle: boolean;
    brain_surgeries: boolean;
    medications_affecting_cognition: boolean;
    family_alzheimers: boolean;
    family_dementias: boolean;
    family_genetic_disorders: boolean;
    memory_issues: boolean;
    problem_solving_issues: boolean;
    language_issues: boolean;
    confusion: boolean;
    stroke: boolean;
    parkinsons: boolean;
    brain_injuries: boolean;
    depression_anxiety: boolean;
    bipolar_schizophrenia: boolean;
    forgetfulness: boolean;
    conversation_issues: boolean;
    losing_track: boolean;
    mood_changes: boolean;
    increased_anxiety: boolean;
    other?: string;
  };
  mri: {
    mri: File; // Ensure this is a string to store the URL
    mri_url?: string;
    scan_date: string;
    prediction?: {
      predicted_class: string;
      probability: number;
    };
  };
}

export default function Results({
  personalInfo,
  medicalHistory,
  mri,
}: ResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Results Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Card className="col-span-2 ">
          <CardHeader>
            <CardContent className="text-lg font-bold text-center">
              Prediction
            </CardContent>
          </CardHeader>
          <CardContent className="grid grid-cols-2">
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <CardDescription>Predicted Class</CardDescription>
                <CardTitle className="ml-4 text-2xl font-bold">
                  {mri.prediction?.predicted_class || "N/A"}
                </CardTitle>
              </div>
              <div>
                <CardDescription>Probability</CardDescription>
                <CardTitle className="ml-4 text-2xl font-bold">
                  {mri.prediction?.probability !== undefined
                    ? `${(mri.prediction.probability * 100).toFixed(2)}%`
                    : "N/A"}
                </CardTitle>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <CardDescription>MRI Scan</CardDescription>
                {mri.mri_url && (
                  <CldImage
                    src={mri.mri_url}
                    alt="MRI Scan"
                    width={150}
                    height={150}
                  />
                )}
              </div>
              <div>
                <CardDescription>Scan Date</CardDescription>
                <CardTitle className="text-xl">
                  {mri.scan_date || "N/A"}
                </CardTitle>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Full Name: {personalInfo.full_name}</p>
            <p>Date of Birth: {personalInfo.date_of_birth}</p>
            <p>Sex: {personalInfo.sex}</p>
            <p>Email: {personalInfo.email}</p>
            <p>Contact Number: {personalInfo.contact_number}</p>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Medical History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>History of smoking: {medicalHistory.smoking ? "Yes" : "No"}</p>
            <p>
              History of alcohol consumption:{" "}
              {medicalHistory.alcohol ? "Yes" : "No"}
            </p>
            <p>
              Sedentary lifestyle:{" "}
              {medicalHistory.sedentary_lifestyle ? "Yes" : "No"}
            </p>
            <p>
              History of brain surgeries or treatments involving anesthesia:{" "}
              {medicalHistory.brain_surgeries ? "Yes" : "No"}
            </p>
            <p>
              Current or past prescription medications affecting cognition:{" "}
              {medicalHistory.medications_affecting_cognition ? "Yes" : "No"}
            </p>
            <p>
              Family history of Alzheimer’s disease:{" "}
              {medicalHistory.family_alzheimers ? "Yes" : "No"}
            </p>
            <p>
              Family history of other dementias:{" "}
              {medicalHistory.family_dementias ? "Yes" : "No"}
            </p>
            <p>
              Family history of genetic disorders:{" "}
              {medicalHistory.family_genetic_disorders ? "Yes" : "No"}
            </p>
            <p>
              Difficulty remembering recent events:{" "}
              {medicalHistory.memory_issues ? "Yes" : "No"}
            </p>
            <p>
              Trouble with problem-solving or completing tasks:{" "}
              {medicalHistory.problem_solving_issues ? "Yes" : "No"}
            </p>
            <p>
              Difficulty with language or visual-spatial abilities:{" "}
              {medicalHistory.language_issues ? "Yes" : "No"}
            </p>
            <p>
              Confusion or disorientation:{" "}
              {medicalHistory.confusion ? "Yes" : "No"}
            </p>
            <p>
              History of stroke or transient ischemic attacks (TIA):{" "}
              {medicalHistory.stroke ? "Yes" : "No"}
            </p>
            <p>
              History of Parkinson’s disease or other movement disorders:{" "}
              {medicalHistory.parkinsons ? "Yes" : "No"}
            </p>
            <p>
              History of traumatic brain injuries:{" "}
              {medicalHistory.brain_injuries ? "Yes" : "No"}
            </p>
            <p>
              Diagnosed with depression or anxiety:{" "}
              {medicalHistory.depression_anxiety ? "Yes" : "No"}
            </p>
            <p>
              Diagnosed with bipolar disorder or schizophrenia:{" "}
              {medicalHistory.bipolar_schizophrenia ? "Yes" : "No"}
            </p>
            <p>
              Forgetfulness affecting daily activities:{" "}
              {medicalHistory.forgetfulness ? "Yes" : "No"}
            </p>
            <p>
              Trouble following conversations or instructions:{" "}
              {medicalHistory.conversation_issues ? "Yes" : "No"}
            </p>
            <p>
              Losing track of dates, names, or places:{" "}
              {medicalHistory.losing_track ? "Yes" : "No"}
            </p>
            <p>
              Mood changes (e.g., irritability, apathy, or social withdrawal):{" "}
              {medicalHistory.mood_changes ? "Yes" : "No"}
            </p>
            <p>
              Increased anxiety or paranoia:{" "}
              {medicalHistory.increased_anxiety ? "Yes" : "No"}
            </p>
            <p>Other: {medicalHistory.other || "N/A"}</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
