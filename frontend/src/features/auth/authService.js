import { apiWithoutAuth } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/api";

const register = async (payload) => {
    try {
        const response = await apiWithoutAuth.post(ENDPOINTS.REGISTER, payload);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const login = async (credentials) => {
    try {
        const response = await apiWithoutAuth.post(ENDPOINTS.LOGIN, credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};


const authService = {
    register,
    login
};

export default authService;
