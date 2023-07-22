import { BaseResponse } from "./base";

export const Role = {
  MENTOR: "MENTOR",
  MENTEE: "MENTEE",
} as const;

export const SubscriptionStatus = {
  FREE: "FREE",
  PREMIUM: "PREMIUM",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
export type SubscriptionStatus =
  (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];

export type User = {
  description: string;
  email: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  role: Role;
  cityId: string;
  imageUrl: string | null;
  subscriptionStatus: SubscriptionStatus;
};

export type GetUserData = User;
export type GetUserResponse = BaseResponse<GetUserData>;
export type GetUsersResponse = BaseResponse<GetUserData[]>;

import { UserTagDetail } from "./tag";
export type MentorSearchResult = User & {
  tags: UserTagDetail[];
};
