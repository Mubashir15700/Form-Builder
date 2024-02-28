import axios from "../config/axiosConfig";
import handleAxiosRequest from "../utils/handleAxiosRequest";

export const createForm = async (data) =>
    handleAxiosRequest(axios.post("/user/forms/create", data), "create form error: ");

export const getUserForms = async (userId) =>
    handleAxiosRequest(axios.get(`/user/forms?userId=${userId}`), "get forms error: ");

export const getuserFormSubmissions = async (formId) =>
    handleAxiosRequest(axios.get(`/user/forms/${formId}/submissions`), "get form submissions error: ");
