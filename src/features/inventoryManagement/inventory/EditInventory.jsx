//Edit inventory item

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import useInventory from "./useInventory";
import { validationSchema } from "../../../schemas/editInventory";
import Button from "../../../components/Button";
import {
  AddCircleOutlineOutlined as AddIcon,
  CancelRounded as CancelIcon,
} from "@mui/icons-material";
const EditInventory = ({ open, onClose, item }) => {
  const { editInventoryItem } = useInventory();
  console.log(item);
  const initialValues = {
    item: item.name,
    remainingQty: item.remainingQty,
    totalQty: item.totalQty,
  };
  console.log(initialValues);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values) => {
      editInventoryItem(values);
      formik.resetForm();
      onClose();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  console.log("values");
  console.log(formik.values);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="item"
            name="item"
            label="Item"
            value={formik.values.item}
            onChange={formik.handleChange}
            error={formik.touched.item && Boolean(formik.errors.item)}
            helperText={formik.touched.item && formik.errors.item}
            margin="normal"
          />
          <TextField
            fullWidth
            id="remainingQty"
            name="remainingQty"
            label="Remaining Quantity"
            value={formik.values.remainingQty}
            onChange={formik.handleChange}
            error={
              formik.touched.remainingQty && Boolean(formik.errors.remainingQty)
            }
            helperText={
              formik.touched.remainingQty && formik.errors.remainingQty
            }
            margin="normal"
          />
          <TextField
            fullWidth
            id="totalQty"
            name="totalQty"
            label="Total Quantity"
            value={formik.values.totalQty}
            onChange={formik.handleChange}
            error={formik.touched.totalQty && Boolean(formik.errors.totalQty)}
            helperText={formik.touched.totalQty && formik.errors.totalQty}
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

export default EditInventory;
