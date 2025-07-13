import axiosInstance from "./axiosInstance";

const teamService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/teams/create', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    single: async (id) => {
        try {
            const response = await axiosInstance.get('/teams/single/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/teams/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchteamByProject: async (id) => {
        try {
            const response = await axiosInstance.get(`/teams/project/${id}`);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    update: async (payload) => {
        try {
            const response = await axiosInstance.put('/teams/update', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    status: async (payload) => {
        try {
            const response = await axiosInstance.put('/teams/status', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/teams/delete/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default teamService
