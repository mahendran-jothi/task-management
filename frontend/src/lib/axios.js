import axios from "axios";
import { API_BASE_URL } from "@/constants/api";

// Without Auth (for login, public APIs)
const apiWithoutAuth = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// With Auth (for secured APIs)
let token = null;
const stored = localStorage.getItem("auth");

if (stored) {
    try {
        token = JSON.parse(stored)?.token || null;
    } catch (e) {
        token = null;
    }
}

const apiWithAuth = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    },
});

export { apiWithAuth, apiWithoutAuth };
