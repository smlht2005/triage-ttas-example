/**
 * 更新時間：2026-02-01 11:34
 * 作者：AI Assistant
 * 更新摘要：建立自訂主題配置，包含漸層、陰影、動畫時間等 Pro Max UI/UX 配置
 */

import { createTheme } from '@mui/material/styles';

// 自訂動畫時間常量
export const ANIMATION_DURATION = {
  short: 200,
  standard: 300,
  long: 500,
  extraLong: 800
};

// 自訂漸層色
export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  success: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  error: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  info: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  stepper: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  card: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)'
};

// 自訂陰影
export const SHADOWS = {
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  hover: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
  card: '0 4px 16px 0 rgba(31, 38, 135, 0.1)',
  stepper: '0 2px 8px 0 rgba(0, 0, 0, 0.08)'
};

// 建立自訂主題
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#8fa5ff',
      dark: '#4c5fd5',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#764ba2',
      light: '#a47fd4',
      dark: '#5a3780',
      contrastText: '#ffffff'
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c'
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f'
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00'
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2'
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Microsoft JhengHei"',
      '"微軟正黑體"'
    ].join(','),
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.5px'
    },
    subtitle1: {
      fontWeight: 600,
      letterSpacing: '0.15px'
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.5px'
    }
  },
  shape: {
    borderRadius: 16
  },
  shadows: [
    'none',
    SHADOWS.card,
    SHADOWS.card,
    SHADOWS.glass,
    '0 6px 20px 0 rgba(31, 38, 135, 0.12)',
    '0 8px 24px 0 rgba(31, 38, 135, 0.14)',
    '0 10px 28px 0 rgba(31, 38, 135, 0.16)',
    '0 12px 32px 0 rgba(31, 38, 135, 0.18)',
    SHADOWS.hover,
    '0 14px 36px 0 rgba(31, 38, 135, 0.22)',
    '0 16px 40px 0 rgba(31, 38, 135, 0.24)',
    '0 18px 44px 0 rgba(31, 38, 135, 0.26)',
    '0 20px 48px 0 rgba(31, 38, 135, 0.28)',
    '0 22px 52px 0 rgba(31, 38, 135, 0.30)',
    '0 24px 56px 0 rgba(31, 38, 135, 0.32)',
    '0 26px 60px 0 rgba(31, 38, 135, 0.34)',
    '0 28px 64px 0 rgba(31, 38, 135, 0.36)',
    '0 30px 68px 0 rgba(31, 38, 135, 0.38)',
    '0 32px 72px 0 rgba(31, 38, 135, 0.40)',
    '0 34px 76px 0 rgba(31, 38, 135, 0.42)',
    '0 36px 80px 0 rgba(31, 38, 135, 0.44)',
    '0 38px 84px 0 rgba(31, 38, 135, 0.46)',
    '0 40px 88px 0 rgba(31, 38, 135, 0.48)',
    '0 42px 92px 0 rgba(31, 38, 135, 0.50)',
    '0 44px 96px 0 rgba(31, 38, 135, 0.52)'
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: SHADOWS.hover
          }
        },
        contained: {
          background: GRADIENTS.primary,
          boxShadow: SHADOWS.card
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)'
            },
            '&.Mui-focused': {
              transform: 'translateY(-2px)',
              boxShadow: SHADOWS.card
            }
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }
      }
    }
  }
});

export default theme;
