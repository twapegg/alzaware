"use client";
import React, { useState, useEffect } from "react";
import Dashboard from "@/components/dashboard";
import HeaderPage from "@/components/sub/headerpage";
import LoadingSpinner from "@/components/ui/loading-spinner";

const page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <HeaderPage title="Dashboard" />
      <div className="py-8 px-6 lg:px-10">
        {isLoading ? <LoadingSpinner /> : <Dashboard />}
      </div>
    </div>
  );
};

export default page;
