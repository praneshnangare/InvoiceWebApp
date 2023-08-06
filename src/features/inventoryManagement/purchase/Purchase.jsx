import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  AddCircleOutlineOutlined as AddIcon,
  CancelRounded as CancelIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import MainLayout from "../../../components/MainLayout";
import usePurchase from "./usePurchase";
import useInventory from "../inventory/useInventory";
import { ERROR, INITIAL } from "../../../helpers/constants";
import Button from "../../../components/Button";
import AddPurchaseModal from "./AddPurchase";
import { ExpandMore } from "@mui/icons-material";
const Purchase = () => {
  const [open, setOpen] = React.useState(false);
  const { storeState, purchaseItems, fetchPurchaseItems } = usePurchase();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so add 1

  // State to store selected month and year
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    // if (storeState === INITIAL || storeState === ERROR) {
    console.log("useeffect");
    fetchPurchaseItems(selectedYear, selectedMonth);
    // }
  }, [selectedYear, selectedMonth]); // Run the effect whenever the selectedYear or selectedMonth changes

  const handleYearChange = (event, value) => {
    setSelectedYear(value);
  };

  const handleMonthChange = (event, value) => {
    console.log(value);
    setSelectedMonth(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderPurchasedItems = () => {
    return (
      <Grid
        item
        container
        height="fit-content"
        flexDirection="column"
        xs={12}
        sx={{ mt: 2 }}
        justifyContent={"flex-start"}
      >
        {Object.values(purchaseItems).map((item, index) => (
          <Accordion
            key={index}
            square
            sx={{
              mb: 1,
              boxShadow: `0px 4px 20px rgba(160, 165, 175, 0.25)`,
              borderRadius: `10px`,
            }}
            alignItems= "center"
            TransitionProps={{ direction: "down" }}
            disableGutters
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel-${index}-content`}
              id={`panel-${index}-header`}
            >
              <Grid item container>
                <Grid
                  item
                  container
                  xs={4}
                  flexDirection={"column"}
                  spacing={1}
                >
                  <Grid item>
                    <Typography variant="smallText1">Item Name</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="title2">{item.item}</Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={4}
                  flexDirection={"column"}
                  spacing={1}
                >
                  <Grid item>
                    <Typography variant="smallText1">Quantity</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="title2">{item.qty}</Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={4}
                  flexDirection={"column"}
                  spacing={1}
                >
                  <Grid item>
                    <Typography variant="smallText1">Date</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="title2">{item.date}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                // marginBottom: "8px",
              }}
            >
              <Typography variant="body1">Total: {item.amount}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    );
  };

  const rightComponent = (
    <Grid
      item
      display={"flex"}
      direction={"column"}
      container
      xs={12}
      height={"fit-content"}
    >
      <Grid display={"flex"} height={"fit-content"} item>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          label={"Add Purchase"}
        />
      </Grid>
      <Grid item container xs={12} justifyContent="flex-end" mt={4}>
        {/* Dropdown for selecting Year */}
        <Grid item xs={5}>
          <Autocomplete
            value={selectedYear}
            onChange={handleYearChange}
            options={[currentYear, currentYear - 1, currentYear - 2]} // You can modify this array to include other years
            getOptionLabel={(year) => `${year}`}
            renderInput={(params) => (
              <TextField {...params} onChange={handleYearChange} label="Year" />
            )}
          />
        </Grid>

        {/* Dropdown for selecting Month */}
        <Grid item xs={5}>
          <Autocomplete
            value={selectedMonth}
            onChange={handleMonthChange}
            options={Array.from(
              { length: currentMonth },
              (_, index) => index + 1
            )} // Array with numbers 1 to 12 (representing months)
            getOptionLabel={(month) => `${month}`} // Display month numbers as strings
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={handleMonthChange}
                label="Month"
              />
            )}
          />
        </Grid>
      </Grid>
      {purchaseItems && renderPurchasedItems()}
      <AddPurchaseModal open={open} onClose={handleClose} />
    </Grid>
  );

  return <MainLayout header="Inventory" rightComponent={rightComponent} />;
};

export default Purchase;
