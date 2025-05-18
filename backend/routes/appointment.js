import {
  bookAppointment,
  getAppointmentRecordById,
  deleteAppointmentRecordById,
  UpdatebookedAppointment,
  getAllAppointmentsRecord,
} from "../controllers/appointment.js";
import { pdfGenerator } from "../utils/pdfGenerator.js";
import express from "express";
const router = express.Router();

router.post("/", bookAppointment);
router.get("/report/:id", pdfGenerator);
router.get("/", getAllAppointmentsRecord);
router.get("/:id", getAppointmentRecordById);
router.delete("/:id", deleteAppointmentRecordById);
router.put("/:id", UpdatebookedAppointment);

export default router;
