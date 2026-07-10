import apiClient from "../api/apiClient";

export const notificationService = {
  getAllNotifications: async () => {
    const response = await apiClient.get("/notifications");
    return response.data;
  },
  notificationUnRead: async () => {
    const response = await apiClient.get("/notifications/unread-count");
    return response.data;
  },
  notificationIsRead: async () => {
    const response = await apiClient.patch(`/notifications/${id}/read`);
    return response.data;
  },
  notificationReadAll: async () => {
    const response = await apiClient.patch("/notifications/read-all");
    return response.data;
  },
};
