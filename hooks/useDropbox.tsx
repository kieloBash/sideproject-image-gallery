import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetchDropbox() {
  const fetchDropbox = async () => {
    const response = await axios.get("/api/get");
    return response.data;
  };

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: [`dropbox`],
    queryFn: async () => fetchDropbox(),
  });

  const imageLinks = data?.links || [];
  const imageThumbnails = data?.thumbnails || [];

  return {
    links: imageLinks,
    thumbnails: imageThumbnails,
    isLoading,
    refetch,
    isFetching,
  };
}
