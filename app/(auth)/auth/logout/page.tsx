"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      router.push("/auth/login");
    };

    logout();
  }, []);

  return () => null;
}
