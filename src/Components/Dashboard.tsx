// import React from 'react';
// import { Grid, Card, CardContent, Typography } from '@mui/material';

import React from "react";
import { useState, useEffect } from "react";
import StatisticsCard from "./StatisticsCard";
import { Grid } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import { useProduct } from "../Contexts/ProductConext";

const Dashboard: React.FC = () => {
  const { data: products } = useProduct();
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalStoreValue, setTotalStoreValue] = useState<number>(0);
  const [outOfStockProducts, setOutOfStockProducts] = useState<number>(0);
  const [numberOfCategories, setNumberOfCategories] = useState<number>(0);

  useEffect(() => {
    let totalProductsCount = 0;
    let totalValue = 0;
    let outOfStockCount = 0;
    let categories: string[] = [];

    products.forEach((product) => {
      totalProductsCount++;
      totalValue += Number(product.value.replace("$", ""));
      if (product.quantity === 0) {
        outOfStockCount++;
      }
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });

    setTotalProducts(totalProductsCount);
    setTotalStoreValue(totalValue);
    setOutOfStockProducts(outOfStockCount);
    setNumberOfCategories(categories.length);
  }, [JSON.stringify(products)]);

  const statistics = [
    { name: "Total Products", icon: <ShoppingCartIcon />, stat: totalProducts },
    {
      name: "Total Store Value",
      icon: <CurrencyExchangeIcon />,
      stat: totalStoreValue,
    },
    {
      name: "Out of Stock Products",
      icon: <RemoveShoppingCartIcon />,
      stat: outOfStockProducts,
    },
    {
      name: "Number of Categories",
      icon: <CategoryIcon />,
      stat: numberOfCategories,
    },
  ];
  return (
    <div>
      <Grid container spacing={2} mt={2} px={4}>
        {statistics.map((statistic, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatisticsCard
              icon={statistic.icon}
              name={statistic.name}
              stat={statistic.stat}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
