/**
 * 專案名稱：醫域醫院 HIS 系統
 * 檔案名稱：MainLayout.tsx
 * 修改日期：2026-02-02
 * 修改人員：Tao (AI Assistant)
 * 修改說明：修復手機版 InfoBar 顯示異常，調整為全螢幕/動態寬度並優化 Z-Index
 */
import React, { useState } from 'react';
import { 
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, 
  IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Tooltip, Container, useTheme, Chip, useMediaQuery, Stack
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  AssignmentInd as TriageIcon,
  People as PatientIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Notifications as NotifyIcon,
  Person as PersonIcon,
  Emergency as EmergencyIcon,
  Psychology as AIIcon
} from '@mui/icons-material';
import { GRADIENTS, SHADOWS } from '../theme/theme';
import { TriageDashboard } from './TriageDashboard';
import { PatientList } from './PatientList';
import { StepperForm } from './StepperForm';
import { InfoBar } from './InfoBar';

const drawerWidth = 260;
const infoBarWidthDesktop = 320;

export const MainLayout: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(isDesktop); // 桌面版預設開啟
  const [currentView, setCurrentView] = useState('triage');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: '儀表板', icon: <DashboardIcon />, id: 'dashboard' },
    { text: '快速檢傷', icon: <TriageIcon />, id: 'triage' },
    { text: '候診名單', icon: <PatientIcon />, id: 'patients' },
    { text: '歷史紀錄', icon: <HistoryIcon />, id: 'history' },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <TriageDashboard />;
      case 'patients': return <PatientList />;
      case 'triage': return <StepperForm />;
      default: return <StepperForm />;
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        background: GRADIENTS.primary,
        color: 'white',
        mb: 2
      }}>
        <EmergencyIcon fontSize="large" />
        <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>醫域醫院 HIS</Typography>
      </Box>

      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton 
              selected={currentView === item.id}
              onClick={() => {
                setCurrentView(item.id);
                setMobileOpen(false);
              }}
              sx={{ 
                borderRadius: 2,
                '&.Mui-selected': {
                  background: 'rgba(102, 126, 234, 0.1)',
                  color: theme.palette.primary.main,
                  '& .MuiListItemIcon-root': { color: theme.palette.primary.main }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'body2', fontWeight: currentView === item.id ? 700 : 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 32, height: 32, fontSize: '0.875rem' }}>陳</Avatar>
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block' }}>陳大明 醫師</Typography>
          <Typography variant="caption" color="text.secondary">急診室 A 區</Typography>
        </Box>
        <IconButton size="small" sx={{ ml: 'auto' }}><SettingsIcon fontSize="inherit" /></IconButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 1. Header (AppBar) */}
      <AppBar 
        position="fixed" 
        sx={{ 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          color: 'text.primary',
          zIndex: theme.zIndex.drawer + 2 // 確保在所有 Drawer 之上
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}><MenuIcon /></IconButton>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip 
              icon={<PersonIcon fontSize="small" />} 
              label={isMobile ? "王小明" : "當前病人：王小明 (M123456789)"}
              color="primary" 
              variant="outlined" 
              sx={{ fontWeight: 'bold', borderRadius: 2 }}
            />
          </Stack>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="AI 輔助工具">
              <IconButton 
                onClick={() => setInfoOpen(!infoOpen)} 
                color={infoOpen ? "primary" : "default"}
                sx={{ bgcolor: infoOpen ? 'rgba(102, 126, 234, 0.1)' : 'transparent' }}
              >
                <AIIcon />
              </IconButton>
            </Tooltip>
            {!isMobile && <IconButton><SearchIcon /></IconButton>}
            <IconButton><NotifyIcon /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 2. Left Sidebar (Drawer) */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none', boxShadow: SHADOWS.hover },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none', borderRight: '1px solid rgba(0,0,0,0.05)' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* 3. Main Content Area */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, md: 3 }, 
          width: { 
            xs: '100%',
            lg: `calc(100% - ${drawerWidth}px - ${infoOpen ? infoBarWidthDesktop : 0}px)` 
          },
          mt: '64px',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Container maxWidth="xl" sx={{ p: 0 }}>
          {renderContent()}
        </Container>
      </Box>

      {/* 4. Right InfoBar (AI Support) */}
      <Drawer
        variant={isDesktop ? "persistent" : "temporary"}
        anchor="right"
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        sx={{
          width: infoOpen ? { xs: '100%', sm: infoBarWidthDesktop } : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: infoBarWidthDesktop },
            boxSizing: 'border-box',
            border: 'none',
            bgcolor: 'background.default',
            mt: isDesktop ? '64px' : 0, // 桌面版避開 header，手機版全螢幕
            height: isDesktop ? 'calc(100% - 64px)' : '100%',
            boxShadow: '-4px 0 15px rgba(0,0,0,0.05)',
            zIndex: theme.zIndex.drawer + 1
          },
        }}
      >
        {/* 手機版增加一個關閉按鈕 */}
        {!isDesktop && (
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <IconButton onClick={() => setInfoOpen(false)}><MenuIcon sx={{ transform: 'rotate(90deg)' }} /></IconButton>
          </Box>
        )}
        <InfoBar />
      </Drawer>
    </Box>
  );
};
