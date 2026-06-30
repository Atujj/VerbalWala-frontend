import axiosInstance from "@/api/axios";

export async function getProfile() {

    const response = await axiosInstance.get(
        "/student/profile"
    );

    return response.data.data;

}