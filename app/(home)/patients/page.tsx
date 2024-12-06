"use server";
import HeaderPage from "@/components/sub/headerpage";
import { Patient, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Patient[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/patients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Optional here, for outgoing request
    },
  });

  const data = await response.json();

  return data.patients;
}

export default async function Page() {
  const data = await getData();

  return (
    <div>
      <HeaderPage title="Patient Records" />
      <div className="container p-8">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
