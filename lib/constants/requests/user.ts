export interface MentorFilterRequest {
  location: string;
  premiumOnly: boolean;
  tags: string[];
}

export interface BookMentorRequest {
  date: Date | null;
  message: string;
}
export interface UpdateUserRequest {
  name: string;
  description: string;
  subscriptionStatus: string;
  imageUrl: string;
  cityId: string;
  tagIds: string;
}
