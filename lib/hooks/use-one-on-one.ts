import { apiURL } from "@/lib/constants";
import axios from "axios";
import { useState, useEffect } from "react";
import { OneOnOne, GetOneOnOneResponse } from "../constants/responses";

export function useOneOnOne(isMentor = false) {
  const [histories, setHistories] = useState<OneOnOne[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const userResponse = await axios.get(`${apiURL}/user/self`, {
          headers: {
            Authorization: `${
              localStorage.getItem("token")
                ? `Bearer ${localStorage.getItem("token")}`
                : ""
            }`,
          },
        });
        const userData = userResponse.data;

        const url = isMentor
          ? `${apiURL}/one-on-one?mentorId=${userData.data.id}`
          : `${apiURL}/one-on-one?menteeId=${userData.data.id}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `${
              localStorage.getItem("token")
                ? `Bearer ${localStorage.getItem("token")}`
                : ""
            }`,
          },
        });
        const _histories: OneOnOne[] = [];
        const data = response.data as GetOneOnOneResponse;
        for (const o of data.data) {
          const url2 = isMentor
            ? `${apiURL}/user/${o.menteeId}`
            : `${apiURL}/user/${o.mentorId}`;

          const mentorResponse = await axios.get(url2, {
            headers: {
              Authorization: `${
                localStorage.getItem("token")
                  ? `Bearer ${localStorage.getItem("token")}`
                  : ""
              }`,
            },
          });
          const mentorData = mentorResponse.data;

          if (!isMentor) {
            _histories.push({
              ...o,
              mentorName: mentorData.data.name,
            });
          } else {
            _histories.push({
              ...o,
              menteeName: mentorData.data.name,
            });
          }
        }
        setHistories(_histories);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return { histories, setHistories, isLoading, isError };
}

export function useOneOnOneBookings() {
  const [bookings, setBookings] = useState<OneOnOne[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const userResponse = await axios.get(`${apiURL}/user/self`, {
          headers: {
            Authorization: `${
              localStorage.getItem("token")
                ? `Bearer ${localStorage.getItem("token")}`
                : ""
            }`,
          },
        });
        const userData = userResponse.data;

        const response = await axios.get(
          `${apiURL}/one-on-one?mentorId=${userData.data.id}`,
          {
            headers: {
              Authorization: `${
                localStorage.getItem("token")
                  ? `Bearer ${localStorage.getItem("token")}`
                  : ""
              }`,
            },
          }
        );
        const _bookings: OneOnOne[] = [];
        const data = response.data as GetOneOnOneResponse;
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
        setBookings(_bookings);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return { bookings, isLoading, isError };
}
