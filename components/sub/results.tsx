import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import MRIModal from "./mri-image-modal";

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

const formatFieldName = (field: string) =>
  field.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

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
          <CardHeader className="text-lg font-bold text-center">
            Prediction
          </CardHeader>
          <CardContent className="grid grid-cols-2">
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <CardDescription>Predicted Class</CardDescription>
                <CardTitle className="text-2xl font-bold">
                  {mri.prediction?.predicted_class || "N/A"}
                </CardTitle>
              </div>
              <div className="text-center">
                <CardDescription>Probability</CardDescription>
                <CardTitle className="text-2xl font-bold">
                  {mri.prediction?.probability !== undefined
                    ? `${(mri.prediction.probability * 100).toFixed(2)}%`
                    : "N/A"}
                </CardTitle>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <CardDescription>MRI Scan</CardDescription>
                {mri.mri_url && <MRIModal mri_url={mri.mri_url} />}
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
          <CardContent className="grid grid-cols-2 space-y-2">
            <div>
              <CardDescription>Full Name</CardDescription>
              <span> {personalInfo.full_name}</span>
            </div>
            <div>
              <CardDescription>Contact Number</CardDescription>
              <span> {personalInfo.contact_number}</span>
            </div>
            <div>
              <CardDescription>Email Address</CardDescription>
              <span> {personalInfo.email}</span>
            </div>
            <div>
              <CardDescription>Sex</CardDescription>
              <span> {personalInfo.sex}</span>
            </div>
            <div>
              <CardDescription>Date of Birth</CardDescription>
              <span> {personalInfo.date_of_birth}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Medical History
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            {Object.entries(categories).map(([category, fields]) => (
              <div key={category}>
                <CardDescription>{category}</CardDescription>
                <ul>
                  {fields.map((field) => {
                    const value =
                      medicalHistory[field as keyof typeof medicalHistory];
                    if (typeof value === "boolean") {
                      return (
                        <li key={field}>
                          {value ? "✅" : "❌"} {formatFieldName(field)}
                        </li>
                      );
                    }

                    if (field === "other" && value === "") {
                      return <li key={field}>N/A</li>;
                    }

                    // Display non-empty string fields
                    if (typeof value === "string" && value !== "") {
                      return (
                        <li key={field}>
                          {formatFieldName(field)}: {value}
                        </li>
                      );
                    }
                    return null; // Hide fields with false/empty values
                  })}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
