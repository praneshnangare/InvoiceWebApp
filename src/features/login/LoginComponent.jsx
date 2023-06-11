import React, { useEffect, useState } from "react";
import { CLIENT_ID, API_KEY } from "../../helpers/constants";
import useAuth from "./useAuth";
import { Box } from "@mui/material";
import Button from "../../components/Button";

const LoginComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        color="success"
        size="large"
        label="Login with Google"
        loading={isLoading}
        onClick={() => {
          login(setIsLoggedIn, setIsLoading);
        }}
      ></Button>
    </Box>
  );
};

export default LoginComponent;
