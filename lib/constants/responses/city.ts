import { BaseResponse } from "./base";

export interface City {
  id: string;
  name: string;
}

export type GetCityData = City[];
export type GetCityDataResponse = BaseResponse<GetCityData>;
