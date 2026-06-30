import axiosInstance from "@/api/axios";
import { API } from "@/constants/api";

export async function login(loginRequest) {

    const response = await axiosInstance.post(
        API.AUTH.LOGIN,
        loginRequest
    );

    return response.data.data;
}