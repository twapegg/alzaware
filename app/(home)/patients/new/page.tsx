import React from "react";
import AddPatient from "@/components/add-patient";
import HeaderPage from "@/components/sub/headerpage";
import Breadcrumbs from "@/components/sub/breadcrumbdynamic";

export default function page() {
  return (
    <div>
      <HeaderPage title="Add New Patient" />
      <Breadcrumbs current="Add New Patient" />
      <div className=" grid place-items-center w-full">
        <AddPatient />
      </div>
    </div>
  );
}
