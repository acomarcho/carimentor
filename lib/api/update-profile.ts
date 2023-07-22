import axios from "axios";
import { apiURL } from "../constants";
import { UpdateUserRequest } from "../constants/requests";

export const putProfile = async (data: UpdateUserRequest, token: string) => {
  await axios.put(
    `${apiURL}/user/self`,
    { ...data, tagIds: data.tags.join(",") },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
