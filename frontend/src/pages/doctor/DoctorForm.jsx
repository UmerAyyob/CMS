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
} from "@mui/material";
import { createDoctor, updateDoctor, getDoctorById } from "../../api/doctorApi";
import { useNavigate, useParams } from "react-router-dom";

export default function DoctorForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [doctorData, setDoctorData] = useState({
    name: "",
    specialization: "",
    phone: "",
    email: "",
    availability: "", // free-form string
  });

  useEffect(() => {
    if (id) {
      getDoctorById(id)
        .then((res) => {
          setDoctorData({
            ...res.data,
            availability: res.data.availability || "",
          });
        })
        .catch(console.error);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await updateDoctor(id, doctorData);
      else await createDoctor(doctorData);
      navigate("/doctors");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {id ? "Edit Doctor" : "Add New Doctor"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <TextField
              label="Full Name"
              name="name"
              value={doctorData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Specialization"
              name="specialization"
              value={doctorData.specialization}
              onChange={handleChange}
              required
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={doctorData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={doctorData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>

            {/* Availability as a simple multiline field */}
            <TextField
              label="Availability"
              name="availability"
              value={doctorData.availability}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              placeholder="e.g. Monday 10–2, Wednesday 1–4"
              helperText="Separate each slot with a comma"
            />

            <Button variant="contained" size="large" type="submit">
              {id ? "Update Doctor" : "Add Doctor"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
