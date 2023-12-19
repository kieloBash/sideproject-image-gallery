"use client";

import useFetchDropbox from "@/hooks/useDropbox";
import useFetchFirebase from "@/hooks/useFirebase";
import { storage } from "@/lib/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UploadImage() {
  const images = useFetchDropbox();
  const imageList = useFetchFirebase();

  if (images.isLoading || imageList.isLoading)
    return <div className="">Loading...</div>;

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-4xl font-bold">DROPBOX STORAGE</div>
        <div className="flex gap-8 border p-4">
          {images.thumbnails.map((image: any, index: number) => {
            return (
              <Link href={images.links[index].link} className="flex flex-col">
                <div className="font-bold text-base">{image.metadata.name}</div>
                <Image
                  key={index}
                  src={`data:image/png;base64,${image.thumbnail}`}
                  alt={image.name}
                  width={32}
                  height={32}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-4xl font-bold uppercase">firebase STORAGE</div>
        <div className="flex gap-8 border p-4">
          {imageList?.data?.map((image: any, index: number) => {
            return (
              <>
                {image.type.includes("image") ? (
                  <>
                    <Image
                      key={index}
                      src={image.url}
                      alt={image.name}
                      width={32}
                      height={32}
                    />
                  </>
                ) : image.type.includes("pdf") ? (
                  <Link href={image.url} target="_blank">
                    <div>PDF File: {image.name}</div>
                  </Link>
                ) : image.type.includes(
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  ) ? (
                  <Link href={image.url} target="_blank">
                    <div>Docx File: {image.name}</div>
                  </Link>
                ) : image.type.includes("csv") ? (
                  <Link href={image.url} target="_blank">
                    <div>Excel File: {image.name}</div>
                  </Link>
                ) : (
                  <div>Unknown File</div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
