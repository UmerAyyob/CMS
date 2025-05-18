import express from "express";
import router from "./routes/patientRecord.js";
import { connectToMongoDB } from "./config/connect.js";
import dotenv from "dotenv";
import appointmentRoute from "./routes/appointment.js";
import doctorRoute from "./routes/doctor.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

connectToMongoDB();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/patient", router);
app.use("/api/appointment", appointmentRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
