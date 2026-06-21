import apiClient from "../api/apiClient";

export const userService = {
    getAllUsers: async () => {
        const response = await apiClient.get("/users")
        return response.data
    }
}
