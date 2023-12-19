"use client";
import useFetchFirebase from "@/hooks/useFirebase";
import { storage } from "@/lib/firebase";
import { useMutation } from "@tanstack/react-query";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { v4 } from "uuid";

const FirebaseUpload = ({ image }: { image: File | null | undefined }) => {
  const [uploading, setUploading] = useState(false);
  const imageList = useFetchFirebase();
  const uploadImage = async () => {
    if (!image) return null;
    setUploading(true);
    const storageRef = ref(storage, `materials/${image.name + v4()}`);
    const snapshot = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (res) => {
      imageList.refetch();
      setUploading(false);
    },
  });

  return (
    <button
      type="button"
      disabled={!image || uploading}
      onClick={() => uploadImageMutation.mutate()}
      className="border rounded-md px-4 py-2 bg-red-200 w-full"
    >
      {uploading ? <span>Loading...</span> : <span>submit to firebase</span>}
    </button>
  );
};

export default FirebaseUpload;
