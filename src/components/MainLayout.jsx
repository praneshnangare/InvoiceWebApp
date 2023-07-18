import React from "react";
import Menu from "./Menu";
import MenuDrawer from "./MenuDrawer";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";

const MainLayout = ({ rightComponent }) => {

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <Grid item>
        <MenuDrawer />
      </Grid>
      <Grid
        container
        xs={12}
        sx={{
          padding: 1,
          mt:12,
        }}
      >
        
        <Grid
          item
          container
          justifyContent={"center"}
        >
          {rightComponent}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainLayout;
