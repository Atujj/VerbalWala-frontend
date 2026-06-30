import axiosInstance from "@/api/axios";

export async function getDashboard() {
    const response = await axiosInstance.get(
        "/student/dashboard"
    );

    return response.data.data;
}