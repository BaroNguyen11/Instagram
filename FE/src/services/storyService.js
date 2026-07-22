import apiClient from "../api/apiClient";

export const storyService = {
  createStory: async (data) => {
    const response = await apiClient.post("/stories", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
  getStory: async () => {
    const response = await apiClient.get(`/stories`);
    return response.data;
  },
};
