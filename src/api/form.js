import axios from "../config/axiosConfig";
import handleAxiosRequest from "../utils/handleAxiosRequest";

export const getForm = async (id) =>
    handleAxiosRequest(axios.get(`/forms/${id}`), "get form error: ");

export const submitForm = async (id, data) =>
    handleAxiosRequest(axios.post(`/forms/${id}/submit`, data), "submit form error: ");
