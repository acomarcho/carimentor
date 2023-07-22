import { BaseResponse } from "./base";

export interface OneOnOne {
  id: string;
  updatedAt: string;
  menteeId: string;
  menteeName: string;
  mentorId: string;
  mentorName: string;
  meetingUrl: string | null;
  review: string | null;
  rating: number | null;
  message: string | null;
  approvalStatus: string;
  date: string;
}

export type GetOneOnOneData = OneOnOne[];
export type GetOneOnOneResponse = BaseResponse<GetOneOnOneData>;
