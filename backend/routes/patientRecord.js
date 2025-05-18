import express from "express";
const router = express.Router();
import upload from "../config/multerConfig.js";

import {
  createPatientRecord,
  getAllPatientsRecord,
  getPatientRecordById,
  deletePatientRecordById,
  updatePatientRecordById,
} from "../controllers/patientRecord.js";

router.post("/", upload.single("report"), createPatientRecord);
router.get("/", getAllPatientsRecord);
router.get("/:id", getPatientRecordById);
router.put("/:id", updatePatientRecordById);
router.delete("/:id", deletePatientRecordById);

export default router;
