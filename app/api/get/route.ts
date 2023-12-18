import { dbx } from "@/lib/dropbox";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const result = await init();
  return NextResponse.json(result);
}
const init = async () => {
  const result = await dbx
    .filesListFolder({
      path: "",
      limit: 20,
    })
    .then((res) => {
      const updatedFiles = updateFiles(res.result.entries);
      return updatedFiles;
    });

  return result;
};

const updateFiles = async (files: any[]) => {
  const thumbnails = await getThumbnails(files);
  const links = await getDownloadableLinks(files);
  return { thumbnails, links };
};

const getDownloadableLinks = async (files: any[]) => {
  const images = await Promise.all(
    files.map(async function (file: any) {
      if (file.name.endsWith(".jpg") || file.name.endsWith(".png")) {
        const linkResponse = await dbx.filesGetTemporaryLink({
          path: file.path_lower,
        });
        const obj = {
          name: linkResponse.result.metadata.name,
          link: linkResponse.result.link,
        };
        return obj;
      }
    })
  );
  const validImages = images.filter((image) => image !== undefined);
  return validImages;
};

const getThumbnails = async (files: File[]) => {
  const paths = files
    .filter(
      (file: any) =>
        file[".tag"] === "file" &&
        (file.name.endsWith(".jpg") || file.name.endsWith(".png"))
    )
    .map((file: any) => ({
      path: file.path_lower,
      size: "w64h64",
    }));

  const thumbnailEntries = await dbx
    .filesGetThumbnailBatch({
      entries: paths as any,
    })
    .then(async (res) => {
      return res.result.entries;
    });

  return thumbnailEntries || [];
};
