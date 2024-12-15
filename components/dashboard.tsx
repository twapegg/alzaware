"use client";

import { Button } from "./ui/button";
import { ClassBreakdownChart } from "./sub/classification-breakdown-chart";
import { RecentAnalysis } from "./sub/recent-analysis";
import SharedScans from "./sub/shared-scans";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [userName, setUserName] = useState("");

  // useEffect to get the user's name from the server-side route
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch("/api/auth/verify-token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const userProfile = await response.json();
          setUserName(userProfile.first_name + " " + userProfile.last_name);
        } else {
          console.error("Error verifying token:", await response.json());
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-2xl">Welcome back, {userName || "Guest"}</h1>
          <p className="text-gray-500">
            Let's make today efficient and patient-friendly.
          </p>
        </div>
        <Button asChild className="bg-brand text-white font-bold">
          <Link href="/patients/new">Upload New Scan</Link>
        </Button>
      </div>
      <div className="grid w-full grid-cols-1 lg:grid-cols-8 grid-rows-1 gap-4 pb-12 lg:pb-4">
        <div className="col-span-1 lg:col-span-6">
          <RecentAnalysis />
        </div>
        <div className="col-span-1 lg:col-span-2 row-span-2 bg-white rounded-lg">
          <SharedScans />
        </div>
        <div className="col-span-1 lg:col-span-6">
          <ClassBreakdownChart />
        </div>
      </div>
    </div>
  );
}
