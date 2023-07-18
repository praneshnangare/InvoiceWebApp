import { createTheme, ThemeProvider } from "@mui/material";
import { createResponsiveTypography } from "./typography";
import { palette } from './palette';

let theme = createTheme({
  palette:{
    ...palette,
  }
});
theme = createResponsiveTypography(theme);
export default theme;
