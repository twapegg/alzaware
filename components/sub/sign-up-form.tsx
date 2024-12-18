"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; // Import useRouter

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
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

// Define the form schema
const formSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email(),
  password: z
    .string({
      message: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(100),
  first_name: z
    .string({
      message: "First name is required",
    })
    .min(2, {
      message: "First name must be at least 2 characters",
    })
    .max(50),
  last_name: z
    .string({
      message: "Last name is required",
    })
    .min(2, {
      message: "Last name must be at least 2 characters",
    })
    .max(50),
});

export default function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter(); // Initialize useRouter
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json(); // Parse the response JSON

      if (!response.ok) {
        // Display specific error message from the response
        toast({
          title: "Uh oh! Something went wrong.",
          description: data.message || "An unknown error occurred.",
          variant: "destructive",
        });
        return; // Exit the function early on error
      }

      toast({
        title: "Success!",
        description: "Account created successfully."
      });

      router.push("/auth/login"); // Route to /login
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold">Create an account</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="min-w-80 flex flex-col rounded-3xl py-8 gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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

          <Button type="submit" className="font-bold bg-brand">
            Create account
          </Button>

          <Separator className="mt-4" />

          <span className="text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-brand font-bold underline">
              Login
            </Link>
          </span>
        </form>
      </Form>
    </div>
  );
}
