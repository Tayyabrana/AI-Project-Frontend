import axiosInstance from "./axiosInstance";

const teamEmployeeService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/teamEmployees/create', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    single: async (id) => {
        try {
            const response = await axiosInstance.get('/teamEmployees/single/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/teamEmployees/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/teamEmployees/delete/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default teamEmployeeService
