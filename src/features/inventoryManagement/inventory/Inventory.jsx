// src/components/Inventory.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaterialItems } from "./inventorySlice";
import MainLayout from "./../../../components/MainLayout";
import useInventory from "./useInventory";
import EmptySkeleton from "../../../components/EmptySkeleton";
import { LOADED } from "../../../helpers/constants";
import { Accordion, AccordionSummary, Grid, Typography } from "@mui/material";
import Button from "../../../components/Button";
import EditIcon from '@mui/icons-material/Edit';
import {
  AddCircleOutlineOutlined as AddIcon,
  CancelRounded as CancelIcon,
} from "@mui/icons-material";
import EditInventory from "./EditInventory";

const Inventory = () => {
  const dispatch = useDispatch();
  const { storeState, materialItems } = useInventory();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  useEffect(() => {
    if (storeState === "INITIAL") {
      dispatch(getMaterialItems());
    }
  }, [storeState]);
  const onClose = () => {
    setOpen(false);
  };

  const handleEdit = (key, item) => {
    setSelectedItem({name: key, ...item});
    console.log(selectedItem);
    setOpen(true);
  };

  const renderMaterialItems = () => {
    const keys = Object.keys(materialItems);
    return keys.map((key, index) => {
      const item = materialItems[key];
      //add a three dot icon here

      return (
        <Accordion
          key={index}
          square
          sx={{
            mb: 1,
            boxShadow: `0px 4px 20px rgba(160, 165, 175, 0.25)`,
            borderRadius: `10px`,
          }}
          TransitionProps={{ direction: "down" }}
          disableGutters
        >
          <AccordionSummary
            // expandIcon={<ExpandMore />}
            aria-controls={`panel-${index}-content`}
            id={`panel-${index}-header`}
          >
            <Grid item container>
              <Grid item container xs={4} flexDirection={"column"} spacing={1}>
                <Grid item>
                  <Typography variant="smallText1">Item Name</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="title2">{key}</Typography>
                </Grid>
              </Grid>
              <Grid item container xs={4} flexDirection={"column"} spacing={1}>
                <Grid item>
                  <Typography variant="smallText1">Total Quantity</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="title2">{item.totalQty}</Typography>
                </Grid>
              </Grid>
              <Grid item container xs={3} flexDirection={"column"} spacing={1}>
                <Grid item>
                  <Typography variant="smallText1">Balance</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="title2">{item.remainingQty}</Typography>
                </Grid>
              </Grid>
              <Grid item container xs={1} flexDirection={"column"} spacing={1} justifyContent={'center'} alignItems={'center'}>
                <EditIcon onClick={()=> handleEdit(key, item)}/>
              </Grid>
            </Grid>
          </AccordionSummary>
        </Accordion>
      );
    });
  };

  const rightComponent = (
    <Grid
      item
      display={"flex"}
      direction={"column"}
      container
      xs={7}
      height={"fit-content"}
    >
      {/* <Grid display={"flex"} height={"fit-content"} item>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          // onClick={handleClickOpen}
          label={"Add Purchase"}
        />
      </Grid> */}
      {(storeState === "LOADING" || storeState === "INITIAL") && (
        <EmptySkeleton />
      )}
      {storeState === "LOADED" && materialItems && (
        <Grid
          item
          container
          height="fit-content"
          flexDirection="column"
          xs={5}
          sx={{ mt: 2 }}
          justifyContent={"flex-start"}
        >
          {renderMaterialItems()}
        </Grid>
      )}
      <EditInventory open={open} onClose={onClose} item={selectedItem} />
    </Grid>
  );

  return <MainLayout header="Inventory" rightComponent={rightComponent} />;
};

export default Inventory;
