import axios from "axios";
import { apiURL } from "../constants";
import { LoginRequest } from "../constants/requests";
import { LoginResponse } from "../constants/responses";

export const postLogin = async (data: LoginRequest) => {
    const axiosResponse = await axios.post(`${apiURL}/auth/login`, data);
    return axiosResponse.data as LoginResponse;
}