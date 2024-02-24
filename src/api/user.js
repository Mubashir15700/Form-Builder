import axios from "../config/axiosConfig";
import handleAxiosRequest from "../utils/handleAxiosRequest";

export const createForm = async (data) =>
    handleAxiosRequest(axios.post(`/user/create-form`, data), "create form error: ");
