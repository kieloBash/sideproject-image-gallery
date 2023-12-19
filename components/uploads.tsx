"use client";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import useFetchDropbox from "@/hooks/useDropbox";
import FirebaseUpload from "./firebase-upload";

const Upload = () => {
  const [uploadingImage, setUploadImage] = useState<File | null>();
  const images = useFetchDropbox();

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
      setUploadImage(null);
    },
  });

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setUploadImage(file);
    }
  };

  return (
    <div className="flex gap-2 flex-col">
      <input type="file" onChange={handleFileChange} className="border p-2" />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => uploadImageMutation.mutate()}
          className="border rounded-md px-4 py-2 bg-blue-200 w-full"
        >
          submit to dropbox
        </button>
        <FirebaseUpload image={uploadingImage} />
      </div>
    </div>
  );
};

export default Upload;
