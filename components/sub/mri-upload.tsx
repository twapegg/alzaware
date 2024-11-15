"use client";

import React from "react";
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
  // mri is an image file
  mri: z.string({
    required_error: "MRI scan is required",
  }),
  scan_date: z.date({
    required_error: "Scan date is required",
  }),
  notes: z.string(),
});

export default function MRIUpload() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                        <Input id="mri" type="file" {...field} />
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
                                format(field.value, "PPP")
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
                            selected={field.value}
                            onSelect={field.onChange}
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
}
