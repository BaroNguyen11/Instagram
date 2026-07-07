import apiClient from "../api/apiClient";

export const userService = {
  getUsers: async () => {
    const response = await apiClient.get("/users");
    return response.data;
  },
  toggleFollow: async (id) => {
    const response = await apiClient.patch(`/auth/${id}/follow`);
    return response.data;
  },
};
