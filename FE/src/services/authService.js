import apiClient from "../api/apiClient";

export const authService = {
  login: async (username, password) => {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  },
  register: async (username, password) => {
    const response = await apiClient.post("/auth/register", {
      username,
      password,
    });
    return response.data;
  },
  logout: async (refreshToken) => {
    const response = await apiClient.post("/auth/logout", {
      refreshToken,
    });
    return response.data;
  },
  refresh: async (refreshToken) => {
    const response = await apiClient.post("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  },
  getProfile: async () => {
    const response = await apiClient.get("/auth/profile");
    return response.data;
  },
  toggleFollow: async (id) => {
    const response = await apiClient.patch(`/auth/${id}/follow`);
    return response.data;
  },
};
