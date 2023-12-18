"use client";

import useFetchDropbox from "@/hooks/useDropbox";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function UploadImage() {
  const images = useFetchDropbox();
  const [uploadingImage, setUploadImage] = useState<File>();
  console.log(images);

  const uploadImage = async (): Promise<any> => {
    if (!uploadingImage) return null;

    const formData = new FormData();
    formData.append("image", uploadingImage, uploadingImage.name);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json()) // Assuming the response is a JSON object
      .catch((error: any) => console.log(error));

    return response; // Return the response
  };

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,

    onSuccess: () => {
      images.refetch();
    },
  });

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setUploadImage(file);
    }
  };

  if (images.isLoading || images.isFetching)
    return <div className="">Loading...</div>;
  return (
    <>
      <div className="flex gap-8 border p-10">
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
      <div>
        <input type="file" onChange={handleFileChange} />
        <button type="button" onClick={() => uploadImageMutation.mutate()}>
          submit
        </button>
      </div>
    </>
  );
}
