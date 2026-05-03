import axios from "axios";

const API = "https://task-manager-final-451t.onrender.com/auth";

export const loginUser = (data) => {
  return axios.post(`${API}/login`, data);
};