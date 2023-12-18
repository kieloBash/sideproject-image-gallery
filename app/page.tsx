import UploadImage from "@/components/image-upload";

export default function Home() {
  // // Create a File object from a Blob
  // const file = new File(["Hello, world!"], "hello.txt", { type: "text/plain" });

  // // Create a filesUploadArg object
  // const arg = {
  //   path: "/hello.txt",
  //   contents: file,
  // };

  // Upload the file
  // dbx
  //   .filesUpload(arg)
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadImage />
    </main>
  );
}
