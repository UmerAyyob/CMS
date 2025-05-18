import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Grid,
  Stack,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import {
  createPatientRecord,
  updatePatientRecordById,
  getPatientRecordById,
} from "../../api/patientApi";
import { useNavigate, useParams } from "react-router-dom";

const tobaccoOptions = ["None", "Occasional", "Regular", "Heavy"];
const alcoholOptions = ["None", "Occasional", "Regular", "Heavy"];
const exerciseOptions = [
  "None",
  "3 times a week",
  "5 times a week",
  "Sometimes",
  "Regularly",
];

export default function PatientRecordForm() {
  const navigate = useNavigate();
  const { id } = useParams(); //– will be undefined for "create" mode

  const [record, setRecord] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    phone: { cell: "", home: "" },
    address: { street: "", city: "", postalCode: "" },
    conditions: "",
    medications: "",
    allergies: "",
    tabaccoUse: "",
    alcoholUse: "",
    exercise: "",
    report: "",
  });

  // Load existing record when editing
  useEffect(() => {
    if (id) {
      getPatientRecordById(id)
        .then((res) => {
          const data = res.data.record || res.data;

          setRecord({
            // top-level fields…
            firstName: data.firstName || "",
            // …
            phone: {
              cell: data.phone?.cell || "", // optional chaining + fallback
              home: data.phone?.home || "",
            },
            address: {
              street: data.address?.street || "",
              city: data.address?.city || "",
              postalCode: data.address?.postalCode || "",
            },
            // rest…
          });
        })
        .catch(console.error);
    }
  }, [id]);
  // Handle nested fields for phone and address
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("phone.")) {
      const key = name.split(".")[1];
      setRecord((prev) => ({
        ...prev,
        phone: { ...prev.phone, [key]: value },
      }));
    } else if (name.includes("address.")) {
      const key = name.split(".")[1];
      setRecord((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setRecord((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler calls either create or update helper
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        console.log("Updating record:", id, record);
        await updatePatientRecordById(id, record); //– PUT /patient/:id
      } else {
        console.log("Creating record:", record);
        await createPatientRecord(record); //– POST /patient
      }
      navigate("/patients");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: "background.paper" }}>
        <Typography variant="h5" gutterBottom>
          {id ? "Edit Patient Record" : "Add Patient Record"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <Grid container spacing={2}>
              {/* Name Fields */}
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={record.firstName}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={record.lastName}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            {/* Email & Birth Date */}
            <TextField
              label="Email"
              name="email"
              type="email"
              value={record.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Birth Date"
              name="birthDate"
              type="date"
              value={record.birthDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />

            {/* Phone Fields */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Cell Phone"
                  name="phone.cell"
                  value={record.phone.cell}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Home Phone"
                  name="phone.home"
                  value={record.phone.home}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>

            {/* Address */}
            <Typography variant="subtitle1">Address</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Street"
                  name="address.street"
                  value={record.address.street}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City"
                  name="address.city"
                  value={record.address.city}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Postal Code"
                  name="address.postalCode"
                  value={record.address.postalCode}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>

            {/* Other Fields */}
            <TextField
              label="Conditions"
              name="conditions"
              value={record.conditions}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Medications"
              name="medications"
              value={record.medications}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Allergies"
              name="allergies"
              value={record.allergies}
              onChange={handleChange}
              fullWidth
            />

            {/* Enums */}
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Tobacco Use"
                  name="tabaccoUse"
                  value={record.tabaccoUse}
                  onChange={handleChange}
                  fullWidth
                >
                  {tobaccoOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Alcohol Use"
                  name="alcoholUse"
                  value={record.alcoholUse}
                  onChange={handleChange}
                  fullWidth
                >
                  {alcoholOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Exercise"
                  name="exercise"
                  value={record.exercise}
                  onChange={handleChange}
                  fullWidth
                >
                  {exerciseOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            {/* Report */}
            <TextField
              label="Report / Notes"
              name="report"
              type="file"
              value={record.report}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />

            <Button variant="contained" size="large" type="submit">
              {id ? "Update Record" : "Add Record"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
