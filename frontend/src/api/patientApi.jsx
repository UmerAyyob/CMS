import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export const getPatientRecords = () => API.get("/patient");

export const getPatientRecordById = (id) => API.get(`/patient/${id}`);

export const createPatientRecord = (patientData) =>
  API.post("/patient", patientData);

export const deletePatientRecordById = (id) => API.delete(`/patient/${id}`);

export const updatePatientRecordById = (id, patientData) =>
  API.put(`/patient/${id}`, patientData);
