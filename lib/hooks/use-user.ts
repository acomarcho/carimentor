import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { userAtom, userTagsAtom } from "../atoms/user";
import { apiURL } from "../constants";
import {
  GetOneOnOneResponse,
  GetUserResponse,
  GetUserTagResponse,
  OneOnOne,
  Tag,
  User,
} from "../constants/responses";

const fetchUser = () => {
  const token = localStorage.getItem("token");
  return axios.get<GetUserResponse>(`${apiURL}/user/self`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

const fetchTag = (userId: string) => {
  return axios.get<GetUserTagResponse>(`${apiURL}/tag?userId=${userId}`);
};

export function useUser() {
  const [user, setUser] = useAtom(userAtom);
  const [userTags, setUserTags] = useAtom(userTagsAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);

        const response = await fetchUser();
        if (!response.data.data) {
          throw new Error(response.data.message);
        }

        setUser(response.data.data);
        const tagResponse = await fetchTag(response.data.data.id);
        if (!tagResponse.data.data) {
          throw new Error(tagResponse.data.message);
        }
        setUserTags(tagResponse.data.data.map((tag) => tag.tag));
        setIsError(false);
      } catch (err) {
        setUser(undefined);
        setUserTags([]);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [setUser, setUserTags]);

  return {
    user,
    userTags,
    isLoading,
    isError,
    setUser,
    setUserTags,
  };
}

export function useMentor(id: string) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userTags, setUserTags] = useState<Tag[] | undefined>(undefined);
  const [oneOnOnes, setOneOnOnes] = useState<OneOnOne[] | undefined>(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${apiURL}/user/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token")
              ? `Bearer ${localStorage.getItem("token")}`
              : "",
          },
        });
        setUser(response.data.data);

        const tagsResponse = await axios.get<GetUserTagResponse>(
          `${apiURL}/tag?userId=${id}`
        );
        setUserTags(
          tagsResponse.data.data.map((d) => {
            return d.tag;
          })
        );

        const oneOnOnesResponse = await axios.get<GetOneOnOneResponse>(
          `${apiURL}/one-on-one?mentorId=${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token")
                ? `Bearer ${localStorage.getItem("token")}`
                : "",
            },
          }
        );
        const _bookings: OneOnOne[] = [];
        const data = oneOnOnesResponse.data;
        for (const o of data.data) {
          const menteeId = await axios.get(`${apiURL}/user/${o.menteeId}`, {
            headers: {
              Authorization: `${
                localStorage.getItem("token")
                  ? `Bearer ${localStorage.getItem("token")}`
                  : ""
              }`,
            },
          });
          const menteeData = menteeId.data;
          _bookings.push({
            ...o,
            menteeName: menteeData.data.name,
          });
        }
        setOneOnOnes(_bookings);

        setIsError(false);
      } catch (error) {
        setUser(undefined);
        setIsError(true);
        setUserTags([]);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [id]);

  return {
    user,
    setUser,
    userTags,
    setUserTags,
    oneOnOnes,
    setOneOnOnes,
    isLoading,
    isError,
  };
}
