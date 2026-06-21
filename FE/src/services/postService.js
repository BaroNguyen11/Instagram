import apiClient from "../api/apiClient";

export const postService = {
    createPost: async (postData) => {
        const response = await apiClient.post("/posts", postData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return response.data
    },
    updatePost: async (postId, postData) => {
        const response = await apiClient.put(`/posts/${postId}`, postData)
        return response.data
    },
    deletePost: async (postId) => {
        const response = await apiClient.delete(`/posts/${postId}`)
        return response.data
    },
    getAllPosts: async () => {
        const response = await apiClient.get("/posts")
        return response.data
    },
    getPostById: async (postId) => {
        const response = await apiClient.get(`/posts/${postId}`)
        return response.data
    }
}