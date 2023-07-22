import { BaseResponse } from "./base";

export interface Province {
  id: string;
  name: string;
}

export type GetProvinceData = Province[];
export type GetProvinceResponse = BaseResponse<GetProvinceData>;
