import axios from "axios";
import { apiURL } from "../constants";
import { UpdateUserRequest } from "../constants/requests";

export const putProfile = async (data: UpdateUserRequest, token: string) => {
  await axios.put(`${apiURL}/user/self`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
