import React, { useEffect } from "react";
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  AddCircleOutlineOutlined as AddIcon,
  CancelRounded as CancelIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import usePurchase from "./usePurchase";
import useInventory from "../inventory/useInventory";
import { ERROR, INITIAL } from "../../../helpers/constants";
import Button from "../../../components/Button";
import validationSchema from "../../../schemas/purchaseValidation";

const AddPurchaseModal = ({ open, onClose }) => {
  const {
    storeState,
    materialItems,
    fetchMaterialItems,
    fetchLendersList,
    lenders,
  } = useInventory();

  const { addPurchaseItem } = usePurchase();

  useEffect(() => {
    fetchMaterialItems();
    fetchLendersList();
  });

  const getOptionLabel = (option) => option ?? "--";
  // const getLenderLabel = (option) => option?.name ?? "--";
  const formik = useFormik({
    initialValues: {
      item: "",
      qty: "",
      amount: "",
      date: "",
      paidBy: "",
    },
    validationSchema,
    onSubmit: (values) => {
      addPurchaseItem(values);
      formik.resetForm();
      onClose();
    },
  });

  const itemOptions = materialItems ? Object.keys(materialItems) : [];
  const lenderOptions = lenders ? Object.keys(lenders) : [];

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Purchase</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Autocomplete
            id={"item"}
            options={itemOptions}
            freeSolo
            getOptionLabel={getOptionLabel}
            onInputChange={(e, value) => {
              formik.setFieldValue("item", value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="item"
                name="item"
                label="Item"
                value={formik.values.item}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.item)}
                helperText={formik.touched.item && formik.errors.item}
                margin="normal"
              />
            )}
          />

          <TextField
            fullWidth
            id="qty"
            name="qty"
            label="Quantity"
            type="number"
            value={formik.values.qty}
            onChange={formik.handleChange}
            error={formik.touched.qty && Boolean(formik.errors.qty)}
            helperText={formik.touched.qty && formik.errors.qty}
            margin="normal"
          />

          <TextField
            fullWidth
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
            margin="normal"
          />
          <Autocomplete
            id="paidBy"
            options={lenderOptions} // Replace with your list of lenders from Firebase
            freeSolo
            getOptionLabel={getOptionLabel}
            value={formik.values.paidBy}
            onChange={(e, newValue) => {
              formik.setFieldValue("paidBy", newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="paidBy"
                name="paidBy"
                label="Paid By"
                value={formik.values.paidBy}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.paidBy)}
                helperText={formik.touched.paidBy && formik.errors.paidBy}
                margin="normal"
              />
            )}
          />
          <TextField
            fullWidth
            id="date"
            name="date"
            label="Date"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />

          <DialogActions>
            <Button
              color="primary"
              startIcon={<CancelIcon />}
              onClick={onClose}
              label={"cancel"}
            />
            <Button type="submit" color="primary" label={"Add"} />
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPurchaseModal;
