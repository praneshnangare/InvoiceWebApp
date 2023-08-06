import React from "react";
import Menu from "./Menu";
import MenuDrawer from "./MenuDrawer";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";

const MainLayout = ({ rightComponent, header }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Grid item>
        <MenuDrawer header={header} />
      </Grid>
      <Grid
        item
        container
        xs={12}
        sx={{
          padding: 1,
          mt: 12,
        }}
      >
        <Grid item container sx={{m:2, ml:3}}>
          {rightComponent}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainLayout;
