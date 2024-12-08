import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";



interface MRIImage {
  mriUrl: string; // Match your actual data structure (camelCase)
}

export function MRICarousel({ mriData }: { mriData: MRIImage[] }) {
  // Extract MRI URLs from the mriData array
  const mriUrls = mriData.map((mri) => mri.mriUrl);

  console.log(mriUrls);

  // Render a loading state if no images are available
  if (mriUrls.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Carousel className="w-full">
      <CarouselContent className="">
        {mriUrls.map((url, index) => (
          <CarouselItem key={index} className="">
            <div className="flex items-center justify-center">
              <Image
                src={url}
                alt={`MRI Image ${index + 1}`}
                width={300}
                height={300}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="default" />
      <CarouselNext variant="default" />
    </Carousel>
  );
}
