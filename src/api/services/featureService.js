import axiosInstance from "./axiosInstance";

const featureService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/features/create', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    single: async (id) => {
        try {
            const response = await axiosInstance.get('/features/single/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/features/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    update: async (payload) => {
        try {
            const response = await axiosInstance.put('/features/update', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    status: async (payload) => {
        try {
            const response = await axiosInstance.put('/features/status', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fixed: async (payload) => {
        try {
            const response = await axiosInstance.put('/features/fixed', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchByProject: async (id) => {
        try {
            const response = await axiosInstance.get(`/features/project/${id}`);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/features/delete/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default featureService
