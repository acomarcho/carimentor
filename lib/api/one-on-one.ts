import axios from "axios";
import { CreateOneOnOneRequest } from "../constants/requests";
import { apiURL } from "../constants";
import { OneOnOne } from "../constants/responses";

export const createOneOnOne = async (
  data: CreateOneOnOneRequest,
  token: string
) => {
  await axios.post(
    `${apiURL}/one-on-one`,
    {
      ...data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const rejectOneOnOne = async (oneOnOne: OneOnOne, token: string) => {
  await axios.patch(
    `${apiURL}/one-on-one/${oneOnOne.id}/reject`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const approveOneOnOne = async (
  oneOnOne: OneOnOne,
  url: string,
  token: string
) => {
  await axios.patch(
    `${apiURL}/one-on-one/${oneOnOne.id}/approve`,
    {
      meetingUrl: url,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const postReview = async (
  oneOnOne: OneOnOne,
  message: string,
  rating: number,
  token: string
) => {
  await axios.post(
    `${apiURL}/one-on-one/${oneOnOne.id}/rating-review`,
    {
      review: message,
      rating,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
