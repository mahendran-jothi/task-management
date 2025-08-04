import { apiWithAuth } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/api";

const getAll = async (q = "", page = 1) => {
    try {
        const response = await apiWithAuth.get(ENDPOINTS.TASK, {
            params: { q, page }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const create = async (payload) => {
    try {
        const res = await apiWithAuth.post(ENDPOINTS.TASK, payload);
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const getById = async (id) => {
    try {
        const res = await apiWithAuth.get(`${ENDPOINTS.TASK}/${id}`);
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const update = async (id, payload) => {
    try {
        const res = await apiWithAuth.put(`${ENDPOINTS.TASK}/${id}`, payload);
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};


const remove = async (id, payload) => {
    try {
        const res = await apiWithAuth.delete(`${ENDPOINTS.TASK}/${id}`, payload);
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const getTrack = async (id) => {
    try {
        const res = await apiWithAuth.get(`${ENDPOINTS.TASK}/${id}/track`);
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const updateStatus = async (id, payload) => {
    try {
        const res = await apiWithAuth.patch(`${ENDPOINTS.TASK}/${id}/status`, payload);
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};


const taskService = {
    getAll,
    create,
    getById,
    update,
    remove,
    getTrack,
    updateStatus
};

export default taskService;
