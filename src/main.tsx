import React, { PropsWithChildren, StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material';
import App from './app/app';
import { useTheme } from './utils/theme';
import './styles.css';

const AppContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StrictMode>
      <ThemeProvider theme={useTheme()}>{children}</ThemeProvider>
    </StrictMode>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AppContainer>
    <App />
  </AppContainer>
);
