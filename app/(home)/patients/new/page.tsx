import React from "react";
import AddPatient from "@/components/add-patient";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Link from "next/link";
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
