import axiosInstance from "./axiosInstance";

const bugService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/bugs/create', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    single: async (id) => {
        try {
            const response = await axiosInstance.get('/bugs/single/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/bugs/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    update: async (payload) => {
        try {
            const response = await axiosInstance.put('/bugs/update', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    status: async (payload) => {
        try {
            const response = await axiosInstance.put('/bugs/status', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fixed: async (payload) => {
        try {
            const response = await axiosInstance.put('/bugs/fixed', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/bugs/delete/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default bugService
