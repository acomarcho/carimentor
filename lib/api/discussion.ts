import axios from "axios";
import { apiURL } from "../constants";
import {
  CreateDiscussionRequest,
  GetDiscussionQuery,
} from "../constants/requests";
import {
  CreateDiscussionResponse,
  GetDetailGroupSessionResponse,
  GetGroupSessionResponse,
} from "../constants/responses";

export const createDiscussion = async (
  data: CreateDiscussionRequest,
  token: string
) => {
  const res = await axios.post<CreateDiscussionResponse>(
    `${apiURL}/group-session`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getDiscussions = async (query: GetDiscussionQuery) => {
  const urlQuery = new URLSearchParams(query).toString();
  const res = await axios.get<GetGroupSessionResponse>(
    `${apiURL}/group-session?${urlQuery}`
  );
  return res.data;
};

export const getDiscussionDetail = async (id: string) => {
  const res = await axios.get<GetDetailGroupSessionResponse>(
    `${apiURL}/group-session/${id}`
  );
  return res.data;
};
