import { BaseResponse } from "./base";

export interface GroupSession {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  date: string;
  meetingUrl: string;
  mentorId: string;
  description: string;
  maxParticipant: number;
}

export type GetGroupSessionData = GroupSession[];
export type GetGroupSessionDataResponse = BaseResponse<GetGroupSessionData>;

export type CreateGroupSessionData = GroupSession;
export type CreateGroupSessionDataResponse =
  BaseResponse<CreateGroupSessionData>;

export type GetDetailGroupSessionData = GroupSession;
export type GetDetailGroupSessionDataResponse =
  BaseResponse<GetDetailGroupSessionData>;
