export interface RegisterRequest {
  email: string;
  password: string;
  role: string;
  tagIds: string[];
  name: string;
  provinceId: string;
  cityId: string;
  description: string;
}
