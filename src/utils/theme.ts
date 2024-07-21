import { createTheme } from '@mui/material/styles';
import React from 'react';

declare module '@mui/material/styles' {
  interface Theme {}
  interface TypographyVariants {
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    h4: React.CSSProperties;
    h5: React.CSSProperties;
    h6: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    caption: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    body1: true;
    body2: true;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export function useTheme() {
  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#99E827',
      },
      secondary: {
        main: '#008285',
      },
      warning: { main: '#FED44A' },
      success: { main: '#2EC4B6' },
    },
    typography: {
      allVariants: {
        fontFamily: 'Inter, sans-serif',
        color: '#000000',
      },
      body1: {
        fontSize: '16px',
        fontWeight: '400',
      },
      body2: {
        fontSize: '14px',
        fontWeight: '400',
        color: '#000000B2',
      },
      h1: {
        fontSize: '48px',
        fontWeight: '400',
        lineHeight: '120%',
      },
      h2: {
        fontSize: '32px',
        fontWeight: '400',
        lineHeight: '130%',
      },
      h3: {
        fontSize: '24px',
        fontWeight: '400',
        lineHeight: '140%',
      },
      h4: {
        fontSize: '20px',
        fontWeight: '500',
        lineHeight: '140%',
      },
      h5: {
        fontSize: '16px',
        fontWeight: '600',
        lineHeight: '150%',
      },
      h6: {
        fontSize: '15px',
        fontWeight: '600',
        lineHeight: '150%',
      },
      button: {
        fontSize: '16px',
        fontWeight: '500',
        textTransform: 'unset',
      },
      subtitle1: {
        fontSize: '14px',
        fontWeight: '400',
      },
      subtitle2: {
        fontSize: '12px',
        fontWeight: '700',
      },
      caption: {
        fontSize: '10px',
        fontWeight: '400',
        color: '#00000059',
      },
      overline: {
        fontSize: '16px',
        fontWeight: '500',
      },
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 744,
        laptop: 992,
        desktop: 1200,
      },
    },
    components: {},
  });
}
