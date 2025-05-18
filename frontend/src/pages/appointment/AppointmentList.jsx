import { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getAllAppointmentsRecord,
  deleteAppointmentRecordById,
} from "../../api/appointmentApi";
import { useNavigate } from "react-router-dom";
import { getDoctors } from "../../api/doctorApi";
import { getPatientRecords } from "../../api/patientApi";

export default function AppointmentList() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        // Step 1: Get Appointments
        const { data } = await getAllAppointmentsRecord();
        const appointments = data.AppointmentsRecord || [];
        // console.log("Appointments:", appointments);

        // Step 2: Get Doctors
        const DoctorRes = await getDoctors();
        const doctors = DoctorRes.data.doctors;
        console.log("Doctors:", doctors);

        const PatientRes = await getPatientRecords();
        const patients = PatientRes.data.PatientsRecord;
        console.log("Patients : ", patients);

        // Step 3: Create a lookup map from doctorId to doctor name
        const doctorMap = {};
        doctors.forEach((doc) => {
          doctorMap[doc._id] = doc.name;
        });

        const patientMap = {};
        patients.forEach((pat) => {
          patientMap[pat._id] = `${pat.firstName}  ${pat.lastName}`;
        });
        // Step 4: Map appointments to include doctorName
        const mappedRows = appointments.map((apt) => {
          const doctorId = apt.doctorId;
          const doctorName = doctorMap[doctorId] || "Unknown";

          const patientId = apt.patientId;
          const patientName = patientMap[patientId] || "Unknown";

          return {
            id: apt._id,
            doctorId: doctorId,
            doctorName: doctorName, // 👈 This is the mapped name
            patientId: apt.patientId,
            patientName: patientName,
            date: apt.appointmentDate,
            startTime: apt.timeSlot?.startTime || "-",
            endTime: apt.timeSlot?.endTime || "-",
            status: apt.status,
            reason: apt.reason || "-",
            payment: apt.paymentStatus,
            followUp: apt.followUpDate || "-",
          };
        });

        setRows(mappedRows);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm deletion of this appointment?")) return;
    try {
      await deleteAppointmentRecordById(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const columns = [
    { field: "patientName", headerName: "Patient", flex: 1, minWidth: 140 },
    { field: "doctorName", headerName: "Doctor", flex: 1, minWidth: 140 },
    // { field: "patientId", headerName: "Patient ID", flex: 1, minWidth: 140 },
    // { field: "doctorId", headerName: "Doctor ID", flex: 1, minWidth: 140 },
    { field: "date", headerName: "Date", flex: 1, minWidth: 120 },
    { field: "startTime", headerName: "Start", flex: 0.8, minWidth: 100 },
    // { field: "endTime", headerName: "End", flex: 0.8, minWidth: 100 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    { field: "reason", headerName: "Reason", flex: 1.5, minWidth: 200 },
    // { field: "payment", headerName: "Payment", flex: 1, minWidth: 140 },
    { field: "followUp", headerName: "Follow-Up", flex: 1, minWidth: 120 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      minWidth: 180,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/appointments/edit/${params.id}`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4" color="primary">
          Appointments List
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/appointments/create")}
        >
          Book Appointment
        </Button>
      </Stack>
      <Paper sx={{ height: 550, p: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 25]}
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-cell": { borderBottom: "1px solid #b3d4fc" },
            "& .MuiDataGrid-columnHeader": { color: "#004c8c" },
          }}
        />
      </Paper>
    </Container>
  );
}
