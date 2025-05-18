import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Grid,
  Stack,
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  bookAppointment,
  getAppointmentRecordById,
  UpdatebookedAppointment,
} from "../../api/appointmentApi";
import { getDoctors } from "../../api/doctorApi";
import { getPatientRecords } from "../../api/patientApi";

export default function AppointmentForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Form state
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    timeSlot: { startTime: "", endTime: "" },
    status: "scheduled",
    reason: "",
    paymentStatus: "pending",
    followUpDate: "",
  });

  // Dropdown data
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    async function fetchSources() {
      try {
        const [pRes, dRes] = await Promise.all([
          getPatientRecords(),
          getDoctors(),
        ]);
        setPatients(pRes.data.PatientsRecord);
        setDoctors(dRes.data.doctors); // or DoctorsRecord per your API

        if (id) {
          const { data } = await getAppointmentRecordById(id);
          const a = data.PatientRecord; // per your controller
          setForm({
            patientId: a.patientId,
            doctorId: a.doctorId,
            appointmentDate: a.appointmentDate,
            timeSlot: a.timeSlot,
            status: a.status,
            reason: a.reason || "",
            paymentStatus: a.paymentStatus,
            followUpDate: a.followUpDate || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchSources();
  }, [id]);

  // Handle input changes (including nested timeSlot)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("timeSlot.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        timeSlot: { ...prev.timeSlot, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await UpdatebookedAppointment(id, form);
      } else {
        await bookAppointment(form);
      }
      navigate("/appointments");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {id ? "Edit Appointment" : "Book Appointment"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <Grid container spacing={2}>
              {/* Patient Select */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Patient"
                  name="patientId"
                  value={form.patientId}
                  onChange={(e) => {
                    if (e.target.value === "__new__") {
                      navigate("/patients/create");
                    } else {
                      handleChange(e);
                    }
                  }}
                  fullWidth
                  required
                >
                  {patients.map((p) => (
                    <MenuItem key={p._id} value={p._id}>
                      {p.firstName} {p.lastName}
                    </MenuItem>
                  ))}
                  <MenuItem value="__new__" sx={{ fontStyle: "italic" }}>
                    + Add New Patient
                  </MenuItem>
                </TextField>
              </Grid>

              {/* Doctor Select */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Doctor"
                  name="doctorId"
                  value={form.doctorId}
                  onChange={(e) => {
                    if (e.target.value === "__new__") {
                      navigate("/doctors/create");
                    } else {
                      handleChange(e);
                    }
                  }}
                  fullWidth
                  required
                >
                  {doctors.map((d) => (
                    <MenuItem key={d._id} value={d._id}>
                      Dr. {d.name}
                    </MenuItem>
                  ))}
                  <MenuItem value="__new__" sx={{ fontStyle: "italic" }}>
                    + Add New Doctor
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>

            {/* Date */}
            <TextField
              label="Appointment Date"
              name="appointmentDate"
              type="date"
              value={form.appointmentDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />

            {/* Time Slot */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Start Time"
                  name="timeSlot.startTime"
                  type="time"
                  value={form.timeSlot.startTime}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End Time"
                  name="timeSlot.endTime"
                  type="time"
                  value={form.timeSlot.endTime}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>

            {/* Status */}
            <TextField
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              fullWidth
            >
              {["scheduled", "completed", "cancelled"].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </MenuItem>
              ))}
            </TextField>

            {/* Reason */}
            <TextField
              label="Reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              multiline
              rows={3}
            />

            {/* Payment Status */}
            <TextField
              select
              label="Payment Status"
              name="paymentStatus"
              value={form.paymentStatus}
              onChange={handleChange}
              fullWidth
            >
              {["pending", "paid", "failed"].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </MenuItem>
              ))}
            </TextField>

            {/* Follow-up */}
            <TextField
              label="Follow-Up Date"
              name="followUpDate"
              type="date"
              value={form.followUpDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            {/* Submit */}
            <Button variant="contained" size="large" type="submit">
              {id ? "Update Appointment" : "Book Appointment"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
