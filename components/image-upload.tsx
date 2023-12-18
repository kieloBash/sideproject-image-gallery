"use client";

import useFetchDropbox from "@/hooks/useDropbox";
import Image from "next/image";
import Link from "next/link";

export default function UploadImage() {
  const images = useFetchDropbox();

  if (images.isLoading) return <div className="">Loading...</div>;

  return (
    <div className="flex flex-col gap-2">
      {images.thumbnails.map((image: any, index: number) => {
        return (
          <Link href={images.links[index].link} className="flex flex-col">
            <div className="font-bold text-2xl">{image.metadata.name}</div>
            <Image
              key={index}
              src={`data:image/png;base64,${image.thumbnail}`}
              alt={image.name}
              width={64}
              height={64}
            />
          </Link>
        );
      })}
    </div>
  );
}
