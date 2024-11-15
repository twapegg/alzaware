import HeaderPage from "@/components/sub/headerpage";
import { Patient, columns } from "./columns";
import { DataTable } from "./data-table";
import dummy from "./dummy.js";

async function getData(): Promise<Patient[]> {
  // Fetch data from your API here.
  return dummy;
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
