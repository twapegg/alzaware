"use client"

import HeaderPage from "@/components/sub/headerpage";
import { Patient, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";


export default  function Page() {
  const [data, setData] = useState<Patient[]>([]);

  useEffect(() => {
    fetch("/api/patients")
      .then((res) => res.json())
      .then((data) => setData(data.patients));
  }, []);

  return (
    <div>
      <HeaderPage title="Patient Records" />
      <div className="container p-8">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
