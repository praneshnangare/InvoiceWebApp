import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";

const columns = [
  { id: "id", label: "Number", minWidth: 50 },
  { id: "date", label: "Date", minWidth: 50 },
  { id: "customerName", label: "Customer Name", minWidth: 100 },
  { id: "amount", label: "Amount" },
];

function createData(id, date, customerName, amount) {
  return { id, date, customerName, amount };
}

export default function StickyHeadTable({ invoices }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = invoices.map((invoice) =>
    createData(
      invoice.invoiceNumber,
      invoice.invoiceDate,
      invoice.customerName,
      invoice.totalAmount
    )
  );

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{maxHeight: "550px"}}>
        <Table sx={{ minWidth: 350 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography  align="center" variant="title3">{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="left">{row.customerName}</TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={invoices.length} // Use the length of the invoices array
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

