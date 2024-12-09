import Breadcrumbs from "@/components/sub/breadcrumbdynamic";
import HeaderPage from "@/components/sub/headerpage";
import MRIModal from "@/components/sub/mri-image-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { headers } from "next/headers";

type paramsType = Promise<{ id: string }>; // Add Promise to the type

async function getPatient(id: string) {
  const resolvedHeaders = await headers(); // Await to resolve headers
  const host = resolvedHeaders.get("host"); // Now you can access 'get'
  const protocol = host?.startsWith("localhost") ? "http" : "https"; // Infer protocol
  const response = await fetch(`${protocol}://${host}/api/patients/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch patient data");
  }

  const patient = await response.json();
  console.log(patient);

  return patient;
}

export default async function PatientPage(props: { params: paramsType }) {
  // Await the params to ensure they are fully resolved
  const { id } = await props.params;

  // Fetch patient data
  const patient = await getPatient(id);

  const mriData = patient.mriData[0];

  // Categories for medical history
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

  return (
    <div>
      <HeaderPage title={`Patient Record`} />
      <Breadcrumbs current={patient.personalInfo.full_name} />
      <div className="p-8 px-32 w-full">
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3">
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
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
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>MRI & Diagnosis Prediction</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 ">
              <div className="flex flex-col gap-4">
                <CardDescription>MRI Scan</CardDescription>
                <div className="flex ">
                  <MRIModal mri_url={mriData.mriUrl} />
                </div>
              </div>
              <div className="space-y-4">
                <CardDescription>Diagnosis</CardDescription>
                <span>{mriData.prediction?.predicted_class || "N/A"}</span>
                <CardDescription>Confidence Level</CardDescription>
                <span>
                  {mriData.prediction?.probability !== undefined
                    ? `${(mriData.prediction.probability * 100).toFixed(2)}%`
                    : "N/A"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
