import useSWR from "swr";
import { apiURL } from "@/lib/constants";
import { ProvinceResponse } from "../constants/responses";

export function useProvince() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`${apiURL}/province`, fetcher);

  return {
    provinces: data as ProvinceResponse,
    isLoading,
    isError: error,
  };
}
