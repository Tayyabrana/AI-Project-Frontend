import axiosInstance from "./axiosInstance";

const employeeService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/employees/create', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    single: async (id) => {
        try {
            const response = await axiosInstance.get('/employees/single/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/employees/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchByTeam: async (id) => {
        try {
            const response = await axiosInstance.get(`/employees/team/${id}`);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    update: async (payload) => {
        try {
            const response = await axiosInstance.put('/employees/update', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    status: async (payload) => {
        try {
            const response = await axiosInstance.put('/employees/status', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/employees/delete/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default employeeService
