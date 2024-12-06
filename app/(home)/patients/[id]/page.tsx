import Breadcrumbs from "@/components/sub/breadcrumbdynamic";
import HeaderPage from "@/components/sub/headerpage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil } from "lucide-react";

async function getPatient(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/patients/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch patient data");
  }
  return response.json();
}

export default async function PatientPage({
  params,
}: {
  params: { id: string };
}) {
  // Await the params to ensure they are fully resolved
  const { id } = await params;

  // Fetch patient data
  const patient = await getPatient(id);

  return (
    <div>
      <HeaderPage title={`Patient Record`} />
      <Breadcrumbs current={patient.personalInfo.full_name} />
      <div className="container p-8">
        <div className="grid grid-cols-2 gap-4 mx-10">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Personal Information</CardTitle>
              <Button className="flex flex-row gap-2">
                <Pencil className="ml-auto text-sm"/>
                Edit
              </Button>
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
        </div>
      </div>
    </div>
  );
}
