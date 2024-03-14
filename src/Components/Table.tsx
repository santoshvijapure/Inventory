import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {  DeleteForever } from "@mui/icons-material";
import { useAdminContext } from "../Contexts/IsAdmin";
import EditProductModal from "./EditProductModal";
import { useProduct } from "../Contexts/ProductConext";

const ProductTable: React.FC = () => {
  const { data: products, deleteProduct } = useProduct();
  const { isAdminUser } = useAdminContext();
  const [disabledRows, setDisabledRows] = useState<number[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleToggleRow = (index: number) => {
    if (disabledRows.includes(index)) {
      setDisabledRows(disabledRows.filter((row) => row !== index));
    } else {
      setDisabledRows([...disabledRows, index]);
    }
  };

  const isRowDisabled = (index: number) => {
    return disabledRows.includes(index) || !isAdminUser;
  };

  const handleDelete = (index: number) => {
    deleteProduct(index);
  };
  const handleEdit = (index: number) => {
    setEditIndex(index);
  };

  return (
    <Box px={4} mt={4} component={Paper} mx={4}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => {
            const { category, name, price, quantity, value } = product || {};
            
            return (
              <TableRow
                key={index}
                sx={{ opacity: isRowDisabled(index) && isAdminUser ? 0.5 : 1 }}
              >
                <TableCell>{name}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>{value}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleToggleRow(index)}
                    disabled={!isAdminUser}
                  >
                    {isRowDisabled(index) ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                  <IconButton
                    disabled={isRowDisabled(index)}
                    color="primary"
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteForever />
                  </IconButton>
                  <IconButton
                    disabled={isRowDisabled(index)}
                    color="primary"
                    onClick={() => handleEdit(index)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <EditProductModal
        open={editIndex !== null}
        onClose={() => setEditIndex(null)}
        productIndex={editIndex}
      />
    </Box>
  );
};

export default ProductTable;
