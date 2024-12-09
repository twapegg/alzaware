"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown, Share } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import SharePatient from "@/components/sub/share-patient";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Patient = {
  id: string;
  personalInfo: {
    full_name: string;
    contact_number: string;
    date_of_birth: string;
    email: string;
    sex: string;
  };

  medicalHistory: {
    alcohol: boolean;
    bipolar_schizophrenia: boolean;
    brain_injuries: boolean;
    brain_surgeries: boolean;
    confusion: boolean;
    conversation_issues: boolean;
    depression_anxiety: boolean;
    family_alzheimers: boolean;
    family_dementias: boolean;
    family_genetic_disorders: boolean;
    forgetfulness: boolean;
    increased_anxiety: boolean;
    language_issues: boolean;
    losing_track: boolean;
    medications_affecting_cognition: boolean;
    memory_issues: boolean;
    mood_changes: boolean;
    other: "";
    parkinsons: boolean;
    problem_solving_issues: boolean;
    sedentary_lifestyle: boolean;
    smoking: true;
    stroke: boolean;
  };
  mriData: [
    {
      mriId: string;
      scanDate: string;
      prediction: {
        predicted_class: string;
        probability: number;
      };
    }
  ];
};

export const columns: ColumnDef<Patient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "personalInfo.full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "last_scan_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Scan Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const mriData = row.original.mriData;

      if (!mriData) {
        return "No Scan Data";
      }

      // Sort MRI data by scan date and get the latest
      const latestMRI = [...mriData].sort((a, b) => {
        const dateA = new Date(a.scanDate);
        const dateB = new Date(b.scanDate);
        return dateB.getTime() - dateA.getTime();
      })[0];

      return latestMRI?.scanDate || "No Date";
    },
  },
  {
    accessorKey: "diagnosis",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Diagnosis
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const mriData = row.original.mriData;

      if (!mriData) {
        return "No Diagnosis Data";
      }

      // Sort MRI data by scan date and get the latest
      const latestMRI = [...mriData].sort((a, b) => {
        const dateA = new Date(a.scanDate);
        const dateB = new Date(b.scanDate);
        return dateB.getTime() - dateA.getTime();
      })[0];

      return latestMRI?.prediction?.predicted_class || "No Diagnosis";
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/patients/${id}`}>View patient details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SharePatient patientID={id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
