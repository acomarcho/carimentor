import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { apiURL } from "../constants";
import {
  BookGroupSession,
  Discussion,
  GetBookGroupSessionResponse,
  GetDetailGroupSessionResponse,
  GetDiscussionResponse,
  GetGroupSessionResponse,
  GroupSession,
} from "../constants/responses";

export function useAllGroupSessions() {
  type JoinedGroupSession = GroupSession & {
    discussions: Discussion[];
    bookGroupSessions: BookGroupSession[];
    bookedCount: number;
  };

  const [groupSessions, setGroupSessions] = useState<JoinedGroupSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const fetch = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<GetGroupSessionResponse>(
        `${apiURL}/group-session`
      );

      const _discussions = Promise.all(
        data.data.map(async (groupSession) => {
          const { data: discussions } = await axios.get<GetDiscussionResponse>(
            `${apiURL}/discussion?sessionId=${groupSession.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
              },
            }
          );

          return discussions;
        })
      );

      const _bookGroupSessions = Promise.all(
        data.data.map(async (groupSession) => {
          const { data: bookGroupSessions } =
            await axios.get<GetBookGroupSessionResponse>(
              `${apiURL}/book-group-session?sessionId=${groupSession.id}`,
              {
                headers: {
                  Authorization: `Bearer ${
                    localStorage.getItem("token") || ""
                  }`,
                },
              }
            );
          return bookGroupSessions;
        })
      );

      const [discussions, bookGroupSessions] = await Promise.all([
        _discussions,
        _bookGroupSessions,
      ]);

      const joined = data.data.map((e, idx) => {
        return {
          ...e,
          discussions: discussions[idx].data,
          bookGroupSessions: bookGroupSessions[idx].data,
          bookedCount: bookGroupSessions[idx].data.length,
        };
      });
      setGroupSessions(joined);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    groupSessions,
    isLoading,
    error,
    isError: error !== null,
  };
}

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
  } = useSWR<GetBookGroupSessionResponse>(
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
