import axios from "axios";
import { apiURL } from "../constants";
import {
  GetUserTagResponse,
  GetUserResponse,
  GetUsersResponse,
  MentorSearchResult,
} from "../constants/responses";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom, userTagsAtom } from "../atoms/user";

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

const fetchMentor = async (
  onMyCity: boolean,
  onMyProvince: boolean,
  premiumOnly: boolean,
  tags: string[]
) => {
  const token = localStorage.getItem("token");

  let query = "?role=MENTOR";
  query += `&onMyProvince=${onMyProvince}`;
  query += `&onMyCity=${onMyCity}`;
  query += `&premiumOnly=${premiumOnly}`;
  if (tags.length > 0) {
    query += `&tags=${tags.join(",")}`;
  }

  const userResponse = await axios.get<GetUsersResponse>(
    `${apiURL}/user${query}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );

  const _mentors: MentorSearchResult[] = [];
  for (const mentor of userResponse.data.data!) {
    const tagResponse = await fetchTag(mentor.id);
    const tags = tagResponse.data.data!.map((data) => {
      return data;
    });
    _mentors.push({
      ...mentor,
      tags,
    });
  }

  return _mentors;
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
        setUserTags(tagResponse.data.data.map((tag) => tag));
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
