import { BaseResponse } from "./base";

export type Discussion = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  sessionId: string;
  content: string;
};

export type CreateDiscussionData = Discussion
export type CreateDiscussionResponse = BaseResponse<CreateDiscussionData>;

export type GetDiscussionResponse = BaseResponse<Discussion[]>;


