import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { userAtom, userTagsAtom } from "../atoms/user";
import { apiURL } from "../constants";
import { MentorFilterRequest } from "../constants/requests";
import {
  GetOneOnOneResponse,
  GetUserResponse,
  GetUserTagResponse,
  GetUsersResponse,
  MentorSearchResult,
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

export function useSearchMentors(request: MentorFilterRequest) {
  const [mentors, setMentors] = useState<MentorSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const searchMentors = async () => {
      try {
        setIsLoading(true);
        const _mentors = await fetchMentor(
          request.location === "CITY",
          request.location === "PROVINCE",
          request.premiumOnly,
          request.tags
        );
        setMentors(_mentors);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    searchMentors();
  }, [request]);

  return { mentors, setMentors, isLoading, isError };
}

export function usePremiumMentors() {
  const [mentors, setMentors] = useState<MentorSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const searchMentors = async () => {
      try {
        setIsLoading(true);
        const _mentors = await fetchMentor(false, false, true, []);
        setMentors(_mentors);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    searchMentors();
  }, []);

  return { mentors, setMentors, isLoading, isError };
}

export function useClosestMentors() {
  const [mentors, setMentors] = useState<MentorSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const searchMentors = async () => {
      try {
        setIsLoading(true);
        const _mentors = await fetchMentor(false, true, false, []);
        setMentors(_mentors);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    searchMentors();
  }, []);

  return { mentors, setMentors, isLoading, isError };
}

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
