import UploadImage from "@/components/image-upload";
import Upload from "@/components/uploads";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadImage />
      <Upload />
    </main>
  );
}
