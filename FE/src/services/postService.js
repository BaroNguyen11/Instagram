import apiClient from "../api/apiClient";

export const postService = {
  createPost: async (postData) => {
    const response = await apiClient.post("/posts", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  updatePost: async (postId, postData) => {
    const response = await apiClient.put(`/posts/${postId}`, postData);
    return response.data;
  },
  deletePost: async (postId) => {
    const response = await apiClient.delete(`/posts/${postId}`);
    return response.data;
  },
  getAllPosts: async (page = 1, limit = 10) => {
    const res = await apiClient.get("/posts", {
      params: {
        page,
        limit,
      },
    });

    return res.data;
  },
  getPostsByUser: async (id, page = 1, limit = 10) => {
    const res = await apiClient.get(`/posts/user/${id}`, {
      params: {
        page,
        limit,
      },
    });

    return res.data;
  },
  getPostById: async (postId) => {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data;
  },
  toggleLike: async (id) => {
    const response = await apiClient.patch(`/posts/${id}/liked`);
    return response.data;
  },
  savedPost: async (id) => {
    const response = await apiClient.patch(`/posts/${id}/saved`);
    return response.data;
  },
};
