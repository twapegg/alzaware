"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; // Import useRouter
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Define the form schema
const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function SignInForm() {
  const router = useRouter(); // Initialize useRouter
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      });
      router.push("/"); // Redirect to home page
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="p-6 border-black w-auto">
      <div className="flex flex-col gap-2 pb-6">
        <CardTitle>Log in</CardTitle>
        <CardDescription>Log in to your account.</CardDescription>
        <Separator className="bg-black" />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="bg-black" />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Card>
  );
}