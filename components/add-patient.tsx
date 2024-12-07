"use client";

import { useState, useRef } from "react";
import { Card } from "./ui/card";
import { z } from "zod";

import Spinner from "./ui/spinner";
import PersonalInfo from "./sub/personal-info";
import MRIUpload from "./sub/mri-upload";
import MedicalHistory from "./sub/medical-history";
import Results from "./sub/results";
import { useRouter } from "next/navigation"; // Import useRouter


import { Button } from "./ui/button";

const personalInfoSchema = z.object({
  full_name: z.string(),
  date_of_birth: z.string().refine((date) => /^\d{4}-\d{2}-\d{2}$/.test(date), {
    message: "Date of birth must be in the format YYYY-MM-DD",
  }),
  sex: z.enum(["M", "F"]),
  email: z.string().email(),
  contact_number: z.string(),
});

const medicalHistorySchema = z.object({
  smoking: z.boolean(),
  alcohol: z.boolean(),
  sedentary_lifestyle: z.boolean(),
  brain_surgeries: z.boolean(),
  medications_affecting_cognition: z.boolean(),
  family_alzheimers: z.boolean(),
  family_dementias: z.boolean(),
  family_genetic_disorders: z.boolean(),
  memory_issues: z.boolean(),
  problem_solving_issues: z.boolean(),
  language_issues: z.boolean(),
  confusion: z.boolean(),
  stroke: z.boolean(),
  parkinsons: z.boolean(),
  brain_injuries: z.boolean(),
  depression_anxiety: z.boolean(),
  bipolar_schizophrenia: z.boolean(),
  forgetfulness: z.boolean(),
  conversation_issues: z.boolean(),
  losing_track: z.boolean(),
  mood_changes: z.boolean(),
  increased_anxiety: z.boolean(),
  other: z.string().optional(),
});

const mriSchema = z.object({
  mri: z.instanceof(File),
  mri_url: z.string().optional(),
  scan_date: z.string(),
  prediction: z
    .object({
      predicted_class: z.string(),
      probability: z.number(),
    })
    .optional(),
});

type PersonalInfoType = z.infer<typeof personalInfoSchema>;
type MedicalHistoryType = z.infer<typeof medicalHistorySchema>;
type MRIType = z.infer<typeof mriSchema>;

export default function AddPatient() {
  const [phase, setPhase] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>({
    full_name: "",
    date_of_birth: "",
    sex: "M",
    email: "",
    contact_number: "",
  });
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryType>({
    smoking: false,
    alcohol: false,
    sedentary_lifestyle: false,
    brain_surgeries: false,
    medications_affecting_cognition: false,
    family_alzheimers: false,
    family_dementias: false,
    family_genetic_disorders: false,
    memory_issues: false,
    problem_solving_issues: false,
    language_issues: false,
    confusion: false,
    stroke: false,
    parkinsons: false,
    brain_injuries: false,
    depression_anxiety: false,
    bipolar_schizophrenia: false,
    forgetfulness: false,
    conversation_issues: false,
    losing_track: false,
    mood_changes: false,
    increased_anxiety: false,
    other: "",
  });
  const [mri, setMRI] = useState<MRIType>({
    mri: new File([], ""),
    mri_url: "",
    scan_date: "",
    prediction: undefined,
  });

  const router = useRouter(); // Initialize useRouter

  const personalInfoRef = useRef<{ submitForm: () => void } | null>(null);
  const medicalHistoryRef = useRef<{ submitForm: () => void } | null>(null);
  const mriUploadRef = useRef<{ submitForm: () => void } | null>(null);

  const handleNext = () => {
    if (phase === 1) {
      personalInfoRef.current?.submitForm();
    } else if (phase === 2) {
      medicalHistoryRef.current?.submitForm();
    } else if (phase === 3) {
      setLoading(true); // Set loading to true before submitting
      mriUploadRef.current?.submitForm();
    } else if (phase === 4) {
      handleFormSubmit(mri); // Submit the data to the API
    } else {
      setPhase(phase + 1);
    }
  };

  const handleBack = () => {
    setPhase(phase - 1);
  };

  const handleFormSubmit = async (data: any) => {
    if (phase === 1) {
      setPersonalInfo(data);
    } else if (phase === 2) {
      setMedicalHistory(data);
    } else if (phase === 3) {
      setMRI(data);
      setLoading(false);
    }
    setPhase((prevPhase) => prevPhase + 1); // Advance to next phase
  };

  const handleAddPatient = async () => {
    try {
      const patientData = {
        personalInfo,
        medicalHistory,
        mriData: mri,
      };

      console.log(patientData);

      const response = await fetch("/api/patients/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) throw new Error("Failed to create patient");

      const result = await response.json();

      // Redirect to patient page
      router.push(`/patients/${result.patientId}`);
    } catch (error) {
      console.error("Error during patient creation:", error);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Spinner />
  //     </div>
  //   );
  // }

  return (
    <div className="w-[70%] my-12">
      <Card>
        {phase === 1 && (
          <PersonalInfo
            ref={personalInfoRef}
            onSubmit={handleFormSubmit}
            defaultValues={personalInfo}
          />
        )}
        {phase === 2 && (
          <MedicalHistory
            ref={medicalHistoryRef}
            onSubmit={handleFormSubmit}
            defaultValues={medicalHistory}
          />
        )}
        {phase === 3 && (
          <MRIUpload
            ref={mriUploadRef}
            onSubmit={handleFormSubmit}
            defaultValues={mri}
          />
        )}
        {phase === 4 && (
          <Results
            personalInfo={personalInfo}
            medicalHistory={medicalHistory}
            mri={mri} // Pass updated MRI state with prediction
          />
        )}
      </Card>
      <div className="flex items-center justify-center m-4 gap-4">
        {phase > 1 && (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        )}
        {phase < 4 && <Button onClick={handleNext}>Next</Button>}
        {phase === 4 && (
          <Button onClick={handleAddPatient}>Confirm and Add Patient</Button>
        )}
      </div>
    </div>
  );
}
