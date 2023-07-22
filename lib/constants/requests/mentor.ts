export interface MentorFilterRequest {
  location: string;
  premiumOnly: boolean;
  tags: string[];
}

export interface BookMentorRequest {
  date: Date | null;
  message: string;
}
