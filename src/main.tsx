import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lime, purple } from "@mui/material/colors";
import { AdminProvider } from "./Contexts/IsAdmin.tsx";
import { ProductProvider } from "./Contexts/ProductConext.tsx";
import { Box, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
    mode: "dark",
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Box>
    <AdminProvider>
      <ProductProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ProductProvider>
    </AdminProvider>
  </Box>
);
