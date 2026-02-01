/**
 * 更新時間：2026-02-01 11:42
 * 作者：AI Assistant
 * 更新摘要：更新為使用新的 StepperForm 組件與自訂主題
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { StepperForm } from './components/StepperForm';
import { MainLayout } from './components/MainLayout';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout />
    </ThemeProvider>
  </React.StrictMode>
);

