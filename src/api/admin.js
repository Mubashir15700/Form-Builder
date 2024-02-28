import axios from "../config/axiosConfig";
import handleAxiosRequest from "../utils/handleAxiosRequest";

export const getUsers = async () =>
    handleAxiosRequest(axios.get("/admin/users"), "fetch users error: ");

export const getForms = async (userId) =>
    handleAxiosRequest(axios.get(`/admin/forms?userId=${userId}`), "get forms error: ");

export const getSubmissions = async (formId) =>
    handleAxiosRequest(axios.get(`/admin/forms/${formId}/submissions`), "get form submissions error: ");
