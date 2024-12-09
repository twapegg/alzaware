import React from "react";
import Dashboard from "@/components/dashboard";
import HeaderPage from "@/components/sub/headerpage";

const page = () => {
  return (
    <div>
      <HeaderPage title="Dashboard" />
      <div className="py-8 px-10">
        <Dashboard />
      </div>
    </div>
  );
};

export default page;
