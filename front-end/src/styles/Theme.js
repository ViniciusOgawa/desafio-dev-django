import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'JetBrains Mono', monospace",
    body: "'JetBrains Mono', monospace",
  },
  fontSizes: {
    xs: "0.75rem",   // 12px
    sm: "0.875rem",  // 14px
    md: "1rem",      // 16px
    lg: "1.125rem",  // 18px
    xl: "1.25rem",   // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem",  // 36px
    "5xl": "3rem",     // 48px
    "6xl": "4rem",     // 64px
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  colors: {
    black: {
      50: "#f7f7f7",
      100: "#e1e1e1",
      200: "#cfcfcf",
      300: "#b1b1b1",
      400: "#9e9e9e",
      500: "#7e7e7e",
      600: "#626262",
      700: "#515151",
      800: "#3b3b3b",
      900: "#202020",
    },
    white: {
      50: "#ffffff",
      100: "#fefefe",
      200: "#fcfcfc",
      300: "#fafafa",
      400: "#f7f7f7",
      500: "#f2f2f2",
      600: "#eeeeee",
      700: "#e0e0e0",
      800: "#d1d1d1",
      900: "#c2c2c2",
    },
  },
});

export { theme };
