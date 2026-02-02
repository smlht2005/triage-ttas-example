/**
 * 更新時間：2026-02-01 11:42
 * 作者：AI Assistant
 * 更新摘要：更新為使用新的 StepperForm 組件與自訂主題
 */

/**
 * 專案名稱：醫域醫院 HIS 系統
 * 檔案名稱：index.tsx
 * 修改日期：2026-02-02
 * 修改人員：Tao (AI Assistant)
 * 修改說明：React 進入點，整合 MainLayout 與主題提供者
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

