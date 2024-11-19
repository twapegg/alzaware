"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  mri: z.instanceof(File).refine((file) => file.size > 0, {
    message: "MRI scan is required",
  }),
  scan_date: z.string({
    required_error: "Scan date is required",
  }),
  notes: z.string().optional(),
});

interface MRIUploadProps {
  defaultValues: {
    mri?: File;
    scan_date?: string;
    notes?: string;
  };
  onSubmit: (values: any) => void;
}

const MRIUpload = forwardRef((props: MRIUploadProps, ref) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props.defaultValues,
  });

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      form.handleSubmit(onSubmit)();
    },
  }));

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("mri", values.mri);
    formData.append("scan_date", values.scan_date);
    formData.append("notes", values.notes || "");

    const response = await fetch("/api/patients/new", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      const predictResponse = await fetch("/api/predict", {
        method: "POST",
        body: JSON.stringify({ imageUrl: result.url }),
      });

      const predictResult = await predictResponse.json();
      if (predictResponse.ok) {
        props.onSubmit({ ...values, mri: result.url, prediction: predictResult.message });
      } else {
        console.error("Failed to get prediction:", predictResult.message);
      }
    } else {
      console.error("Failed to upload MRI scan:", result.error);
    }
  }

  return (
    <CardContent>
      <CardHeader>
        <CardTitle>Upload MRI Scan</CardTitle>
        <CardDescription>
          Please upload your MRI scan here as well as any other relevant
          details.
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-7 gap-4 justify-center items-center">
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="mri"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="mri">MRI Scan</FormLabel>
                      <FormControl>
                        <Input
                          id="mri"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="scan_date"
                  render={({ field }) => (
                    <FormItem className="mt-2 flex flex-col justify-center w-full">
                      <FormLabel>Date of Scan</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date?.toISOString() || "")}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </CardContent>
  );
});

export default MRIUpload;
