import apiClient from "../api/apiClient";

export const updateProfile = async (profileData) => {
    const response = await apiClient.put(`/profile`, profileData);
    return response.data;
};