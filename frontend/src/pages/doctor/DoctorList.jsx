import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { getDoctors, deleteDoctor } from "../../api/doctorApi";
import { useNavigate } from "react-router-dom";

export default function DoctorList() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getDoctors();
        setRows(data.doctors.map((doc) => ({ id: doc._id, ...doc })));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    await deleteDoctor(id);
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    {
      field: "specialization",
      headerName: "Specialization",
      flex: 1,
      minWidth: 150,
    },
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
            onClick={() => navigate(`/doctors/edit/${params.id}`)}
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
          Doctor List
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/doctors/create")}
        >
          Add Doctor
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
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #b3d4fc",
            },
            "& .MuiDataGrid-columnHeader": {
              color: "#004c8c",
            },
          }}
        />
      </Paper>
    </Container>
  );
}
