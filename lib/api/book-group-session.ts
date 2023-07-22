import axios from "axios";
import { apiURL } from "../constants";
import {
  CreateNewGroupSessionRequest,
  QueryGetGroupSession,
} from "../constants/requests";
import {
  CreateBookGroupSessionData,
  CreateBookGroupSessionRequest,
  CreateBookGroupSessionResponse,
  CreateGroupSessionResponse,
  GetBookGroupSessionQuery,
  GetDetailGroupSessionResponse,
  GetGroupSessionResponse,
} from "../constants/responses";

export const createBookGroupSession = async (
  data: CreateBookGroupSessionRequest,
  token?: string
) => {
  const tokenStr = token ? token : localStorage.getItem("token");

  const res = await axios.post<CreateBookGroupSessionResponse>(
    `${apiURL}/book-group-session`,
    data,
    {
      headers: {
        Authorization: `Bearer ${tokenStr}`,
      },
    }
  );
  return res.data;
};

export const getBookGroupSessions = async (query: GetBookGroupSessionQuery) => {
  const urlQuery = new URLSearchParams(query).toString();
  const res = await axios.get<GetGroupSessionResponse>(
    `${apiURL}/book-group-session?${urlQuery}`
  );
  return res.data;
};

export const getBookGroupSessionDetail = async (id: string) => {
  const res = await axios.get<GetDetailGroupSessionResponse>(
    `${apiURL}/book-group-session/${id}`
  );
  return res.data;
};
