import axiosInstance from "./axiosInstance";

const uploadService = {
    single: async (file) => {
        try {
            let formData = new FormData()
            formData.append('file', file)
            const response = await axiosInstance.post('/upload/image', formData);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default uploadService
