import apiClient from "../api/apiClient";


export const messageServices = {
    getMessages: async (id)=>{
        const response = await apiClient.get(`messages/${id}`)
        return response.data
    },
    readMessages: async (id)=>{
        const response = await apiClient.patch(`messages/read/${id}`)
        return response.data
    }
}