import { useState } from "react";
import {
  Discussion,
  GetDetailGroupSessionResponse,
  GetDiscussionResponse,
  GroupSession,
} from "../constants/responses";
import useSWR from "swr";
import { apiURL } from "../constants";

export function useGroupSession(sessionId: string) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: groupSession,
    error: groupSessionError,
    isLoading: groupSessionIsLoading,
  } = useSWR<GetDetailGroupSessionResponse>(
    `${apiURL}/group-session/${sessionId}`,
    fetcher
  );

  const {
    data: discussions,
    error: discussionsError,
    isLoading: discussionsIsLoading,
  } = useSWR<GetDiscussionResponse>(
    `${apiURL}/discussion?sessionId=${sessionId}`,
    fetcher
  );

  const {
    data: bookGroupSessions,
    error: bookGroupSessionsError,
    isLoading: bookGroupSessionsIsLoading,
  } = useSWR<GetDiscussionResponse>(
    `${apiURL}/book-group-session?sessionId=${sessionId}`,
    fetcher
  );

  return {
    groupSession,
    groupSessionError,
    groupSessionIsLoading,
    discussions,
    discussionsError,
    discussionsIsLoading,
    bookGroupSessions,
    bookGroupSessionsError,
    bookGroupSessionsIsLoading,

  };
}
