import axiosInstance from "./axiosInstance";

const projectService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/projects/create', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    single: async (id) => {
        try {
            const response = await axiosInstance.get('/projects/single/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/projects/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    update: async (payload) => {
        try {
            const response = await axiosInstance.put('/projects/update', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    status: async (payload) => {
        try {
            const response = await axiosInstance.put('/projects/status', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    start: async (payload) => {
        try {
            const response = await axiosInstance.put('/projects/start', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    end: async (payload) => {
        try {
            const response = await axiosInstance.put('/projects/end', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    complete: async (payload) => {
        try {
            const response = await axiosInstance.put('/projects/complete', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    idle: async (id) => {
        try {
            const response = await axiosInstance.put(`/projects/idle/${id}`, { id: id });
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    close: async (id) => {
        try {
            const response = await axiosInstance.put(`/projects/close/${id}`);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/projects/delete/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default projectService
