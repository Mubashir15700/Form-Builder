import axios from "../config/axiosConfig";
import handleAxiosRequest from "../utils/handleAxiosRequest";

export const getUsers = async () =>
    handleAxiosRequest(axios.get("/admin/users"), "fetch users error: ");
