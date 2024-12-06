import React from "react";
import { Separator } from "../ui/separator";

interface HeaderPageProps {
  title: string;
}

export default function HeaderPage({ title }: HeaderPageProps) {
  title = title.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div>
      <div className="px-8 py-4">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
      <Separator />
    </div>
  );
}
