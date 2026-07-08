import apiClient from "../api/apiClient";

export const userService = {
  getUsers: async () => {
    const response = await apiClient.get("/users");
    return response.data;
  },

  getFollowers: async (id) => {
    const response = await apiClient.get(`/users/follower/${id}`);
    return response.data;
  },
  getFollowing: async (id) => {
    const response = await apiClient.get(`/users/following/${id}`);
    return response.data;
  },
  getUserProfile: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
};
