import React, { useState, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Routes from "./routes/Routes";
import theme from "./theme/theme";
import { ThemeProvider } from '@mui/material';

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(Routes()), {
    basename: "",
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;