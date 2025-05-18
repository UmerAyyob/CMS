import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientRecord" },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    appointmentDate: {
      type: String,
      required: true,
    },
    timeSlot: {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    reason: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    followUpDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Appointment", appointmentSchema);
