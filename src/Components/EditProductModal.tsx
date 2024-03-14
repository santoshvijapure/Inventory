import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { Product, useProduct } from "../Contexts/ProductConext";

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  productIndex: any;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  onClose,
  productIndex,
}) => {
  const { data: products, editProduct } = useProduct();
  const [editedProduct, setEditedProduct] = useState<Product>(products[0]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedProduct) {
      const data ={ ...editedProduct, [name]: value }
      setEditedProduct(data);
    }
  };

  const handleEditProduct = () => {
    editedProduct && editProduct(productIndex, editedProduct);
    onClose();
  };

  useEffect(() => {
    const product = products[productIndex];
    if (product) {
      setEditedProduct(product);
    }
  }, [productIndex]);
  console.log(products)

  const { category, name, price, quantity, value } = editedProduct || {};
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          width: 400,
        }}
      >
        <Typography variant="h5">Edit Product</Typography>
        <Typography mt={.5}>{name}</Typography>
        <Box sx={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          gridGap:"1rem",
          mt:3
        }}>
          <TextField
            name="category"
            label="Category"
            value={category}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="price"
            label="Price"
            value={price}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="quantity"
            label="Quantity"
            value={quantity}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="value"
            label="Value"
            value={value}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditProduct}
            sx={{
              mt:3,
              width:"100%"
            }}
          >
            Save Changes
          </Button>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
