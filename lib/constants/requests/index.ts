export interface RegisterRequest {
  email: string;
  password: string;
  role: string;
  tagIds: string[];
  name: string;
  provinceId: string | null;
  cityId: string | null;
  description: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface MentorFilterRequest {
  location: string;
  premiumOnly: boolean;
  tags: string[];
}

export interface ReviewOneOnOneRequest {
  message: string;
  rating: number;
}

export interface BookMentorRequest {
  date: Date | null;
  message: string;
}

export interface ProcessOneOnOneRequest {
  approvalStatus: string | undefined;
  meetingUrl: string;
}

export interface CreateNewGroupSessionRequest {
  name: string;
  date: Date | null;
  meetingUrl: string;
  description: string;
  maxParticipant: number | "" | undefined;
}
