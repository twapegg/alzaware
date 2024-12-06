import React, { forwardRef, useImperativeHandle } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  full_name: z.string({
    required_error: "Full name is required",
  }),
  date_of_birth: z.string().refine((date) => /^\d{4}-\d{2}-\d{2}$/.test(date), {
    message: "Date of birth must be in the format YYYY-MM-DD",
  }),
  sex: z.enum(["M", "F"], {
    required_error: "Sex is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  contact_number: z.string({
    required_error: "Contact number is required",
  }),
});

interface PersonalInfoProps {
  defaultValues: z.infer<typeof formSchema>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const PersonalInfo = forwardRef((props: PersonalInfoProps, ref) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props.defaultValues,
  });

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      form.handleSubmit(props.onSubmit)();
    },
  }));

  function onSubmit(values: z.infer<typeof formSchema>) {
    props.onSubmit(values);
  }

  return (
    <CardContent>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Fill in patient information here. All * fields are required.
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-6 gap-4 justify-center items-center">
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Juan Dela Cruz" {...field} />
                      </FormControl>
                      <div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input placeholder="juandelacruz@mail.com" {...field} />
                      </FormControl>
                      <div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth*</FormLabel>
                      <FormControl>
                        <Input placeholder="YYYY-MM-DD" {...field} />
                      </FormControl>
                      <div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="contact_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="09123456789" {...field} />
                      </FormControl>
                      <div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Sex*</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="M" />
                            </FormControl>
                            <FormLabel className="font-normal">Male</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="F" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Female
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <div>
                        <FormMessage />
                      </div>
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

export default PersonalInfo;
