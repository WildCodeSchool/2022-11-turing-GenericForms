import { createTheme } from "@mui/material/styles";
import { themeConstants } from "./theme.constants";
import green from '@mui/material/colors/blue';
import { PaletteColorOptions } from "@mui/material";

// Need to add module augmentation for the `custom` value
declare module "@mui/material/styles" {
  interface PaletteOptions {
    custom: PaletteColorOptions;
  }
}


export const theme = createTheme({
    palette: {
      mode: 'light', // can swith to 'dark'
      primary: green,
      // can provide custom color tokens (light, main, dark, and contrastText)
      // We can use them as props like this: `<Button color="custom.main">`
      custom: {
        light: '#ffa726',
        main: '#f57c00',
        dark: '#ef6c00',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
    },
    typography: {
      fontFamily: [
        themeConstants.fonts.primary,
        themeConstants.fonts.secondary,
      ].join(','),
    },

  });