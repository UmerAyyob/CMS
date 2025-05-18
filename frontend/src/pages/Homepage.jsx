import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";

import DoctorIcon from "@mui/icons-material/LocalHospital";
import PatientIcon from "@mui/icons-material/People";
import AppointmentIcon from "@mui/icons-material/EventNote";

export default function HomePage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          py: { xs: 8, md: 12 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Medicare Clinic
          </Typography>
          <Typography variant="h6" paragraph>
            Your health is our priority. Manage doctors, patients, and
            appointments seamlessly.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
            href="/appointments/create"
          >
            Book an Appointment
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: { xs: 6, md: 8 }, flexGrow: 1 }}>
        <Grid container spacing={4}>
          {[
            {
              icon: <DoctorIcon fontSize="large" color="primary" />,
              title: "Manage Doctors",
              link: "/doctors",
            },
            {
              icon: <PatientIcon fontSize="large" color="primary" />,
              title: "Manage Patients",
              link: "/patients",
            },
            {
              icon: <AppointmentIcon fontSize="large" color="primary" />,
              title: "View Appointments",
              link: "/appointments",
            },
          ].map((feature) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  {feature.icon}
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {feature.title}
                  </Typography>
                  <Button href={feature.link} sx={{ mt: 1 }}>
                    Go
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
