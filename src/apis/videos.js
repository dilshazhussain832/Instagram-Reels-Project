import axiosInstance from "@/config/axiosConfig";

export const getAllVideos = async () => {
    try {
        const response = await axiosInstance.get("/video");
        console.log("Videos fetched successfully:", response.data);
        return response?.data;
    } catch (error) {
        console.log("Error fetching videos:", error);
    }
}