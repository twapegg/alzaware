"use server";
import HeaderPage from "@/components/sub/headerpage";
import { Patient, columns } from "./columns";
import { DataTable } from "./data-table";
import { headers } from "next/headers";

async function getData(): Promise<Patient[]> {
  const resolvedHeaders = await headers(); // Await to resolve headers
  const host = resolvedHeaders.get("host"); // Now you can access 'get'
  const protocol = host?.startsWith("localhost") ? "http" : "https"; // Infer protocol

  const cookieHeader = resolvedHeaders.get("cookie"); // Pass cookies explicitly

  const response = await fetch(`${protocol}://${host}/api/patients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader || "", // Include cookies from headers
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
