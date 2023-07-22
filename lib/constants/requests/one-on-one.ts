export interface CreateOneOnOneRequest {
  mentorId: string;
  message: string;
  date: string;
}

export interface ReviewOneOnOneRequest {
  message: string;
  rating: number;
}

export interface ProcessOneOnOneRequest {
  approvalStatus: string | undefined;
  meetingUrl: string;
}
