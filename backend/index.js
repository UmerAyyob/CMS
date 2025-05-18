import express from "express";
import router from "./routes/patientRecord.js";
import { connectToMongoDB } from "./config/connect.js";
import dotenv from "dotenv";
import appointmentRoute from "./routes/appointment.js";
import doctorRoute from "./routes/doctor.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

connectToMongoDB();

// ✅ Proper CORS setup for dev and prod
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cms-production-7280.up.railway.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/patient", router);
app.use("/api/appointment", appointmentRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/auth", authRoute);

// Static serving of React frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
