import axios from "axios";

const API_BASE_URL = "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api";

const API = axios.create({ baseURL: API_BASE_URL });

export default API;
