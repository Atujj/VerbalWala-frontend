import axiosInstance from "@/api/axios";

export async function getDashboard() {

    const response = await axiosInstance.get(
        "/admin/dashboard"
    );

    return response.data.data;

}