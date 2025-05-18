import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import {
  getPatientRecords,
  deletePatientRecordById,
} from "../../api/patientApi";
import { useNavigate } from "react-router-dom";

export default function PatientRecordList() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getPatientRecords();
        console.log("Data : ", data.PatientsRecord);

        // Map API response to DataGrid rows
        setRows(
          data.PatientsRecord.map((pat) => ({
            id: pat._id,
            firstName: pat.firstName,
            lastName: pat.lastName,
            email: pat.email,
            birthDate: pat.birthDate,
            cellPhone: pat.phone.cell,
            homePhone: pat.phone.home || "-",
            city: pat.address.city || "-",
          }))
        );
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm deletion of this patient record?")) return;
    await deletePatientRecordById(id);
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 120 },
    { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 120 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 200 },
    { field: "birthDate", headerName: "Birth Date", flex: 1, minWidth: 120 },
    { field: "cellPhone", headerName: "Cell Phone", flex: 1, minWidth: 130 },
    { field: "homePhone", headerName: "Home Phone", flex: 1, minWidth: 130 },
    { field: "city", headerName: "City", flex: 1, minWidth: 120 },
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
            onClick={() => navigate(`/patients/edit/${params.id}`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" color="primary">
          Patient Records
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/patients/create")}
        >
          Add Patient
        </Button>
      </Stack>
      <Paper sx={{ height: 500, p: 2 }}>
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
