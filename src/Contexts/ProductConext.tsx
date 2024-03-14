import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URI } from "../Constants/common";

export interface Product {
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
}

interface ProductContextType {
  data: Product[];
  isLoading: boolean;
  error: string | null;
  addProduct: (newProduct: Product) => void;
  editProduct: (index: number, editedProduct: Product) => void;
  deleteProduct: (index: number) => void;
  refetch: () => void;
}
interface ProviderType {
  children: React.ReactNode;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider: React.FC<ProviderType> = ({ children }) => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URI);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error: any) {
      setData(DummyData);
      setError(error?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("fetched data");
  }, []); 

  /**
   * function to add new data to the data
   * @param newProduct the product to be added to the list
   */
  const addProduct = (newProduct: Product) => {
    setData([...data, newProduct]);
  };
  /**
   * function to edit data in the data
   * @param index the index of the product to be edited
   * @param editedProduct the edited product
   */
  const editProduct = (index: number, editedProduct: Product) => {
    const newData = [...data];
    newData[index] = editedProduct;
    setData(newData);
  };

  /**
   * function to delete data from the data
   * @param index the index of the product to be deleted
   */
  const deleteProduct = (index: number) => {
    const newData = data.filter((_, idx) => idx !== index);
    setData(newData);
  };

  return (
    <ProductContext.Provider
      value={{
        data,
        isLoading,
        error,
        refetch: fetchData,
        addProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
// fallback data as the API is failing wth 429 Too Many Requests
const DummyData: Product[] = [ 
  {
    name: "Bluetooth",
    category: "Electronic",
    value: "$150",
    quantity: 5,
    price: "$30",
  },
  {
    name: "Edifier M43560",
    category: "Electronic",
    value: "0",
    quantity: 0,
    price: "$0",
  },
  {
    name: "Sony 4k ultra 55 inch TV",
    category: "Electronic",
    value: "$1190",
    quantity: 17,
    price: "$70",
  },
  {
    name: "Samsumg 55 inch TV",
    category: "Electronic",
    value: "$600",
    quantity: 50,
    price: "$12",
  },
  {
    name: "samsumg S34 Ultra",
    category: "phone",
    value: "$0",
    quantity: 0,
    price: "$0",
  },
];
