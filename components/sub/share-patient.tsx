"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SharePatientProps {
  patientID: string;
}

interface Patient {
  id: string;
  personalInfo: {
    full_name: string;
  };
  sharedTo: string[];
}

export default function SharePatient({ patientID }: SharePatientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState([]);

  const [patient, setPatient] = useState<Patient | null>(null);

  const fetchPatient = () => {
    fetch(`/api/patients/${patientID}`)
      .then((res) => res.json())
      .then((data) => setPatient(data));
  };

  useEffect(() => {
    fetchPatient();
    console.log(doctors);
  }, []);

  useEffect(() => {
    // Fetch doctors from the server
    fetch(`/api/doctors/search?name=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => setDoctors(data));

    console.log(doctors);
  }, [searchQuery]);

  const sharePatient = (doctorID: string) => {
    fetch(`/api/patients/${patientID}/share`, {
      method: "PATCH",
      body: JSON.stringify({ doctorID }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchPatient();
        console.log(data);
      });
  };

  // Get current doctors shared with the patient
  const sharedDoctors = patient?.sharedTo || [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>Share patient</span>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Share patient</DialogTitle>
          <DialogDescription>
            Share patient with other doctors.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Filter doctors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor: any) => {
              // Check if the doctor is already in the sharedDoctors array
              const isDoctorShared = sharedDoctors.some(
                (shared: any) => shared.to === doctor.id
              );

              return (
                <TableRow key={doctor.id}>
                  <TableCell>
                    {doctor.first_name} {doctor.last_name}
                  </TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => sharePatient(doctor.id)}
                      disabled={isDoctorShared}
                    >
                      {isDoctorShared ? "Already Shared" : "Share"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
