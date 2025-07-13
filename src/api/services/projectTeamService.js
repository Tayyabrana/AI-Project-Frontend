import axiosInstance from "./axiosInstance";

const projectTeamService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/projectTeams/create', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    single: async (id) => {
        try {
            const response = await axiosInstance.get('/projectTeams/single/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/projectTeams/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/projectTeams/delete/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default projectTeamService
