// src/routes/Routes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import InvoiceForm from '../features/createInvoice/InvoiceForm';
import LoginComponent from '../features/login/LoginComponent';
import ViewInvoices from '../features/viewInvoices/ViewInvoices';
import Purchase from '../features/inventoryManagement/purchase/Purchase';
import Inventory from '../features/inventoryManagement/inventory/Inventory'; // Import the new Inventory component
import FirebaseProvider from '../contexts/FirebaseContext';
import Trial from "../features/trial/trial";
const Routes = () => {
  return (
    <>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/create-invoices" element={<InvoiceForm />} />
      <Route path="/view-invoices" element={<ViewInvoices />} />
      <Route path="/trial" element={<Trial />} />
      <Route element={<FirebaseProvider />}>
        <Route path="/inventory/purchase" element={<Purchase />} />
        <Route path="/inventory" element={<Inventory />} /> {/* Add the Inventory component */}
      </Route>
    </>
  );
};

export default Routes;
