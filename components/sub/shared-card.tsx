import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";

interface SharedCardProps {
  patientID: string;
  patientName: string;
  sender: string;
  scan: string;
}

export default function SharedCard({
  patientID,
  patientName,
  sender,
  scan,
}: SharedCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardDescription>Shared by</CardDescription>
            <CardTitle>{sender}</CardTitle>
          </div>
          <div className="flex">
            <Button
              variant="outline"
              onClick={() => {}}
              color="green"
              className=""
            >
              View Scan
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <CardDescription>Patient ID #{patientID}</CardDescription>
            <h2 className="text-lg font-semibold">{patientName}</h2>
          </div>
          <div>
            <CardDescription>Scan Date:</CardDescription>
            <CardDescription className="text-black">{scan}</CardDescription>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {/* accept and delete */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => {}}
            className="mt-2 bg-success"
          >
            Accept
          </Button>
          <Button
            variant="outline"
            onClick={() => {}}
            color="red"
            className="mt-2 bg-error"
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
