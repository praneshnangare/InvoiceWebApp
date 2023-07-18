import { useEffect, useState } from "react";
import useInvoice from "../createInvoice/useInvoice";
import {
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MainLayout from "../../components/MainLayout";
import StickyHeadTable from "./invoiceTable";

const TableSkeleton = () => (
  <>
    <Skeleton variant="text" width={"100%"} sx={{ pb: 5 }} />
    <Skeleton variant="text" width={"100%"} sx={{ pb: 5 }} />
    <Skeleton variant="text" width={"100%"} sx={{ pb: 5 }} />
    <Skeleton variant="text" width={"100%"} sx={{ pb: 5 }} />
    <Skeleton variant="text" width={"100%"} sx={{ pb: 5 }} />
    <Skeleton variant="text" width={"100%"} sx={{ pb: 5 }} />
    <Skeleton variant="text" width={"100%"} sx={{ pb: 5 }} />
    <Skeleton variant="text" width={"100%"} sx={{ pb: 5 }} />
    <Skeleton variant="text" width={"100%"} sx={{ pb: 5 }} />
  </>
);
const ViewInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const { fetchInvoices } = useInvoice();

  useEffect(() => {
    fetchInvoices((values) => setInvoices(values));
  }, []);

  const rightComponent = (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Typography align="center" variant="h2">
            View Invoices
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <StickyHeadTable invoices={invoices} />
      </Grid>
    </Grid>
  );

  if (invoices.length === 0) {
    return <MainLayout rightComponent={<TableSkeleton />} />;
  } else {
    return <MainLayout rightComponent={rightComponent} />;
  }
};

export default ViewInvoices;
