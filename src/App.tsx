import "./App.css";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import ProductTable from "./Components/Table";
import { Box } from "@mui/material";

function App() {
  return (
    <Box>
      <Navbar />
      <Dashboard />
      <ProductTable />
    </Box>
  );
}

export default App;
