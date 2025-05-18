import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Email,
} from "@mui/icons-material";

// Header.jsx
export function Header() {
  return (
    <AppBar position="static" color="primary" elevation={4}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Medicare Clinic
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {" "}
            {/* Hide on mobile */}
            {["Doctors", "Patients", "Appointments"].map((text, idx) => (
              <MuiLink
                component={RouterLink}
                key={text}
                to={`/${text.toLowerCase()}`}
                color="inherit"
                underline="none"
                sx={{ ml: idx === 0 ? 0 : 3, fontSize: "1rem" }}
              >
                {text}
              </MuiLink>
            ))}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {" "}
            {/* Mobile menu fallback */}
            {/* You can add a menu icon here for drawer toggle */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// Footer.jsx
export function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: "background.paper", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            {/* Address */}
            <Box
              sx={{ width: { xs: "100%", md: "30%" }, mb: { xs: 2, md: 0 } }}
            >
              <Typography variant="h6" gutterBottom>
                Medicare Clinic
              </Typography>
              <Typography variant="body2">
                123 Wellness Blvd.
                <br />
                Karachi, Pakistan
                <br />
                54000
              </Typography>
            </Box>

            {/* Contact */}
            <Box
              sx={{ width: { xs: "100%", md: "30%" }, mb: { xs: 2, md: 0 } }}
            >
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Phone fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">+92 300 1234567</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Email fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  contact@medicareclinic.com
                </Typography>
              </Box>
            </Box>

            {/* Social */}
            <Box sx={{ width: { xs: "100%", md: "30%" } }}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box>
                <MuiLink href="https://facebook.com" color="inherit">
                  <Facebook />
                </MuiLink>
                <MuiLink
                  href="https://twitter.com"
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  <Twitter />
                </MuiLink>
                <MuiLink
                  href="https://instagram.com"
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  <Instagram />
                </MuiLink>
              </Box>
            </Box>
          </Box>

          <Typography variant="body2" align="center" color="text.secondary">
            © {new Date().getFullYear()} Medicare Clinic. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
