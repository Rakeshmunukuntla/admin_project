const LOCAL_API = "http://localhost:5000";
const PROD_API = "https://server-node-cjss.onrender.com";

const API_URL = import.meta.env.MODE === "development" ? LOCAL_API : PROD_API;

export default API_URL;
