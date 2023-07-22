import axios from "axios";
import { apiURL } from "../constants";
import {
  CreateNewGroupSessionRequest,
  QueryGetGroupSession,
} from "../constants/requests";
import {
  CreateGroupSessionResponse,
  GetDetailGroupSessionResponse,
  GetGroupSessionResponse,
} from "../constants/responses";

export const createGroupSession = async (
  data: CreateNewGroupSessionRequest,
  token: string
) => {
  const res = await axios.post<CreateGroupSessionResponse>(
    `${apiURL}/group-session`,
    {
      ...data,
      date: data.date?.toISOString(),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getGroupSession = async (
  query: QueryGetGroupSession,
  token: string
) => {
  const queryStr = new URLSearchParams(query).toString();
  const res = await axios.get<GetGroupSessionResponse>(
    `${apiURL}/group-session?${queryStr}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getDetailGroupSession = async (id: string, token: string) => {
  const res = await axios.get<GetDetailGroupSessionResponse>(
    `${apiURL}/group-session/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
