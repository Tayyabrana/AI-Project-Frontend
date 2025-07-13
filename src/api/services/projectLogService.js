import axiosInstance from "./axiosInstance";

const projectLogService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/project/logs/create', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    allByProjects: async (payload) => {
        try {
            const response = await axiosInstance.get(`/project/logs/project/all/${payload.project}`);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default projectLogService
