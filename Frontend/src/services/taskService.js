import api from "./api";

export const getTasks = () => {
  return api.get("/tasks");
};

export const createTask = (data) => {
  return api.post("/tasks", data);
};

export const updateTaskStatus = (id, status) => {
  return api.put(`/tasks/${id}`, { status });
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};