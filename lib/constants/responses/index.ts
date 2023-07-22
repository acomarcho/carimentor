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
  createdAt: string;
  updatedAt: string;
  name: string;
  role: Role;
  cityId: string;
  imageUrl: string | null;
  subscriptionStatus: SubscriptionStatus;
};

export type Tag = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type UserTag = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tagId: string;
};

export type City = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  provinceId: string;
};

export type Province = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type OneOnOne = {
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
};

export type UserTagDetail = UserTag & {
  tag: Tag;
};

export type BaseResponse<T> = {
  success: boolean;
  data: T;
  message: string;
  error?: string;
};

export type GetUserData = User;
export type GetUserResponse = BaseResponse<GetUserData>;

export type GetTagData = UserTagDetail[];
export type GetTagResponse = BaseResponse<GetTagData>;

export type GetTagListData = Tag[];
export type GetTagListResponse = BaseResponse<GetTagListData>;

export type GetCityData = City[];
export type GetCityResponse = BaseResponse<GetCityData>;

export type GetProvinceData = Province[];
export type GetProvinceResponse = BaseResponse<GetProvinceData>;

export type GetOneOnOneData = OneOnOne[];
export type GetOneOnOneResponse = BaseResponse<GetOneOnOneData>;

export interface Login {
  token: string;
  user: User;
}

export interface LoginResponse {
  data: Login;
}
