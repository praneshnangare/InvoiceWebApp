import { CircularProgress, Button as MuiButton } from "@mui/material";

import React from "react";

const Button = ({ label, loading=false, disabled=false, ...props }) => {
  return (
    <MuiButton
      variant="contained"
      elevation={13}
      sx={{
        borderRadius: 2,
        textTransform: "none",
        fontWeight: "bold",
        fontSize: 16,
        padding: "10px 20px",
        backgroundColor: "primary.success",
        color: "#fff",
        boxShadow: '0 7px 7px rgba(0, 0, 0, 0.45)',
        "&:hover": {
          backgroundColor: "secondary.hover",
          color: "#fff",
        },
        "&:disabled": {
          backgroundColor: "secondary.disabled",
          color: "#fff",
        },
      }}
      disabled={disabled || loading}
      {...props}
    >
      {!loading ? label : <CircularProgress />}
    </MuiButton>
  );
};

export default Button;
