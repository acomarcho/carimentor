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

export type Tag = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
};

export type UserTag = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  tagId: string;
};

export type UserTagDetail = UserTag & {
  tag: Tag;
};

export type BaseResponse<T> = {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
};

export type GetUserData = User;
export type GetUserResponse = BaseResponse<GetUserData>;

export type GetTagData = UserTagDetail[];
export type GetTagResponse = BaseResponse<GetTagData>;
