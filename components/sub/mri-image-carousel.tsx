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

  // Render a loading state if no images are available
  if (mriUrls.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {mriUrls.map((url, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    src={url}
                    alt={`MRI Image ${index + 1}`}
                    width={300}
                    height={300}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
