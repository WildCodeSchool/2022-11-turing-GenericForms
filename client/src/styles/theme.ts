import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { themeConstants } from "./theme.constants";
import green from '@mui/material/colors/blue';
import { PaletteColorOptions } from "@mui/material";

// Need to add module augmentation for the `custom` value
declare module "@mui/material/styles" {
  interface PaletteOptions {
    custom: PaletteColorOptions;
  }
}

let theme = createTheme({
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
      ].join(','),
      fontSize: 12,
    },
    //? We can override the default styles of the components like this:
    // components: {
    //   MuiTypography: {
    //     styleOverrides: {
    //       h1: {
    //         fontSize: themeConstants.fontSize.xl6,
    //         fontWeight: themeConstants.fontWeight.bold,
    //         lineHeight: 1.2,
    //         letterSpacing: 0.5,
    //         color: themeConstants.colors.primaryDark,
    //       },
          
    //     }
    //   },
    // },
  });

  //? Or we can override the default styles of the components like this:
  // theme.typography.h1 = {
  //   fontSize: themeConstants.fontSize.xl6,
  //   fontWeight: themeConstants.fontWeight.bold,
  //   lineHeight: 1.2,
  //   letterSpacing: 0.5,
  //   color: themeConstants.colors.lightGray,
  // };

  export default theme;