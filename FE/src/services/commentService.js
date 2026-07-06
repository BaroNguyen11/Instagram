import apiClient from "../api/apiClient";

export const commentServices = {
  getCommentsByPost: async (postId) => {
    const response = await apiClient.get(`/comments/posts/${postId}`);
    return response.data;
  },
  updateComment: async (id) => {
    const response = await apiClient.patch(`/comments/${id}`);
    return response.data;
  },
  createComment: async (id,content) => {
    const response = await apiClient.post(`/comments/posts/${id}`,{content});
    return response.data;
  },
};
