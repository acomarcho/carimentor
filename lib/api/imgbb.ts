import axios from "axios";
import { imgbbApiKey } from "../constants";

export const postImgBB = async (data: FormData) => {
  const response = await axios({
    method: "post",
    url: `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
