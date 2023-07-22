import { BaseResponse } from "./base";

export type Discussion = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  sessionId: string;
  content: string;
};

export type ReqCreateDiscussion = {
  sessionId: string;
  content: string;
}

export type CreateDiscussionData = Discussion
export type CreateDiscussionResponse = BaseResponse<CreateDiscussionData>;

export type GetDiscussionQuery = {
  sessionId?: string | undefined;
  userId?: string | undefined;
};

export type GetDiscussionResponse = BaseResponse<Discussion[]>;


