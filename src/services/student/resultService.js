import axiosInstance from "@/api/axios";

export async function getResult(attemptId) {

    const response = await axiosInstance.get(
        `/student/attempts/${attemptId}/result`
    );

    return response.data.data;

}