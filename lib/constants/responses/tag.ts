import { BaseResponse } from "./base";

export type Tag = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
};

export type UserTag = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  tagId: string;
};

export type UserTagDetail = UserTag & {
  tag: Tag;
};

export type GetUserTagData = UserTagDetail[];
export type GetUserTagResponse = BaseResponse<GetUserTagData>;

export type GetTagData = Tag[];
export type GetTagDataResponse = BaseResponse<GetTagData>;
