import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your account.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
