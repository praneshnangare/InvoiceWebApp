import {Route} from 'react-router-dom';
import InvoiceForm from '../features/createInvoice/InvoiceForm';
import LoginComponent from '../features/login/LoginComponent';
import ViewInvoices from '../features/viewInvoices/viewInvoices';

const Routes = () => {
  return (
    <>
      <Route path="/" element={<LoginComponent />}></Route>
      <Route path="/create-invoices" element={<InvoiceForm />}></Route>
      <Route path="/view-invoices" element={<ViewInvoices />}></Route>
    </>
  );
}

export default Routes;