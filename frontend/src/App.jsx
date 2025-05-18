import { Routes, Route } from "react-router-dom";
import Layout from "../layout.jsx";
import HomePage from "./pages/Homepage.jsx";
import DoctorList from "./pages/doctor/DoctorList";
import DoctorForm from "./pages/doctor/DoctorForm"; // You'll create this next
import PatientRecordForm from "./pages/patient/PatientRecordForm.jsx";
import PatientRecordList from "./pages/patient/PatientRecordList.jsx";
import AppointmentList from "./pages/appointment/AppointmentList.jsx";
import AppointmentForm from "./pages/appointment/AppointmentForm.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/doctors/create" element={<DoctorForm />} />
          <Route path="/doctors/edit/:id" element={<DoctorForm />} />
          <Route path="/patients" element={<PatientRecordList />} />
          <Route path="/patients/create" element={<PatientRecordForm />} />
          <Route path="/patients/edit/:id" element={<PatientRecordForm />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/appointments/create" element={<AppointmentForm />} />
          <Route path="/appointments/edit/:id" element={<AppointmentForm />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
