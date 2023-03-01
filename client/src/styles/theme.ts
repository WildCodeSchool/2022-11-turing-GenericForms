import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { themeConstants } from "./theme.constants";
import { PaletteColorOptions } from "@mui/material";

// Need to add module augmentation for the `custom` value
declare module "@mui/material/styles" {
  interface PaletteOptions {
    custom: PaletteColorOptions;
    paper: PaletteColorOptions;
  }
}

let theme = createTheme({
    palette: {
      mode: 'light', // can swith to 'dark'
      primary: {
        main: themeConstants.colors.primaryMain,
        light: themeConstants.colors.primaryLight,
        dark: themeConstants.colors.primaryDark,
        contrastText: themeConstants.colors.primaryContrast,
      },
      // can provide custom color tokens (light, main, dark, and contrastText)
      paper: {
        main: '#fff1e6',
        light: '#f0efeb',
        dark: '#f2e9e4',
      },
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