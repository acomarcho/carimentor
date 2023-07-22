import { BaseResponse } from "./base";

export type BookGroupSession = {
  id: string;
  createdAt: string;
  updatedAt: string;
  sessionId: string;
  menteeId: string;
};

export type CreateBookGroupSessionRequest = {
  sessionId: string;
};

export type CreateBookGroupSessionData = BookGroupSession;
export type CreateBookGroupSessionResponse =
  BaseResponse<CreateBookGroupSessionData>;

export type GetBookGroupSessionQuery = {
  sessionId?: string;
  menteeId?: string;
};

export type GetBookGroupSessionData = BookGroupSession[];
export type GetBookGroupSessionResponse =
  BaseResponse<GetBookGroupSessionData>;
 
export type GetBookGroupSessionDetailData = BookGroupSession;
export type GetBookGroupSessionDetailResponse =
  BaseResponse<GetBookGroupSessionDetailData>;
  
