"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

export default function RadiologistHomePage() {
  const [imageUrl, setImageUrl] = useState("");
  const [response, setResponse] = useState<object | null>(null);

  // In your component
  const getPrediction = async () => {
    const response = await fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await response.json();
    setResponse(data);
  };

  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Insert MRI Scan</Label>
        <Input
          id="picture"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          onClick={getPrediction}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
      <div>
        {response ? <pre>{JSON.stringify(response, null, 2)}</pre> : null}
      </div>
    </div>
  );
}
