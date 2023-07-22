import { BaseResponse } from "./base";
import { User } from "./user";

export interface Login {
  token: string;
  user: User;
}

export type LoginResponse = BaseResponse<Login>;
