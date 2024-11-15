"use client";

import { useState } from "react";
import { Card } from "./ui/card";

import PersonalInfo from "./sub/personal-info";
import MRIUpload from "./sub/mri-upload";

import { Button } from "./ui/button";
import MedicalHistory from "./sub/medical-history";

export default function testss() {
  const [phase, setPhase] = useState(1);
  const [personalInfo, setPersonalInfo] = useState({});
  const [mri, setMRI] = useState({});
  const [model, setModel] = useState({});
  const [result, setResult] = useState({});

  const handleNext = () => {
    setPhase(phase + 1);
  };

  const handleBack = () => {
    setPhase(phase - 1);
  };

  const handlePersonalInfo = (data: any) => {
    setPersonalInfo(data);
  };

  const handleMRI = (data: any) => {
    setMRI(data);
  };

  const handleModel = (data: any) => {
    setModel(data);
  };

  const handleResult = (data: any) => {
    setResult(data);
  };

  return (
    <div className="w-[60%]">
      <Card>
        {phase === 1 && <PersonalInfo />}
        {phase === 2 && <MedicalHistory />}
        {phase === 3 && <MRIUpload />}
      </Card>
      <div className="flex items-center justify-center m-4 gap-4">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}

// four phases using conditional rendering:
// 1. personal information
// 2. MRI upload
// 3. model analysis
// 4. result
