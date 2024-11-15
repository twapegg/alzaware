"use client";

import { Button } from "./ui/button";
import { ClassBreakdownChart } from "./sub/classification-breakdown-chart";
import { RecentAnalysis } from "./sub/recent-analysis";
import { MonthlyAnalysisChart } from "./sub/monthly-analysis-chart";
import SharedScans from "./sub/shared-scans";

export default function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <div>
          <h1 className="text-2xl">Welcome back, John Doe</h1>
          <p className="text-gray-500">
            Let's make today efficient and patient-friendly.
          </p>
        </div>
        <Button className="bg-blue-500 text-white">New Patient</Button>
      </div>
      <div className="grid w-full h-full grid-cols-8 gap-4">
        <div className="flex flex-col gap-4 col-span-6 bg-white rounded-lg">
          <div className="grid grid-cols-3 gap-4 h-full">
            <div className="col-span-2">
              <RecentAnalysis />
            </div>
            <div className="col-span-1">
              <ClassBreakdownChart />
            </div>
          </div>
          <MonthlyAnalysisChart />
        </div>
        <div className="col-span-2 bg-white rounded-lg">
          <SharedScans />
        </div>
      </div>
    </div>
  );
}
