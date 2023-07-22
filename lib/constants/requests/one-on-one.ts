export interface ReviewOneOnOneRequest {
  message: string;
  rating: number;
}

export interface ProcessOneOnOneRequest {
  approvalStatus: string | undefined;
  meetingUrl: string;
}
