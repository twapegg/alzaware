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
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import { useToast } from "@/hooks/use-toast";

// Define the form schema
const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function SignInForm() {
  const { toast } = useToast();
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
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });

      router.push("/"); // Redirect to home page
    } catch (error) {
      // Handle network errors or unexpected issues
      console.error(error);
      toast({
        title: "Error",
        description: "Unable to connect to the server. Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold">Welcome back</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="min-w-80 flex flex-col rounded-3xl py-8 gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
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
                  <Input
                    placeholder="Enter password"
                    type="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="font-bold bg-brand">
            Login
          </Button>

          <Separator className="mt-4" />

          <span className="text-sm">
            Don't have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-brand font-bold underline"
            >
              Sign up
            </Link>
          </span>
        </form>
      </Form>
    </div>
  );
}
