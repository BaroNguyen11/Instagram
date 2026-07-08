import apiClient from "../api/apiClient";

export const profileService = {
  updateProfile: async (profileData) => {
    const response = await apiClient.patch(`/profile`, profileData);
    return response.data;
  },
  getProfile: async () => {
    const response = await apiClient.get(`/profile`);
    return response.data;
  }
};
