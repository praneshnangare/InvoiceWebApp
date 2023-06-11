import { createTheme, ThemeProvider } from "@mui/material";
import { typographyVariants } from "./typography";
import { palette } from './palette';

const theme = createTheme({
  typography: {
    ...typographyVariants,
  },
  palette:{
    ...palette,
  }
});

export default theme;
