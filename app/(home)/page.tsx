import React from "react";
import Dashboard from "@/components/dashboard";
import HeaderPage from "@/components/sub/headerpage";

const page = () => {
  return (
    <div>
      <HeaderPage title="Dashboard" />
      <div className="container p-8">
        <Dashboard />
      </div>
    </div>
  );
};

export default page;
