import { dbx } from "@/lib/dropbox";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  console.log(formData);
  const file = formData.get("image") as File | null;
  console.log(file);

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  // const filesUploadArg = {
  //   path: `/${file.name}`,
  //   contents: file,
  // };

  // Create a File object from a Blob
  const temp = new File([file], file.name, { type: "image/png" });

  // Create a filesUploadArg object
  const arg = {
    path: `/${temp.name}`,
    contents: temp,
  };

  const response = await dbx.filesUpload(arg).catch(function (error) {
    console.log(error);
  });

  return NextResponse.json(response);
  // ... rest of your code
}
