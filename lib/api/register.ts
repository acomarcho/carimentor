import axios from "axios";
import { RegisterRequest } from "../constants/requests";
import { apiURL } from "../constants";

export const postRegister = async (data: RegisterRequest) => {
  await axios.post(`${apiURL}/auth/register`, {
    ...data,
    tagIds: data.tagIds.join(","),
  });
};
