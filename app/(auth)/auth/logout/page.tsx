"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const { toast } = useToast();

  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: data.message || "An unknown error occurred.",
          variant: "destructive",
        });
      }

      toast({
        title: "Logged out successfully.",
        description: "You have been logged out.",
      });

      router.push("/auth/login");
    };

    logout();
  }, []);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}
