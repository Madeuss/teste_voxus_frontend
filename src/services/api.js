import axios from "axios";

const api = axios.create({
  baseURL: "https://voxusbackend.herokuapp.com",
});

export default api;
