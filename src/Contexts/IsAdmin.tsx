import React, { createContext, useContext, useState } from 'react';

interface AdminContextType {
  isAdminUser: boolean;
  toggleAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminProviderType{
    children: React.ReactNode;
}


export const AdminProvider: React.FC<AdminProviderType> = ({ children }) => {
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);

  const toggleAdmin = () => {
    setIsAdminUser(prevState => !prevState);
  };

  return (
    <AdminContext.Provider value={{ isAdminUser, toggleAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};
