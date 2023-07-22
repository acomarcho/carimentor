import { apiURL } from "@/lib/constants";
import axios from "axios";
import { useState, useEffect } from "react";
import { OneOnOne, GetOneOnOneDataResponse } from "../constants/responses";

export function useOneOnOne() {
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

        const response = await axios.get(
          `${apiURL}/one-on-one?menteeId=${userData.data.id}`,
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
        const _histories: OneOnOne[] = [];
        const data = response.data as GetOneOnOneResponse;
        for (const o of data.data) {
          const mentorResponse = await axios.get(
            `${apiURL}/user/${o.mentorId}`,
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
          const mentorData = mentorResponse.data;
          _histories.push({
            ...o,
            mentorName: mentorData.data.name,
          });
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

  return { histories, isLoading, isError };
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
