import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
} from "@mui/icons-material";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        py: 6,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* Column 1: Clinic Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Medicare Clinic
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              123 Wellness Blvd.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Karachi, Pakistan
            </Typography>
            <Typography variant="body2">54000</Typography>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            {["Doctors", "Patients", "Appointments"].map((text) => (
              <MuiLink
                key={text}
                href={`/${text.toLowerCase()}`}
                variant="body2"
                display="block"
                sx={{ mb: 0.5, color: "text.primary", textDecoration: "none" }}
              >
                {text}
              </MuiLink>
            ))}
          </Grid>

          {/* Column 3: Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">+92 300 1234567</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">
                contact@medicareclinic.com
              </Typography>
            </Box>
          </Grid>

          {/* Column 4: Social */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ mt: 1 }}>
              <IconButton
                component="a"
                href="https://facebook.com"
                color="inherit"
              >
                <Facebook />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com"
                color="inherit"
              >
                <Twitter />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                color="inherit"
              >
                <Instagram />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                color="inherit"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Medicare Clinic. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
