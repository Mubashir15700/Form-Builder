import axios from "../config/axiosConfig";
import handleAxiosRequest from "../utils/handleAxiosRequest";

export const createForm = async (data) =>
    handleAxiosRequest(axios.post("/user/create-form", data), "create form error: ");

export const getForms = async (userId = null) =>
    handleAxiosRequest(axios.get(`/user/forms?userId=${userId}`), "get forms error: ");

export const getSubmissions = async (formId) =>
    handleAxiosRequest(axios.get(`/user/forms/${formId}/submissions`), "get form submissions error: ");
