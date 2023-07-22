import useSWR from "swr";
import { apiURL } from "@/lib/constants";
import { GetTagDataResponse } from "../constants/responses";

export function useTags() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`${apiURL}/tag/list`, fetcher);

  return {
    tags: data as GetTagDataResponse,
    isLoading,
    isError: error,
  };
}
