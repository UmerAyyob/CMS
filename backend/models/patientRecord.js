import mongoose from "mongoose";

const patientRecordSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  phone: {
    cell: {
      type: Number,
      required: true,
    },
    home: {
      type: Number,
    },
  },
  address: {
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
  },
  conditions: {
    type: String,
  },
  medications: {
    type: String,
  },
  allergies: {
    type: String,
  },
  tabaccoUse: {
    type: String,
    enum: ["None", "Occasional", "Regular", "Heavy"],
  },
  alcoholUse: {
    type: String,
    enum: ["None", "Occasional", "Regular", "Heavy"],
  },
  exercise: {
    type: String,
    enum: [
      "None",
      "3 times a week",
      "5 times a week",
      "Sometimes",
      "Regularly",
    ],
  },
  report: {
    type: String,
  },
  // report: [
  //   {visitedAt:{type: String}},
  //   {visitedSummary:{type: String}}
  // ],
});
export default mongoose.model("PatientRecord", patientRecordSchema);
