import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: { "Content-Type": "application/json" },
});

// Matches your controller names and response shapes:
export const bookAppointment = (data) => API.post("/appointment", data);
export const getAllAppointmentsRecord = () => API.get("/appointment");
export const getAppointmentRecordById = (id) => API.get(`/appointment/${id}`);
export const UpdatebookedAppointment = (id, data) =>
  API.put(`/appointment/${id}`, data);
export const deleteAppointmentRecordById = (id) =>
  API.delete(`/appointment/${id}`);
