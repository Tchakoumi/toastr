import React, { PropsWithChildren, StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { ToastrProvider } from '@glomllc/toastr';
import { ThemeProvider } from '@mui/material';
import App from './app/app';
import './styles.css';
import { useTheme } from './utils/theme';

const AppContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StrictMode>
      <ThemeProvider theme={useTheme()}>
        <ToastrProvider
          configs={{
            disableDismissAll: false,
            disableDecendantStyle: false,
            timeout: 2000,
            restartTimeoutAferHover: false,
          }}
        >
          {children}
        </ToastrProvider>
      </ThemeProvider>
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
