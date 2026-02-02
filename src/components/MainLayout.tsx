/**
 * 專案名稱：醫域醫院 HIS 系統
 * 檔案名稱：MainLayout.tsx
 * 修改日期：2026-02-02
 * 修改人員：Tao (AI Assistant)
 * 修改說明：主佈署架構，包含 AppBar、左側導航、中央主視圖與右側 InfoBar
 */
import React, { useState } from 'react';
import { 
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, 
  IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Tooltip, Container, useTheme, Chip, useMediaQuery
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
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { GRADIENTS, SHADOWS } from '../theme/theme';
import { TriageDashboard } from './TriageDashboard';
import { PatientList } from './PatientList';
import { StepperForm } from './StepperForm';
import { InfoBar } from './InfoBar';

const drawerWidth = 260;
const infoBarWidth = 320;

export const MainLayout: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);
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
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}><MenuIcon /></IconButton>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip 
              icon={<PersonIcon fontSize="small" />} 
              label="當前病人：王小明 (M123456789)" 
              color="primary" 
              variant="outlined" 
              sx={{ fontWeight: 'bold', borderRadius: 2 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' } }}>
              抵達：2026-02-02 07:05
            </Typography>
          </Stack>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="AI 分析控制"><IconButton onClick={() => setInfoOpen(!infoOpen)} color={infoOpen ? "primary" : "default"}><AIIcon /></IconButton></Tooltip>
            <Tooltip title="搜尋"><IconButton><SearchIcon /></IconButton></Tooltip>
            <Tooltip title="通知"><IconButton><NotifyIcon /></IconButton></Tooltip>
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
          width: { sm: `calc(100% - ${drawerWidth}px - ${infoOpen && isDesktop ? infoBarWidth : 0}px)` },
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

      {/* 4. Right InfoBar */}
      <Drawer
        variant={isDesktop ? "persistent" : "temporary"}
        anchor="right"
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        sx={{
          width: infoOpen ? infoBarWidth : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: infoBarWidth,
            boxSizing: 'border-box',
            border: 'none',
            bgcolor: 'background.default',
            mt: '64px',
            height: 'calc(100% - 64px)',
            boxShadow: '-4px 0 15px rgba(0,0,0,0.02)'
          },
        }}
      >
        <InfoBar />
      </Drawer>
    </Box>
  );
};

import { Stack } from '@mui/material';
import { Psychology as AIIcon } from '@mui/icons-material';
