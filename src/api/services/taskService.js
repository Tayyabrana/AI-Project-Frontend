import axiosInstance from "./axiosInstance";

const taskService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/tasks/create', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    single: async (id) => {
        try {
            const response = await axiosInstance.get('/tasks/single/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/tasks/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    update: async (payload) => {
        try {
            const response = await axiosInstance.put('/tasks/update', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    status: async (payload) => {
        try {
            const response = await axiosInstance.put('/tasks/status', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fixed: async (payload) => {
        try {
            const response = await axiosInstance.put('/tasks/fixed', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/tasks/delete/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default taskService
