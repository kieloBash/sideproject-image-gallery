// pages/api/upload.js
import { NextApiRequest, NextApiResponse } from "next";
import { writeFile } from "fs/promises";
import { join } from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const file: File | null = req.body.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join("/", "tmp", file.name);
    await writeFile(path, buffer);

    return res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
