import axios from "../config/axiosConfig";
import handleAxiosRequest from "../utils/handleAxiosRequest";

export const checkAuth = async (role) =>
    handleAxiosRequest(axios.get(`/auth/checkauth`, { params: role }), "check auth error: ");

export const login = async (data) =>
    handleAxiosRequest(axios.post(`/auth/login`, data), "login error: ");

export const signUp = async (data) =>
    handleAxiosRequest(axios.post(`/auth/sign-up`, data), "sign up error: ");

export const logout = async (data) =>
    handleAxiosRequest(axios.post(`/auth/logout`, data), "logout error: ");
