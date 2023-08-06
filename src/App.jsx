import React, { useState, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Routes from "./routes/Routes";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material";
import store from "./redux/store";
import { Provider } from "react-redux";
import ToastBanner from "./features/toastBanner/ToastBanner";

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(Routes()), {
    basename: "",
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <ToastBanner />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
