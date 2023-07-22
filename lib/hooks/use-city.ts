import useSWR from "swr";
import { apiURL } from "@/lib/constants";
import { CityResponse } from "../constants/responses";

export function useCity(provinceID: string) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${apiURL}/city?provinceId=${provinceID}`,
    fetcher
  );

  return {
    cities: data as CityResponse,
    isLoading,
    isError: error,
  };
}

export function useAllCities() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`${apiURL}/city`, fetcher);

  return {
    cities: data as CityResponse,
    isLoading,
    isError: error,
  };
}
