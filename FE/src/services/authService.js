import apiClient from "../api/apiClient";

export const authService = {
    login: async (username,password) => {
        const response = await apiClient.post("/auth/login",{
            username,password
        })
        return response.data
    },
    getProfile: async ()=>{
        const response = await apiClient.get("/auth/profile")
        return response.data
    }
}