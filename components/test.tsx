"use client";

import { useState, useRef } from "react";
import { Card } from "./ui/card";
import { z } from "zod";

import PersonalInfo from "./sub/personal-info";
import MRIUpload from "./sub/mri-upload";
import MedicalHistory from "./sub/medical-history";
import Results from "./sub/results";

import { Button } from "./ui/button";

const personalInfoSchema = z.object({
  full_name: z.string(),
  date_of_birth: z.string(),
  sex: z.enum(["M", "F"]),
  email: z.string().email(),
  contact_number: z.string(),
});

const medicalHistorySchema = z.object({
  diabetes: z.boolean(),
  hypertension: z.boolean(),
  heart_disease: z.boolean(),
  asthma: z.boolean(),
  cancer: z.boolean(),
  kidney_disease: z.boolean(),
});

const mriSchema = z.object({
  mri: z.instanceof(File),
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

export default function testss() {
  const [phase, setPhase] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>({
    full_name: "",
    date_of_birth: "",
    sex: "M",
    email: "",
    contact_number: "",
  });
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryType>({
    diabetes: false,
    hypertension: false,
    heart_disease: false,
    asthma: false,
    cancer: false,
    kidney_disease: false,
  });
  const [mri, setMRI] = useState<MRIType>({
    mri: new File([], ""),
    scan_date: "",
    prediction: undefined,
  });
  const [model, setModel] = useState({});
  const [result, setResult] = useState({});

  const personalInfoRef = useRef<{ submitForm: () => void } | null>(null);
  const medicalHistoryRef = useRef<{ submitForm: () => void } | null>(null);
  const mriUploadRef = useRef<{ submitForm: () => void } | null>(null);

  const handleNext = () => {
    if (phase === 1) {
      personalInfoRef.current?.submitForm();
    } else if (phase === 2) {
      medicalHistoryRef.current?.submitForm();
    } else if (phase === 3) {
      mriUploadRef.current?.submitForm();
    } else {
      setPhase(phase + 1);
    }
  };

  const handleBack = () => {
    setPhase(phase - 1);
  };

  const handleFormSubmit = (data: any) => {
    if (phase === 1) {
      setPersonalInfo(data);
    } else if (phase === 2) {
      setMedicalHistory(data);
    } else if (phase === 3) {
      setMRI(data);
    }
    setPhase(phase + 1);
  };

  return (
    <div className="w-[60%] mt-24">
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
            mri={mri}
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
      </div>
    </div>
  );
}
