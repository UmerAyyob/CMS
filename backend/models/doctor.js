import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    phone: String,
    email: { type: String, unique: true, required: true },
    availability: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Doctor", doctorSchema);
