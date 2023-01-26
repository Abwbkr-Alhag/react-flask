import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from './context/AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import StyledEngineProvider from '@mui/material/StyledEngineProvider'
import { ShoppingCartProvider } from './context/ShoppingCartProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5 Minute Stale Time
      staleTime: 1000 * 60 * 5
    }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CookiesProvider>
          <ShoppingCartProvider>
            <StyledEngineProvider injectFirst>
              <App />
            </StyledEngineProvider>
          </ShoppingCartProvider>
        </CookiesProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
