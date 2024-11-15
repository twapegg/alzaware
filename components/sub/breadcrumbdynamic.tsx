"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import React from "react";

const Breadcrumbs = ({ children, current }: any) => {
  // Get current path
  const currentPath = usePathname();

  // Split path into parts
  const parts = currentPath.split("/").filter((part) => part !== "");

  // Create breadcrumb items
  const items = parts.map((part, index) => {
    const url = "/" + parts.slice(0, index + 1).join("/");
    const name = part.charAt(0).toUpperCase() + part.slice(1);
    return { name, link: url };
  });

  // Remove last item from breadcrumb
  items.pop();

  // Add home to breadcrumb
  items.unshift({ name: "Home", link: "/" });

  return (
    <>
      <Breadcrumb className="px-8 py-4">
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={item.link}>{item.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>{current}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator />
    </>
  );
};

export default Breadcrumbs;
