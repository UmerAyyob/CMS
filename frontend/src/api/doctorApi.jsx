import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all doctors
export const getDoctors = () => API.get("/doctor");

// Fetch a single doctor by ID
export const getDoctorById = (id) => API.get(`/doctor/${id}`);

// Create a new doctor
export const createDoctor = (doctorData) => API.post("/doctor", doctorData);

// Update an existing doctor
export const updateDoctor = (id, doctorData) =>
  API.put(`/doctor/${id}`, doctorData);

// Delete a doctor
export const deleteDoctor = (id) => API.delete(`/doctor/${id}`);
