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
