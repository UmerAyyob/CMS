// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1769aa", // deep blue
      light: "#63a4ff", // sky blue
      dark: "#004c8c", // navy
      contrastText: "#fff",
    },
    secondary: {
      main: "#0288d1", // bright cyan-blue
      light: "#5eb8ff",
      dark: "#005b9f",
      contrastText: "#fff",
    },
    background: {
      default: "#f3f8ff", // very light blue background
      paper: "#e1f0ff", // light blue paper (cards)
    },
    info: {
      main: "#0288d1", // use cyan-blue for Info status
    },
  },
  components: {
    // DataGrid-specific overrides (requires theme augmentation import)
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#f3f8ff", // match background.default
        },
        columnHeaders: {
          backgroundColor: "#e1f0ff", // match background.paper
        },
        footerContainer: {
          backgroundColor: "#e1f0ff",
        },
      },
    },
  },
});

export default theme;
